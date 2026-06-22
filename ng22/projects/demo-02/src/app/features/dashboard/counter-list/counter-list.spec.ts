import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterList } from './counter-list';
import { By } from '@angular/platform-browser';
import { Counter } from '../counter/counter';

describe('CounterList', () => {
  let component: CounterList;
  let fixture: ComponentFixture<CounterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterList],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update totalValue and totalClicks when counterChange is called', () => {
    const initialTotalValue = component['totalValue']();
    const initialTotalClicks = component['totalClicks']();
    const delta = 1;
    const indCountersDebug = fixture.debugElement.queryAll(By.directive(Counter));
    expect(indCountersDebug.length).toBe(2);
    indCountersDebug[0].triggerEventHandler('countEvent', delta);
    fixture.detectChanges();
    expect(component['totalValue']()).toBe(initialTotalValue + delta);
    expect(component['totalClicks']()).toBe(initialTotalClicks + 1);
  });
});
