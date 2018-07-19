import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

//You generally don't declare components in a routing module so you can delete the @NgModule.declarations array and delete CommonModule references too.
//@NgModule({
//  imports: [
//    CommonModule
//  ],
//  declarations: []
//})

import { RouterModule, Routes } from '@angular/router';
import { InvitesComponent } from './invites/invites.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { InviteDetailComponent } from './invite-detail/invite-detail.component';

const routes: Routes = [
  { path: 'liste-des-invites', component: InvitesComponent },
  { path: 'dashboard', component: DashboardComponent },
  // route par défaut : accueil : on affiche le dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: InviteDetailComponent }
];

@NgModule({
  exports: [ RouterModule ],

  imports: [ RouterModule.forRoot(routes)],

})

export class AppRoutingModule { 
  
}


