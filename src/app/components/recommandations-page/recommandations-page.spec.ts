import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommandationsPage } from './recommandations-page';

describe('RecommandationsPage', () => {
  let component: RecommandationsPage;
  let fixture: ComponentFixture<RecommandationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommandationsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommandationsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
