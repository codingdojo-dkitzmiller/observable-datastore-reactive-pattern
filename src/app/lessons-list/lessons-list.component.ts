import {Component, OnInit} from '@angular/core';
import {Observer, LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON} from '../event-bus-experiments/event-bus';
import {Lesson} from "../shared/model/lesson";
import * as _ from 'lodash';
import {dataStore} from '../shared/app-data';

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit, Observer {
    lessons: Lesson[] =[];

    constructor() {
    }

    ngOnInit(): void {
        console.log('lesson list component is registered as observer ..');
        dataStore.subscribe(this);
    }

    next(data: Lesson[]) {
        console.log('Lessons list component received data ..');
        this.lessons = data;
    }

    toggleLessonViewed(lesson:Lesson) {
        dataStore.toggleLessonViewed(lesson);
    }

    delete(deletedLesson: Lesson) {
        dataStore.deleteLesson(deletedLesson);
    }



}



