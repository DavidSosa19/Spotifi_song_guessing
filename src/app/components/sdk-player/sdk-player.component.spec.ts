import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdkPlayerComponent } from './sdk-player.component';

describe('SdkPlayerComponent', () => {
  let component: SdkPlayerComponent;
  let fixture: ComponentFixture<SdkPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SdkPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SdkPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
