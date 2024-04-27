import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgentMovieComponent } from './admin-agent-movie.component';

describe('AdminAgentMovieComponent', () => {
  let component: AdminAgentMovieComponent;
  let fixture: ComponentFixture<AdminAgentMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAgentMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAgentMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
