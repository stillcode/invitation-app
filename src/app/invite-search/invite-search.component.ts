import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Invite } from '../invite';
import { InviteService } from '../invite.service';

@Component({
  selector: 'app-invite-search',
  templateUrl: './invite-search.component.html',
  styleUrls: ['./invite-search.component.css']
})

export class InviteSearchComponent implements OnInit {

  invites$: Observable<Invite[]>;
  //The searchTerms property is declared as an RxJS Subject.
  private searchTerms = new Subject<string>();

  constructor( private inviteService: InviteService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.invites$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      //ignore new term if same as previous term
      distinctUntilChanged(),
      //switch to new search observable each time the term changes
      //switchMap() calls the search service for each search term that makes it through debounce and distinctUntilChanged. 
      //It cancels and discards previous search observables, returning only the latest search service observable.
      switchMap((term: string) => this.inviteService.searchInvites(term)),
    )
  }

}
