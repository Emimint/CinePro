import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDescriptionsComponent } from './movie-descriptions.component';

describe('MovieDescriptionsComponent', () => {
  let component: MovieDescriptionsComponent;
  let fixture: ComponentFixture<MovieDescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDescriptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
