import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { Holiday } from 'src/app/_models/holiday';
import { Presence } from 'src/app/_models/presence';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { HolidayService } from 'src/app/_services/holiday.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { UserService } from 'src/app/_services/users.service';
import { CongeService } from 'src/app/_services/conge.service';
import { Conge } from 'src/app/_models/conge';

@Component({
    selector: 'app-presence',
    templateUrl: './presence.component.html',
    styleUrls: ['./presence.component.scss'],
    providers: [DatePipe],
})
export class PresenceComponent implements OnInit {
    events: EventInput[] = [];
    calendarOptions: CalendarOptions = {
        locale: frLocale,
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin],
        dateClick: this.handleDateClick.bind(this),
        height: '45rem',
        firstDay: 1,
        eventClick: (info) => {
            this.handleEventClick(info);
        },
        eventMouseEnter: (info) => {
            this.handleEventMouseEnter(info);
        },
        eventMouseLeave: (info) => {
            this.handleEventMouseLeave(info);
        },
        weekends: false,
        weekNumbers: true, //Nombre de semaine par rapport à l'année
        weekText: 'Semaine ',
        weekNumberCalculation: 'ISO', //Pour commencer à compter à partir du lundi
        displayEventTime: false,
    };

    employees!: User[];
    selectedEmployee!: User;
    presences!: Presence[];
    presence!: Presence;

    editing: boolean = false;
    dialog: boolean = false;
    minDate: Date = new Date();
    rangeDates: Date[] = [];
    isAdmin: boolean = false;

    holidays: Holiday[] = [];

    constructor(
        private presenceService: PresenceService,
        private userService: UserService,
        private datePipe: DatePipe,
        private authService: AuthService,
        private congeService: CongeService,
        private holidayService: HolidayService
    ) {}

    ngOnInit(): void {
        this.checkRole();
        this.userService.getAllusers().subscribe((r) => {
            this.employees = r;
        });
        this.holidayService.getCurrentMonthHolidays().subscribe({
            next: (r) => {
                this.holidays = r;
                this.addHolidaysToCalendar();
            },
            error: (e) => {},
        });
    }

    handleDateClick(arg: any) {
        console.log('date click! ' + arg.dateStr);
    }

    handleEventClick(arg: any) {
        if (this.isAdmin && arg.event._def.interactive) {
            this.presence = new Presence();
            this.presence.numberOfHours =
                arg.event.extendedProps[0].numberOfHours;
            this.presence.description = arg.event.extendedProps[0].description;
            this.presence.startDate = arg.event.start;
            this.presence.endDate = arg.event.end;
            this.presence.id = arg.event.id;
            this.rangeDates[0] = new Date(this.presence.startDate);
            this.rangeDates[1] = new Date(this.presence.endDate);
            this.editing = true;
            this.dialog = true;
        }
    }

    handleEventMouseEnter(arg: any) {
        if (arg.event._def.interactive) {
            arg.el.style.backgroundColor = 'blueviolet';
        }
    }

    handleEventMouseLeave(arg: any) {
        if (arg.event._def.interactive) {
            arg.el.style.backgroundColor = '#4F46E5';
        }
    }

    mapPresenceToEvent(presence: Presence) {
        let event: EventInput = {};
        if (presence.id) {
            event.id = presence.id.toString();
        }
        event.start = new Date(presence.startDate);
        event.end = new Date(presence.endDate);
        event.title = `${presence.description} - (${presence.numberOfHours} heures travaillées)`;
        event.extendedProps = [
            {
                description: presence.description,
                numberOfHours: presence.numberOfHours,
            },
        ];
        event.interactive = true;
        event.display = 'block';
        return event;
    }

    mapHolidayToEvent(holiday: Holiday) {
        let event: EventInput = {};
        event.start = new Date(holiday.startDate);
        event.end = new Date(holiday.endDate);
        event.title = holiday.name;
        event.color = 'lightgreen';
        event.interactive = false;
        return event;
    }

    mapCongeToEvent(conge: Conge) {
        let event: EventInput = {};
        event.start = new Date(conge.dateDebut);
        event.end = new Date(conge.dateFin);
        event.title = 'Congé approuvé';
        event.color = 'limegreen';
        event.interactive = false;
        return event;
    }

    addHolidaysToCalendar() {
        this.holidays.forEach((holiday) => {
            this.events.push(this.mapHolidayToEvent(holiday));
        });
        this.events = [...this.events];
    }

    openNew() {
        this.presence = new Presence();
        this.editing = true;
        this.dialog = true;
    }

    hideDialog() {
        this.dialog = false;
        this.editing = false;
    }

    saveEntry() {
        this.presence.startDate = this.datePipe.transform(
            this.rangeDates[0],
            'yyyy-MM-dd'
        );
        this.presence.endDate = this.datePipe.transform(
            this.rangeDates[1],
            'yyyy-MM-dd'
        );
        if (this.presence.id) {
            this.presenceService
                .updatePresence(this.presence, this.selectedEmployee.id!)
                .subscribe(
                    (r) => {
                        this.presence = r;
                        this.events[this.findIndexById(r.id)] =
                            this.mapPresenceToEvent(r);
                        this.events = [...this.events];
                        this.dialog = false;
                    },
                    (e) => {
                        console.error(e);
                    }
                );
        } else {
            this.presenceService
                .addPresence(this.presence, this.selectedEmployee.id!)
                .subscribe(
                    (_r) => {
                        this.events.push(
                            this.mapPresenceToEvent(this.presence)
                        );
                        this.events = [...this.events];
                        this.dialog = false;
                    },
                    (e) => {
                        console.error(e);
                    }
                );
        }
    }

    checkRole() {
        this.isAdmin = this.authService.isAdmin();
        if (!this.isAdmin) {
            this.userService.getCurrentUser().subscribe({
                next: (r) => {
                    this.selectedEmployee = r;
                    this.getUserCalendar(this.selectedEmployee.id!);
                },
            });
        }
    }

    getUserCalendar(id: number) {
        this.events = [];
        this.addHolidaysToCalendar();
        this.presenceService.getUserPresence(id).subscribe((r) => {
            this.presences = r;
            for (let i = 0; i < r.length; i++) {
                const presenceElement = r[i];
                this.events.push(this.mapPresenceToEvent(presenceElement));
            }
            this.events = [...this.events];
        });
        this.congeService
            .getAllCurrentConges(this.selectedEmployee.id!)
            .subscribe({
                next: (r) => {
                    let conges: Conge[] = r;
                    conges.forEach((conge) => {
                        this.events.push(this.mapCongeToEvent(conge));
                    });
                    this.events = [...this.events];
                },
                error: (e) => {
                    console.error(e);
                },
            });
    }

    dateRangeControl() {
        if (!this.rangeDates.some((el) => el == null)) {
            const dates: Date[] = this.getDatesFromRange(
                this.rangeDates[0],
                this.rangeDates[1]
            );
            let chosenDate: Date = this.rangeDates[1];
            for (let i = 0; i < dates.length; i++) {
                const date = dates[i];
                if (date.getDay() == 6) {
                    chosenDate = dates[i - 1];
                    break;
                }
            }
            this.rangeDates[1] = chosenDate!;
        }
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

    updateMinDate(date: Date) {
        this.minDate = date;
        if (this.minDate > this.presence.endDate) {
            this.presence.endDate = this.minDate;
        }
    }

    toggleWeekends() {
        this.calendarOptions.weekends = !this.calendarOptions.weekends;
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].id === id.toString()) {
                index = i;
                break;
            }
        }
        return index;
    }
}
