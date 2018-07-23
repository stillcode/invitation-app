import { Component, OnInit } from '@angular/core';

import { Invite } from '../invite';
import { INVITES } from '../mock-invites';
import { InviteService } from '../invite.service';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {

  // invite: Invite = {
  //   id : 1,
  //   name: 'Windstorm'
  // };
  invites: Invite[];


  constructor(private inviteService: InviteService) { }

  ngOnInit() {
    this.getInvites();
  }


  getInvites(): void {
    this.inviteService.getInvites()
      .subscribe(invites => this.invites = invites);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    //When the given name is non-blank, the handler creates a Hero-like object from the name (it's only missing the id) and passes it to the services addHero() method.
    //When addHero saves successfully, the subscribe callback receives the new hero and pushes it into to the heroes list for display.
    this.inviteService.addInvite({name} as Invite)
      .subscribe(invite => {
        this.invites.push(invite);
      })
  }

  delete(invite: Invite): void {
    this.invites = this.invites.filter(h => h !== invite);
    this.inviteService.deleteInvite(invite)
      .subscribe();

  }



}

