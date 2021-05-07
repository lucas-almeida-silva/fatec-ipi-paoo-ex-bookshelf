import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Book } from './book.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [];
  private $books = new Subject<Book[]>();
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

  }

  getBooks(): void {
    this.httpClient.get<Book[]>(`${this.apiUrl}/books`).subscribe(
      (books) => {
        this.books = books;
        this.updateBooksSubject();
      }
    );
  }

  getBook(id: string): Observable<Book> {
    return this.httpClient.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  addBook(book: Omit<Book, 'id'>): void {
    this.httpClient.post<{id: string}>(`${this.apiUrl}/books`, book).subscribe(
      ({id}) => {
        this.books.push({id, ...book});
        this.updateBooksSubject();
        this.router.navigateByUrl('/');
      }
    );
  }

  updateBook(book: Book): void {
    const bookId = book.id;

    const updateBook = { ...book };
    delete updateBook.id

    this.httpClient.put(`${this.apiUrl}/books/${bookId}`, updateBook).subscribe(
      () => {
        const index = this.books.findIndex(book => book.id === bookId);
        this.books[index] = book;
        this.$books.next([...this.books]);
        this.router.navigateByUrl('/');
      }
    );
  }

  deleteBook(id: string): void {
    this.httpClient.delete(`${this.apiUrl}/books/${id}`).subscribe(
      () => {
        this.books = this.books.filter(book => book.id !== id);
        this.updateBooksSubject();
      }
    )
  }

  getBooksObservable(): Observable<Book[]> {
    return this.$books.asObservable();
  }

  private updateBooksSubject() {
    this.$books.next([...this.books]);
  }
}
