import {Observable, Observer, Subject} from '../event-bus-experiments/event-bus';
import {Lesson} from './model/lesson';
import * as _ from 'lodash';
import {testLessons} from './model/test-lessons';


class SubjectImplementation implements Subject {

    private observers: Observer[] = [];

    next(data: any) {
        this.observers.forEach(o => o.next(data));
    }

    subscribe(obs: Observer) {
        this.observers.push(obs);
    }

    unsubscribe(obs: Observer) {
        _.remove(this.observers, o => o === obs);
    }
}

// this will be private to this module
// making the data unavailable for anyone else to modify

// these are the only visible globals


class DataStore implements Observable {

    subscribe(obs: Observer) {
        this.lessonsListSubject.subscribe(obs);
        obs.next(this.lessons);
    }

    unsubscribe(obs: Observer) {
        this.lessonsListSubject.unsubscribe(obs)
    }

    private lessons: Lesson[] = [];
    private lessonsListSubject = new SubjectImplementation();


    public addLesson(data: Lesson) {
        // Important: clone the data
        // Data is by reference meaning that anyone that has that reference can modify it.
        this.lessons.push(_.clone(data));
        this.broadcast();
    }

    public deleteLesson(data: Lesson) {
        _.remove(this.lessons, lesson => lesson.id === data.id )
        this.broadcast();
    }

    public toggleLessonViewed(lesson: Lesson) {
        console.log(`toggling lesson ... ${lesson.id} : ${lesson.completed}`);
        const foundLesson = _.find(this.lessons, (lessonToFind) => lessonToFind.id === lesson.id);
        if (foundLesson) {
            console.log(`lesson found: ${foundLesson.id} : ${foundLesson.completed}`);
            foundLesson.completed = !foundLesson.completed;
            this.broadcast();
        } else {
            console.log(`Lesson wasn't found: ${lesson.description}`);
        }
    }

    public initialLessonsList(newList: Lesson[]) {
        // Important: clone the data
        // Data is by reference meaning that anyone that has that reference can modify it.
        this.lessons = _.cloneDeep(newList);
        this.broadcast();
    }

    public broadcast() {
        this.lessonsListSubject.next(_.cloneDeep(this.lessons));
    }
}

export const dataStore = new DataStore();
dataStore.initialLessonsList(testLessons);