import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloServicoClienteMainComponent } from './modulo-servico-cliente-main.component';

describe('MainComponent', () => {
  let component: ModuloServicoClienteMainComponent;
  let fixture: ComponentFixture<ModuloServicoClienteMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloServicoClienteMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloServicoClienteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
