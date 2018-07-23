import { Component, OnInit, Input } from '@angular/core';
import { Invite } from '../invite';

//The HeroDetailComponent needs a new way to obtain the hero-to-display.
// Get the route that created it,
// Extract the id from the route
// Acquire the hero with that id from the server via the HeroService

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InviteService }  from '../invite.service';

@Component({
  selector: 'app-invite-detail',
  templateUrl: './invite-detail.component.html',
  styleUrls: ['./invite-detail.component.css']
})
export class InviteDetailComponent implements OnInit {

  @Input() invite: Invite;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private inviteService: InviteService
  ) { }

// The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. 
//   This component is interested in the route's bag of parameters extracted from the URL. The "id" parameter is the id of the hero to display.
// The HeroService gets hero data from the remote server and this component will use it to get the hero-to-display.
// The location is an Angular service for interacting with the browser. You'll use it later to navigate back to the view that navigated here.
  ngOnInit(): void {
    this.getInvite();
  }

  getInvite(): void {
    const id = +this.route.snapshot.paramMap.get('id');
  // The route.snapshot is a static image of the route information shortly after the component was created.
  // The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
  // Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.
  // The browser refreshes and the app crashes with a compiler error. HeroService doesn't have a getHero() method. Add it now.
    this.inviteService.getInvitesID(id)
      .subscribe(invite => this.invite = invite);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.inviteService.updateInvite(this.invite)
      .subscribe(() => this.goBack())
  }

}
