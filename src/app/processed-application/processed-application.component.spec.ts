import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedApplicationComponent } from './processed-application.component';

describe('ProcessedApplicationComponent', () => {
  let component: ProcessedApplicationComponent;
  let fixture: ComponentFixture<ProcessedApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessedApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessedApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
