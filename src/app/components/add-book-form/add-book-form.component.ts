import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { Book } from '../../../Book';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-book-form',
  standalone: true,
  imports: [ButtonComponent, FormsModule, CommonModule],
  templateUrl: './add-book-form.component.html',
  styleUrl: './add-book-form.component.css',
})
export class AddBookFormComponent {
  @Output() onAddBook: EventEmitter<Book> = new EventEmitter();

  id!: number;
  title!: string;
  image!: string;
  author!: string;
  description!: string;
  genre!: string;
  publishing_year!: any;

  buttonClass = 'formButton';

  showAddBookForm!: boolean;
  subscruption: Subscription;

  constructor(private uiService: UiService) {
    this.subscruption = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddBookForm = value));
  }
  //When the event (value change) occurs, it updates the property of the
  //showAddBookForm component with the latest value.
  
  onSubmit() {
    // checks if the fields are not empty
    if (
      !this.title ||
      !this.image ||
      !this.author ||
      !this.description ||
      !this.genre ||
      !this.publishing_year
    ) {
      alert('Please fill all form fields');
      return;
    }
    // creates a new book with entered data
    const newBook: Book = {
      id: this.id,
      title: this.title,
      image: this.image,
      author: this.author,
      description: this.description,
      genre: this.genre,
      publishing_year: this.publishing_year,
    };

    // sends the new book.
    this.onAddBook.emit(newBook);

    // clears input fields
    this.title = '';
    this.image = '';
    this.author = '';
    this.description = '';
    this.genre = '';
    this.publishing_year = '';
  }
}
