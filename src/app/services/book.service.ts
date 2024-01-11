import { Injectable } from '@angular/core';
import { Book } from '../../Book';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  // GET all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:5000/books').pipe(
      tap((_) => this.log('fetched books')),
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  // GET books by id
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`http://localhost:5000/books/${id}`).pipe(
      tap((_) => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }
  // POST book
  addBook(book: Book): Observable<Book> {
    return this.http
      .post<Book>('http://localhost:5000/books', book, httpOptions)
      .pipe(
        tap((_) => this.log(`book addded = ${book}`)),
        catchError(this.handleError<Book>(`addbook book=${book}`))
      );
  }

  // UPDATE/PUT book
  updateBook(book: Book): Observable<any> {
    return this.http
      .put(`http://localhost:5000/books/${book.id}`, book, httpOptions)
      .pipe(
        tap((_) => this.log(`updated book id=${book.id}`)),
        catchError(this.handleError<any>('uzpdatedBook'))
      );
  }

  //DELETE book
  deleteBook(book: Book): Observable<Book> {
    return this.http.delete<Book>(`http://localhost:5000/books/${book.id}`);
  }

  //Outputs the specified message to the console.
  log(message: string): void {
    console.log(message);
  }

  //handles errors for HTTP requests
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('Error', error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
