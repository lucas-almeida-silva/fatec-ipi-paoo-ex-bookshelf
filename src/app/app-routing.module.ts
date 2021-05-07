import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InsertBookComponent } from "./books/insert-book/insert-book.component";
import { ListBooksComponent } from "./books/list-books/list-books.component";

const routes: Routes = [
  { path: '', component: ListBooksComponent },
  { path: 'create', component: InsertBookComponent },
  { path: 'edit/:id', component: InsertBookComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
