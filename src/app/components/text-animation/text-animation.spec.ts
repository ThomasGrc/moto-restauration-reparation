import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnimation } from './text-animation';

describe('TextAnimation', () => {
  let component: TextAnimation;
  let fixture: ComponentFixture<TextAnimation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAnimation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAnimation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
