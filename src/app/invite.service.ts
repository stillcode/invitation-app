import { Injectable } from '@angular/core';
import { Invite } from './invite';
import { INVITES } from './mock-invites';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  getInvites(): Observable<Invite[]> {
    this.messageService.add('InviteService: fetched invites')
    return of(INVITES);
  }

  getInvitesSelected(): Observable<Invite[]> {
    this.messageService.add('InviteService: fetched invitesSelected')
    return of(INVITES);
  }
  constructor(private messageService: MessageService) { }

  getInvitesID(id: number): Observable<Invite> {
    this.messageService.add(`InviteService: fetched invite id =${id}`)
    // Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    return of(INVITES.find(invite => invite.id === id));
  }

}
