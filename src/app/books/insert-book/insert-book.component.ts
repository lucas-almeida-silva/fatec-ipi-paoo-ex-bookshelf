import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
  bookForm: FormGroup;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(3)]],
      totalPages: ['', [Validators.required, Validators.min(1)]]
    });

    this.activatedRoute.paramMap.subscribe(params => {
      if(params.has('id')) {
        this.isLoading = true;

        const bookId = params.get('id');

        this.bookService.getBook(bookId).subscribe(
          (book) => {
            this.isLoading = false;
            this.book = book;

            this.bookForm.setValue({
              title: this.book.title,
              author: this.book.author,
              totalPages: this.book.totalPages
            });
          },
          () => {
            this.isLoading = false;
          }
        );
      }
    });
  }

  handleSubmit() {
    if(this.bookForm.invalid) return;

    const book = this.bookForm.value as Book;

    if(this.book) {
      this.bookService.updateBook({id: this.book.id, ...book});
    }
    else {
      this.bookService.addBook(book);
    }
  }
}
