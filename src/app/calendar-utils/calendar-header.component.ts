import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
    selector: 'app-calendar-header',
    templateUrl: './calendar-header.component.html',
    styles: [
        '.container { margin-bottom: 10px; }'
    ]
})
export class CalendarHeaderComponent {

    @Input() view: CalendarView;

    @Input() viewDate: Date;

    @Input() locale: string = 'de';

    @Input() displayNowBtn: boolean = false

    @Output() viewChange = new EventEmitter<CalendarView>();

    @Output() viewDateChange = new EventEmitter<Date>();
}
