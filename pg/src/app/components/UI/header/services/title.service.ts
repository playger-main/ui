import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSubject = new BehaviorSubject<string>('Загрузка...');
  title$ = this.titleSubject.asObservable();

  constructor(private title: Title) {}

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle); // Устанавливаем заголовок в <title>
    this.titleSubject.next(newTitle); // Обновляем значение для header
  }
}
