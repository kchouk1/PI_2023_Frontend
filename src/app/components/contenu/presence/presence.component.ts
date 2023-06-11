import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Presence } from 'src/app/_models/presence';
import { User } from 'src/app/_models/user';
import { PresenceService } from 'src/app/_services/presence.service';
import { UserService } from 'src/app/_services/users.service';

@Component({
    selector: 'app-presence',
    templateUrl: './presence.component.html',
    styleUrls: ['./presence.component.scss'],
    providers: [DatePipe],
})
export class PresenceComponent implements OnInit {
    events: EventInput[] = [];
    calendarOptions: CalendarOptions = {
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
        weekends: true,
        weekNumbers: true, //Nombre de semaine par rapport à l'année
        weekText: 'Semaine ',
        weekNumberCalculation: 'ISO', //Pour commencer à compter à partir du lundi
    };

    employees!: User[];
    selectedEmployee!: User;
    presences!: Presence[];
    presence!: Presence;

    editing: boolean = false;
    dialog: boolean = false;
    minDate: Date = new Date();

    constructor(
        private presenceService: PresenceService,
        private userService: UserService,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.userService.getAllusers().subscribe((r) => {
            this.employees = r;
        });
        this.presenceService.getAllPresence().subscribe((r) => {
            for (let i = 0; i < r.length; i++) {
                const presenceElement = r[i];
                this.events.push(this.mapPresenceToEvent(presenceElement));
            }
            this.events = [...this.events];
        });
    }

    handleDateClick(arg: any) {
        console.log('date click! ' + arg.dateStr);
    }

    handleEventClick(arg: any) {
        this.presence = new Presence();
        this.presence.description = arg.event.title;
        this.presence.startDate = arg.event.start;
        this.presence.endDate = arg.event.end;
        this.presence.id = arg.event.id;
        this.editing = true;
        this.dialog = true;
    }

    handleEventMouseEnter(arg: any) {
        arg.el.style.backgroundColor = 'blueviolet';
    }

    handleEventMouseLeave(arg: any) {
        arg.el.style.backgroundColor = '#4F46E5';
    }

    mapPresenceToEvent(presence: Presence) {
        let event: EventInput = {};
        if (presence.id) {
            event.id = presence.id.toString();
        }
        event.start = new Date(presence.startDate);
        event.end = new Date(presence.endDate);
        event.title = presence.description;
        return event;
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
            this.presence.startDate,
            'yyyy-MM-dd'
        );
        this.presence.endDate = this.datePipe.transform(
            this.presence.endDate,
            'yyyy-MM-dd'
        );
        if (this.presence.id) {
            this.presenceService.updatePresence(this.presence).subscribe(
                (r) => {
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
            this.presenceService.addPresence(this.presence).subscribe(
                (r) => {
                    this.events.push(this.mapPresenceToEvent(this.presence));
                    this.events = [...this.events];
                    this.dialog = false;
                },
                (e) => {
                    console.error(e);
                }
            );
        }
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
