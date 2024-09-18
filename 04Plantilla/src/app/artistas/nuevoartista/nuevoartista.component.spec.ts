import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoartistaComponent } from './nuevoartista.component';

describe('NuevoartistaComponent', () => {
  let component: NuevoartistaComponent;
  let fixture: ComponentFixture<NuevoartistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoartistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoartistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
