import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './card';
import { Component } from '@angular/core';

const TEXT = "Hello World";

@Component({
  imports: [Card],
  template: `<ind-card> {{ text }} </ind-card>`,
})
class TestHostComponent {
  protected readonly text = TEXT;
}


describe('TestComponent with Card', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Card with the text content', () => {
    const cardElement = fixture.nativeElement.querySelector('ind-card');
    expect(cardElement.textContent).toContain(TEXT);
  });
});
