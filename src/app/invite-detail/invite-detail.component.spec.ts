import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteDetailComponent } from './invite-detail.component';

describe('InviteDetailComponent', () => {
  let component: InviteDetailComponent;
  let fixture: ComponentFixture<InviteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
