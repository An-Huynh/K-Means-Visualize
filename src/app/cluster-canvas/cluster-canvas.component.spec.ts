import { TestBed } from '@angular/core/testing';
import { ClusterCanvasComponent } from './cluster-canvas.component';

describe('ClusterModelComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClusterCanvasComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ClusterCanvasComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
