import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloCadastralMainComponent } from './modulo-cadastral-main.component';

describe('MainComponent', () => {
  let component: ModuloCadastralMainComponent;
  let fixture: ComponentFixture<ModuloCadastralMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloCadastralMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloCadastralMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
