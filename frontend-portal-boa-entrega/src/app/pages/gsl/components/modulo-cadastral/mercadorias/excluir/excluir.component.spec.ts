import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExcluirComponent } from './excluir.component';

describe('ExcluirComponent', () => {
  let component: ExcluirComponent;
  let fixture: ComponentFixture<ExcluirComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
