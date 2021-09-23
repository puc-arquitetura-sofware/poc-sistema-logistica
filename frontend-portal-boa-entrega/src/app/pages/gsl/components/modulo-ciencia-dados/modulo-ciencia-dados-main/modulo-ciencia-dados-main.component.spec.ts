import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloCienciaDadosMainComponent } from './modulo-ciencia-dados-main.component';

describe('ModuloCienciaDadosMainComponent', () => {
  let component: ModuloCienciaDadosMainComponent;
  let fixture: ComponentFixture<ModuloCienciaDadosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloCienciaDadosMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloCienciaDadosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
