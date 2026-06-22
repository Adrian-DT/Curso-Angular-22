import { Injectable, Service } from '@angular/core';


// Versiones previas a 22
@Injectable()
export class TimeOld {
  private _date: Date = new Date();

  getTime()  {
    return this._date.getTime();
  }
}

// Version 22
@Service()
export class Time {

  private _date: Date = new Date();

  getTime()  {
    return this._date.getTime();
  }

}
