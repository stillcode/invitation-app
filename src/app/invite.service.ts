import { Injectable } from '@angular/core';
import { Invite } from './invite';
import { INVITES } from './mock-invites';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})


export class InviteService {

  getInvites(): Observable<Invite[]> {
    this.messageService.add('InviteService: http fetched invites')
    return this.http.get<Invite[]>(this.invitesUrl)
      .pipe(
        tap(invites => this.log("TAP fetched invites")),
        catchError(this.handleError('getInvites', []))
      );
  }

  getInvitesSelected(): Observable<Invite[]> {
    this.messageService.add('InviteService: fetched invitesSelected')
    return of(INVITES);
  }
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getInvitesID(id: number): Observable<Invite> {
    
    const url = `${this.invitesUrl}/${id}`;

    this.messageService.add(`InviteService: fetched invite id =${id}`)
    
    return this.http.get<Invite>(url)
      .pipe(
        tap(_ => this.log(`TAP ID fetched invite id=${id}`)),
        catchError(this.handleError<Invite>(`getInvite id=${id}`))
      );
      // There are three significant differences from getInvitees().
      // it constructs a request URL with the desired hero's id.
      // the server should respond with a single hero rather than an array of invites.
      // therefore, getInvite returns an Observable<Invite> ("an observable of Invite objects") rather than an observable of hero arrays .
  
  }

  private log(message: string ) {
    this.messageService.add(`InviteService: PrivateLog : ${message}`);
  }

  private invitesUrl = 'api/invites';  // URL to web api

  updateInvite(invite: Invite): Observable<any> {

    this.messageService.add(`InviteService: http update one invite ${invite.name}`)
    return this.http.put(this.invitesUrl, invite, httpOptions)
      .pipe(
        tap(_ => this.log("TAP updated invite")),
        catchError(this.handleError<any>('updateInvite'))
      );
    // The HttpClient.put() method takes three parameters
      // the URL
      // the data to update (the modified hero in this case)
      // options


  }
  
  

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
    
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
    
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  addInvite(invite : Invite): Observable<Invite>{
    this.messageService.add('InviteService: http add invite')
    return this.http.post<Invite>(this.invitesUrl, invite, httpOptions)
      .pipe(
        tap((invite: Invite) => this.log(`TAP Ajout invite ${invite.name} avec id=${invite.id}`)),
        catchError(this.handleError<Invite>('addInvite'))
      )
  }

  deleteInvite(invite: Invite | number ): Observable<Invite> {
    const id = typeof invite === 'number' ? invite : invite.id;
    const url = `${this.invitesUrl}/${id}`;
    

    return this.http.delete<Invite>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`TAP suppression de invite ID ${id}`)),
        catchError(this.handleError<Invite>('fonction deleteInvite'))
      )
  
      // it calls HttpClient.delete.
      // the URL is the invites resource URL plus the id of the hero to delete
      // you don't send data as you did with put and post.
      // you still send the httpOptions.
  
  }

  searchInvites(term: string): Observable<Invite[]> {
    if (!term.trim()) {
      // if not search term, return empty arry
      return of([]);
    }
    return this.http.get<Invite[]>(`${this.invitesUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`invites trouves avec le terme: ${term}`)),
        catchError(this.handleError<Invite[]>('fonction searchInvites', []))
      );
  }

    /** GET hero by id. Return `undefined` when id not found */
    getInviteNo404<Data>(id: number): Observable<Invite> {
      const url = `${this.invitesUrl}/?id=${id}`;
      return this.http.get<Invite[]>(url)
        .pipe(
          map(invites => invites[0]), // returns a {0|1} element array
          tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} hero id=${id}`);
          }),
          catchError(this.handleError<Invite>(`getInvite id=${id}`))
        );
    }
}
