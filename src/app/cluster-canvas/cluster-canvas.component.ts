import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { Cluster } from 'src/models/Cluster';
import {
  AxesHelper,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'cluster-canvas',
  templateUrl: './cluster-canvas.component.html',
  styleUrls: ['./cluster-canvas.component.scss'],
})
export class ClusterCanvasComponent implements AfterViewInit, OnChanges {
  @Input() public clusters: Cluster[] = [];

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  private camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;
  private scene!: Scene;

  public ngAfterViewInit() {
    this.setupSceneAndCamera();
    this.startRenderingLoop();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.scene?.clear();
    this.scene?.add(new AxesHelper(100));
    this.clusters.forEach((cluster) => {
      const geometry = new BufferGeometry();
      geometry.setAttribute(
        'position',
        new Float32BufferAttribute(cluster.data.flat(), 3)
      );
      const color = new Vector3().random();
      const material = new PointsMaterial({
        color: new Color(color.x, color.y, color.z),
        sizeAttenuation: false,
        size: 5,
      });
      const points = new Points(geometry, material);
      this.scene.add(points);
    });
    this.renderer?.render(this.scene, this.camera);
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private getAspectRatio(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private setupSceneAndCamera(): void {
    this.scene = new Scene();
    this.scene.add(new AxesHelper(100));
    this.camera = new PerspectiveCamera(50, this.getAspectRatio(), 0.1, 20000);
    this.camera.position.set(5, 5, 5);
  }

  private startRenderingLoop(): void {
    // Setup renderer.
    this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    // Allow orbit controls.
    const orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    orbitControls.enablePan = true;

    // initial render.
    this.renderer.render(this.scene, this.camera);

    // re-render when camera is moved.
    orbitControls.addEventListener('change', () => {
      this.renderer.render(this.scene, this.camera);
    });
  }
}
