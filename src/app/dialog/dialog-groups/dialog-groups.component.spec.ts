import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGroupsComponent } from './dialog-groups.component';

describe('DialogGroupsComponent', () => {
  let component: DialogGroupsComponent;
  let fixture: ComponentFixture<DialogGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
