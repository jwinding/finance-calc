import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAdvancedComponent } from './input-advanced.component';

describe('InputAdvancedComponent', () => {
  let component: InputAdvancedComponent;
  let fixture: ComponentFixture<InputAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
