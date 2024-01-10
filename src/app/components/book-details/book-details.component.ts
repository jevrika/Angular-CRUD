import { Component, Input } from '@angular/core';
import { Book } from '../../../Book';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  @Input() book!: Book;

  constructor(
    private route: ActivatedRoute,
    private heroService: BookService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getBook(id).subscribe((book) => (this.book = book));
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.book) {
      this.heroService.updateBook(this.book)
        .subscribe(() => this.goBack());
    }
  }

}
