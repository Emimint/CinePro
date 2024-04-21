import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterListContainerComponent } from './theater-list-container.component';

describe('TheaterListContainerComponent', () => {
  let component: TheaterListContainerComponent;
  let fixture: ComponentFixture<TheaterListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheaterListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheaterListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
