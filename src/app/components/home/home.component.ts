import { Component, OnInit } from '@angular/core';
import { Book } from '../../../Book';
import { BookService } from '../../services/book.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService
      .getBooks()
      .subscribe((books) => (this.books = books.slice(1, 5)));
  }
}
