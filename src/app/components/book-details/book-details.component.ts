import { Component, Input } from '@angular/core';
import { Book } from '../../../Book';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../../services/book.service';
import { ButtonComponent } from '../button/button.component';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [FormsModule, NgIf, ButtonComponent, FontAwesomeModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  @Input() book!: Book;

  buttonClass = 'saveButton';

  editIcon = faPenToSquare;
  exitIcon = faXmark;

  showEditBookForm!: boolean;
  subsricption!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location,
    private uiService: UiService
  ) {
    this.subsricption = this.uiService
      .onToggle()
      .subscribe((value) => (this.showEditBookForm = value));
  }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id).subscribe((book) => (this.book = book));
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.book) {
      this.bookService.updateBook(this.book).subscribe(() => this.goBack());
    }
  }

  toggleEditBookForm() {
    this.uiService.toggleEditBookForm();
  }
}
