import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMercadoriaComponent } from './lista-mercadoria.component';

describe('ListaMercadoriaComponent', () => {
  let component: ListaMercadoriaComponent;
  let fixture: ComponentFixture<ListaMercadoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMercadoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMercadoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
