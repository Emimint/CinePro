import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieExperienceComponent } from './movie-experience.component';

describe('MovieExperienceComponent', () => {
  let component: MovieExperienceComponent;
  let fixture: ComponentFixture<MovieExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
