import { Component } from '@angular/core';
import { Book } from '../../../Book';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { BookService } from '../../services/book.service';
import { MessagesComponent } from '../../messages/messages.component';
import { RouterModule } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../header/header.component';
import { AddBookFormComponent } from '../add-book-form/add-book-form.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    BookDetailsComponent,
    MessagesComponent,
    RouterModule,
    FontAwesomeModule,
    HeaderComponent,
    AddBookFormComponent
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: Book[] = [];

  deleteIcon = faTrash;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((books) => (this.books = books));
  }

  addBook(book: Book) {
    this.bookService.addBook(book).subscribe((book) => this.books.push(book));
  }

  deleteBook(book: Book) {
    this.bookService
      .deleteBook(book)
      .subscribe(
        () =>
          (this.books = this.books.filter((element) => element.id !== book.id))
      );
  }
}
