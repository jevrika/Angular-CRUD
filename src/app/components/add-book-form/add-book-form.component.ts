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

  onSubmit() {
    if (
      !this.title ||
      !this.image ||
      !this.author ||
      !this.genre ||
      !this.publishing_year
    ) {
      alert('Please fill all form fields');
      return;
    }

    const newBook: Book = {
      id: this.id,
      title: this.title,
      image: this.image,
      author: this.author,
      genre: this.genre,
      publishing_year: this.publishing_year,
    };

    this.onAddBook.emit(newBook);

    this.title = '';
    this.image = '';
    this.author = '';
    this.genre = '';
    this.publishing_year = '';
  }
}
