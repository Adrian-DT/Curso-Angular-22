import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ValidRoleDirective } from './valid-role.directive';

@Component({
  template: `<div *alceValidRole="true">
    <p>Test Valid Role</p>
  </div>`,
  imports: [ValidRoleDirective],
})
class TestHostComponent {}

describe('ValidRoleDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create the host component', () => {
    expect(component).toBeTruthy();
  });
  it('should create an instance', () => {
    const divElementDirective = debugElement.queryAllNodes(By.directive(ValidRoleDirective))[0];
    expect(divElementDirective).toBeTruthy();
    const paragraph = debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.textContent).toBe('Test Valid Role');
  });
});
