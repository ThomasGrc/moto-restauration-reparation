import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
} from "@angular/core";

import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

@Component({
  selector: "app-obj-viewer",
  standalone: true,
  template: `<div class="viewer" #host></div>`,
  styles: [
    `
      .viewer {
        width: 100%;
        height: 500px; /* override via parent CSS if desired */
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjViewerComponent implements AfterViewInit, OnDestroy {
  @ViewChild("host", { static: true }) hostRef!: ElementRef<HTMLDivElement>;

  /** URL to .obj (e.g. "assets/models/chair.obj") */
  @Input({ required: true }) objUrl!: string;

  /** Enable/disable auto-rotation */
  @Input() autoRotate = true;

  /** Radians per frame (approx). Typical: 0.002 - 0.01 */
  @Input() rotationSpeed = 0.003;

  /**
   * Camera framing offset used after model load.
   * Smaller = more zoomed in. Typical: 0.85 - 1.3
   */
  @Input() fitOffset = 0.9;

  /** Optional: set renderer background; null keeps transparent */
  @Input() background: string | null = null;

  /** Scale applied when width < 800px */
  @Input() smallScreenScale = 0.7;

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;

  private frameId: number | null = null;
  private resizeObserver?: ResizeObserver;

  private modelRoot?: THREE.Object3D;
  private baseScale = 1; // scale after normalization

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.initThree();
    this.loadObj(this.objUrl);

    this.zone.runOutsideAngular(() => {
      this.startLoop();
      this.observeResize();
    });
  }

  ngOnDestroy(): void {
    this.stopLoop();
    this.resizeObserver?.disconnect();
    this.disposeAll();
  }

  private initThree(): void {
    const host = this.hostRef.nativeElement;
    const width = host.clientWidth || 1;
    const height = host.clientHeight || 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    if (this.background) {
      renderer.setClearColor(new THREE.Color(this.background), 1);
    } else {
      renderer.setClearAlpha(0);
    }

    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(0, 0.8, 1.8);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(3, 5, 2);
    scene.add(dir);

    // Ground (grid)
    const grid = new THREE.GridHelper(10, 10);
    grid.position.y = -0.5;
    scene.add(grid);

    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
  }

  private loadObj(url: string): void {
    if (!this.scene) return;

    const loader = new OBJLoader();
    loader.load(
      url,
      (object) => {
        if (this.modelRoot) {
          this.scene!.remove(this.modelRoot);
          this.disposeObject(this.modelRoot);
        }

        // Normalize scale and center
        const box = new THREE.Box3().setFromObject(object);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxAxis = Math.max(size.x, size.y, size.z) || 1;

        object.scale.multiplyScalar(1 / maxAxis);
        this.baseScale = object.scale.x;

        box.setFromObject(object);
        const center = new THREE.Vector3();
        box.getCenter(center);
        object.position.sub(center);

        this.modelRoot = object;
        this.scene!.add(object);

        this.fitCameraToObject(object, this.fitOffset);
        this.applyResponsiveScale();
      },
      undefined,
      (err) => console.error("OBJ load error:", err)
    );
  }

  private fitCameraToObject(object: THREE.Object3D, offset = 1.0): void {
    if (!this.camera) return;

    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const fov = (this.camera.fov * Math.PI) / 180;

    let cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2));
    cameraZ *= offset;

    this.camera.position.set(center.x, center.y + maxDim * 0.15, center.z + cameraZ);
    this.camera.near = Math.max(cameraZ / 100, 0.001);
    this.camera.far = cameraZ * 100;
    this.camera.updateProjectionMatrix();
  }

  private startLoop(): void {
    const tick = () => {
      if (!this.renderer || !this.scene || !this.camera) return;

      if (this.autoRotate && this.modelRoot) {
        this.modelRoot.rotation.y += this.rotationSpeed;
      }

      this.renderer.render(this.scene, this.camera);
      this.frameId = requestAnimationFrame(tick);
    };

    this.frameId = requestAnimationFrame(tick);
  }

  private stopLoop(): void {
    if (this.frameId !== null) cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }

  private observeResize(): void {
    const host = this.hostRef.nativeElement;

    this.resizeObserver = new ResizeObserver(() => {
      if (!this.renderer || !this.camera) return;

      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;

      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);

      this.applyResponsiveScale();
    });

    this.resizeObserver.observe(host);
  }

  private applyResponsiveScale(): void {
    if (!this.modelRoot) return;

    const width = this.hostRef.nativeElement.clientWidth;

    const scaleFactor =
      width < 800 ? this.smallScreenScale : 1;

    this.modelRoot.scale.setScalar(this.baseScale * scaleFactor);
  }

  private disposeAll(): void {
    if (this.modelRoot) {
      this.disposeObject(this.modelRoot);
      this.modelRoot = undefined;
    }

    if (this.renderer) {
      const canvas = this.renderer.domElement;
      this.renderer.dispose();
      canvas.parentElement?.removeChild(canvas);
    }

    this.renderer = undefined;
    this.scene = undefined;
    this.camera = undefined;
  }

  private disposeObject(object: THREE.Object3D): void {
    object.traverse((obj) => {
      const mesh = obj as THREE.Mesh;

      if (mesh.geometry) mesh.geometry.dispose?.();

      const material = (mesh as any).material;
      if (material) {
        if (Array.isArray(material)) {
          material.forEach((m) => this.disposeMaterial(m));
        } else {
          this.disposeMaterial(material);
        }
      }
    });
  }

  private disposeMaterial(material: THREE.Material): void {
    for (const key of Object.keys(material)) {
      const value = (material as any)[key];
      if (value && value.isTexture) value.dispose?.();
    }
    material.dispose?.();
  }
}
