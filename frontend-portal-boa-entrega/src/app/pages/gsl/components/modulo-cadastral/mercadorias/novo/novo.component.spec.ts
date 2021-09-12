import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NovoComponent } from './novo.component';

describe('NovoComponent', () => {
  let component: NovoComponent;
  let fixture: ComponentFixture<NovoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
