import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-insert-book',
  templateUrl: './insert-book.component.html',
  styleUrls: ['./insert-book.component.css']
})
export class InsertBookComponent implements OnInit {
  book: Book;
  isLoading = false;

  @ViewChild('registerBookForm') registerBookForm: NgForm;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.has('id')) {
        this.isLoading = true;

        const bookId = params.get('id');

        this.bookService.getBook(bookId).subscribe(
          (book) => {
            this.book = book;
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
          }
        );
      }
    });
  }

  handleSubmit() {
    if(this.registerBookForm.invalid) return;

    const book = this.registerBookForm.value as Book;

    if(this.book) {
      this.bookService.updateBook({id: this.book.id, ...book});
    }
    else {
      this.bookService.addBook(book);
    }
  }
}
