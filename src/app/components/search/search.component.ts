import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce:EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();
  searchEntry:string = '';

  search(){
    this.onEnter.emit(this.searchEntry);
  }

  keyPressed(){
    this.debouncer.next(this.searchEntry);
  }

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe(value=>{
      this.onDebounce.emit(value);
    })
  }
}
