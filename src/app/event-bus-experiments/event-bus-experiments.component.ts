import {Component, OnInit} from '@angular/core';
import {LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON} from "./event-bus";
import {testLessons} from "../shared/model/test-lessons";
import {Lesson} from "../shared/model/lesson";
import {dataStore} from '../shared/app-data';

@Component({
    selector: 'event-bus-experiments',
    templateUrl: './event-bus-experiments.component.html',
    styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

    private lessons: Lesson[] = [];

    ngOnInit() {

        console.log('Top level component broadcasted all lessons ...');
        dataStore.initialLessonsList(testLessons.slice(0));

        setTimeout(() => {
            const newLesson = {
               id: Math.random(),
               description: 'New Lesson: from backend.',
               completed: false
            };
            // ToDo - When data arrives from the backend
            dataStore.addLesson(newLesson);

        },10000);


    }

    // ToDo - When adding data
    public addLesson(lessonText: string) {
        const newLesson = {
            id: Math.random(),
            description: lessonText,
            completed: false
        };
        dataStore.addLesson(newLesson);
        let textInput: HTMLInputElement = document.getElementById("input") as HTMLInputElement;
        textInput.value = "";
        textInput.placeholder = "Enter Description";
    }

}












