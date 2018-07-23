import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteSearchComponent } from './invite-search.component';

describe('InviteSearchComponent', () => {
  let component: InviteSearchComponent;
  let fixture: ComponentFixture<InviteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
