import { TestBed } from '@angular/core/testing';
import { ControlsComponent } from './controls.component';

describe('ControlsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlsComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ControlsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
