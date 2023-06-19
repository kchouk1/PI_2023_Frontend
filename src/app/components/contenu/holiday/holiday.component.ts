import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { Holiday } from "src/app/_models/holiday";
import { HolidayService } from "src/app/_services/holiday.service";

@Component({
  selector: "app-holiday",
  templateUrl: "./holiday.component.html",
  styleUrls: ["./holiday.component.scss"],
  providers: [ConfirmationService, MessageService, DatePipe],
})
export class HolidayComponent implements OnInit {
  holidays: Holiday[] = [];
  selectedHolidays: Holiday[] = [];
  holidayDialog: boolean = false;
  holiday: Holiday = new Holiday();
  rangeDates: Date[] = [];

  @ViewChild("dt") dt: Table | undefined;

  constructor(
    private holidayService: HolidayService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.holidayService.getAllHolidays().subscribe({
      next: (res) => {
        this.holidays = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openNew() {
    this.holiday = new Holiday();
    this.selectedHolidays = [];
    this.holidayDialog = true;
  }

  hideDialog() {
    this.holidayDialog = false;
  }

  editHoliday(holiday: Holiday) {
    this.holiday = { ...holiday };
    this.rangeDates[0] = new Date(holiday.startDate);
    this.rangeDates[1] = new Date(holiday.endDate);
    this.holidayDialog = true;
  }

  saveHoliday() {
    this.holiday.startDate = this.datePipe.transform(
      this.rangeDates[0],
      "yyyy-MM-dd"
    );
    this.holiday.endDate = this.datePipe.transform(
      this.rangeDates[1],
      "yyyy-MM-dd"
    );
    if (this.holiday.id) {
      this.holidayService.updateHoliday(this.holiday).subscribe({
        next: (r) => {
          this.holidays[this.findIndexById(r.id)] = r;
          this.messageService.add({
            severity: "success",
            summary: "Successful",
            detail: "Jour férié modifié avec succés!",
            life: 3000,
          });
        },
        error: () => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Il y a eu une erreur!",
            life: 3000,
          });
        },
      });
    } else {
      this.holidayService.addHoliday(this.holiday).subscribe({
        next: (r) => {
          this.holidays.push(r);
          this.messageService.add({
            severity: "success",
            summary: "Successful",
            detail: "Jour férié créé avec succés!",
            life: 3000,
          });
        },
        error: () => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur de création!",
            life: 3000,
          });
        },
      });
    }

    this.holidays = [...this.holidays];
    this.holidayDialog = false;
    this.holiday = new Holiday();
  }

  deleteHoliday(holiday: Holiday) {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir supprimer " + holiday.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.holidayService.deleteHoliday(holiday.id!).subscribe({
          next: () => {
            this.holidays = this.holidays.filter(
              (val) => val.id !== holiday.id
            );
          },
        });
      },
    });
  }

  deleteSelectedHolidays() {
    this.confirmationService.confirm({
      message:
        "Êtes-vous sûr de vouloir supprimer les jours fériés sélectionnés?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.selectedHolidays.forEach((holiday) => {
          this.holidayService.deleteHoliday(holiday.id!).subscribe(() => {
            this.holidays = this.holidays.filter(
              (val) => !this.selectedHolidays.includes(val)
            );
            this.selectedHolidays = [];
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: `Jour férié ${holiday.name} supprimé`,
              life: 3000,
            });
          });
        });
      },
    });
  }

  getDatesFromRange(start: Date, end: Date) {
    const cFrom = new Date(start);
    const cTo = new Date(end);
    let daysArr = [new Date(cFrom)];
    let tempDate = cFrom;
    while (tempDate < cTo) {
      tempDate.setUTCDate(tempDate.getUTCDate() + 1);
      daysArr.push(new Date(tempDate));
    }
    return daysArr;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.holidays.length; i++) {
      if (this.holidays[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
