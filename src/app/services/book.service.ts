import { Injectable } from '@angular/core';
import { Book } from '../../Book';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
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
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:5000/books').pipe(
      tap((_) => this.log('fetched books')),
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`http://localhost:5000/books/${id}`).pipe(
      tap((_) => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }
  updateBook(book: Book): Observable<any> {
    return this.http
      .put(`http://localhost:5000/books/${book.id}`, book, httpOptions)
      .pipe(
        tap((_) => this.log(`updated book id=${book.id}`)),
        catchError(this.handleError<any>('uzpdatedBook'))
      );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(
      'http://localhost:5000/books',
      book,
      httpOptions
    );
  }
  /** DELETE: delete the hero from the server */
  deleteBook(book: Book): Observable<Book> {
    return this.http.delete<Book>(`http://localhost:5000/books/${book.id}`);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
