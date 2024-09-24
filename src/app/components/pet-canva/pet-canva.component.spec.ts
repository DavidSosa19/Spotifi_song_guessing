import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCanvaComponent } from './pet-canva.component';

describe('PetCanvaComponent', () => {
  let component: PetCanvaComponent;
  let fixture: ComponentFixture<PetCanvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetCanvaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetCanvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
