import { Component, OnInit } from '@angular/core';
import { Invite } from '../invite';
import { InviteService } from '../invite.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  invites: Invite[] = [];


  constructor(private inviteService: InviteService) { }

  ngOnInit() {
    this.getInvites();
  }
  
  getInvites(): void {

    this.inviteService.getInvites()
      .subscribe(invites => this.invites = invites.slice(-3))

  }
}
