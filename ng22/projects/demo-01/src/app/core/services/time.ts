import { Injectable, Service } from '@angular/core';


@Injectable()
export class TimeOld{

}

@Service()
export class Time {

  private _date: Date = new Date();

  get date() {
    return this._date.getTime();
  }

}
