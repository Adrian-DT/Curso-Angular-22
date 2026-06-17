import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from './card';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


const TEXT = "Hello World";

@Component({
  imports: [Card],
  template: `<ind-card> {{ text }} </ind-card>`,
})
class TestHostComponent {
  protected readonly text = TEXT;
}


describe("Card", () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    debugElement = fixture.debugElement;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    const cardElement: HTMLElement = debugElement.query(
      By.directive(Card)
    ).nativeElement;
    expect(cardElement).toBeTruthy();
    expect(cardElement.textContent).toContain(TEXT);
  });
});
