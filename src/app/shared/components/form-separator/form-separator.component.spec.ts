import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSeparatorComponent } from './form-separator.component';

describe('FormSeparatorComponent', () => {
  let component: FormSeparatorComponent;
  let fixture: ComponentFixture<FormSeparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSeparatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
