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



}

