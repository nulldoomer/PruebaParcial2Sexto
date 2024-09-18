import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoalbumComponent } from './nuevoalbum.component';

describe('NuevoalbumComponent', () => {
  let component: NuevoalbumComponent;
  let fixture: ComponentFixture<NuevoalbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoalbumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoalbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
