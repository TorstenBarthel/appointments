import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit {

  @Input() viewDate: Date

  @Input() events: CalendarEvent[]

  constructor() { }

  ngOnInit(): void {
  }

}
