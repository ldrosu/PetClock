import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
// class that encapsulates calculations that use the moment library
export class MomentService {

  constructor() {}

  public ageText(dateOfBirth: Date, lifeExpectancyFactor: number, shortForm: boolean= false): string {
    const now = new Date();
    const days = (now.getTime() - dateOfBirth.getTime()) / (24 * 60 * 60 * 1000);
    const petDays = Math.floor(days * lifeExpectancyFactor);
    return this.duration(dateOfBirth, petDays, shortForm);
  }

  private duration(startDate: Date, daysDifference: number, shortForm: boolean= false): string {
    const end = moment(startDate);
    end.add(daysDifference, 'days');
    const start = moment(startDate);
    const years = end.diff(start, 'years');
    start.add(years, 'years');
    const months = end.diff(start, 'months');
    start.add(months, 'months');
    const days = end.diff(start, 'days');
    return this.getDurationText(years, months, days, shortForm);

  }

  private getDurationText(years: number, months: number, days: number, shortForm: boolean): string {
    const yearsText: string = this.getText(years, 'year');
    const monthsText: string = this.getText(months, 'month');
    const daysText: string = this.getText(days, 'day');

    const retVals: string[] = [];
    if (yearsText) { retVals.push(yearsText); }
    if (monthsText) { retVals.push(monthsText); }
    if (daysText) { retVals.push(daysText); }

    switch (retVals.length) {
      case 0:
        return null;
      case 1:
        return retVals[0];
      case 2:
        return `${retVals[0]} and ${retVals[1]}`;
      case 3:
        if (shortForm) {
          return `${retVals[0]} and ${retVals[1]}`;
        } else {
          return `${retVals[0]}, ${retVals[1]} and ${retVals[2]}`;
        }
    }
  }

  private getText(val: number, unit: string): string {
    if (val === 0) { return null; } else if (val === 1) { return `${val} ${unit}`; } else { return `${val} ${unit}s`; }
  }
}
