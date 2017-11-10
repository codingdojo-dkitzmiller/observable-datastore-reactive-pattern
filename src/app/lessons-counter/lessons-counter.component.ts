import { Component, OnInit } from '@angular/core';
import {LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON, Observer} from '../event-bus-experiments/event-bus';
import {Lesson} from '../shared/model/lesson';
import {dataStore} from '../shared/app-data';

@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements OnInit, Observer {
    lessonsCounter = 0;

    constructor() {
    }

    ngOnInit(): void {
        console.log('lesson list component is registered as observer ..');
        dataStore.lessonsList$.subscribe(this);
    }


    next(data: Lesson[]) {
        console.log('counter component received data ..');
        this.lessonsCounter = data.length;
    }

}
