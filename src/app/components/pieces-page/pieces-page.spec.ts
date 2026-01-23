import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesPage } from './pieces-page';

describe('PiecesPage', () => {
  let component: PiecesPage;
  let fixture: ComponentFixture<PiecesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiecesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiecesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
