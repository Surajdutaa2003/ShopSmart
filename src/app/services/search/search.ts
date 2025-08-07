import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Search {
  searchQuery = new BehaviorSubject<string>('')
  searchQuery$ = this.searchQuery.asObservable()

  updateSearchQuery(query: string) {
    this.searchQuery.next(query)
  }
}
