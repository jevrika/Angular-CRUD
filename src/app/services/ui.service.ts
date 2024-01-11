import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {

  private showAddBookForm: boolean = false;
  private showEditBookForm: boolean = false;
  
  private subject = new Subject<any>();

  constructor() {}

  toggleAddBookForm(): void {
    this.showAddBookForm = !this.showAddBookForm;
    this.subject.next(this.showAddBookForm);
  }

  toggleEditBookForm(): void {
    this.showEditBookForm = !this.showEditBookForm;
    this.subject.next(this.showEditBookForm);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
