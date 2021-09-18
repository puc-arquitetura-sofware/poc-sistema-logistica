import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloGestaoEstrategicaMainComponent } from './modulo-gestao-estrategica-main.component';

describe('ModuloGestaoEstrategicaMainComponent', () => {
  let component: ModuloGestaoEstrategicaMainComponent;
  let fixture: ComponentFixture<ModuloGestaoEstrategicaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloGestaoEstrategicaMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloGestaoEstrategicaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
