import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjViewer } from './obj-viewer';

describe('ObjViewer', () => {
  let component: ObjViewer;
  let fixture: ComponentFixture<ObjViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
