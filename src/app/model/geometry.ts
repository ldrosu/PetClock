import { IMarks, MajorHourMarks, MinorHourMarks, MinuteMarks, HourNumbers } from './Marks';
import { SubDays } from './subDay';
import { PetDate } from './petDate';
// class that deals with all the
export class Geometry {
    lifeSpanFactor: number;

    majorHourMarks: IMarks;
    minorHourMarks: IMarks;
    minuteMarks: IMarks;
    hourNumbers: HourNumbers;

    hourHandAngle = 0;
    minuteHandAngle = 0;
    secondHandAngle = 0;

    subDays: SubDays;
    getPathFromArc: (r1: number, r2: number, start: number, end: number) => string;

    constructor(lifeSpanFactor: number, getPathFromArc: (r1: number, r2: number, start: number, end: number) => string) {
        this.lifeSpanFactor = lifeSpanFactor;
        this.getPathFromArc = getPathFromArc;
        // init data for marks and hour numbers
        this.majorHourMarks = new MajorHourMarks();
        this.minorHourMarks = new MinorHourMarks();
        this.minuteMarks = new MinuteMarks();
        this.hourNumbers = new HourNumbers();

        this.subDays = new SubDays(lifeSpanFactor, getPathFromArc);
        this.setDate();
    }

    setDate() {
        const date: PetDate = new PetDate(this.lifeSpanFactor);
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const subDays = date.getSubDays();
        const totalSeconds = ((subDays * 24 + hours) * 60 + minutes) * 60 + seconds;

        this.secondHandAngle = (seconds) * 6;
        this.minuteHandAngle = (minutes + seconds / 60) * 6;
        this.hourHandAngle = (hours + minutes / 60) * 30;


        const r1 = 41;
        const r2 = 45;
        for (let i = 0; i < this.subDays.data.length; i++) {
            // simple interpolation
            const x1 = this.subDays.data[i].startSecond;
            const x2 = this.subDays.data[i].endSecond;
            const y1 = this.subDays.data[i].startAngle;
            const y2 = this.subDays.data[i].endAngle;
            const start = y1;
            let end = 0;
            if (totalSeconds >= x2) {
                end = y2;
            } else if (totalSeconds <= x1) {
                end = y1;
            } else {
                const scale = (y2 - y1) / (x2 - x1);
                end = y1 + (totalSeconds - x1) * scale;
            }
            this.subDays.data[i].progressPath = this.getPathFromArc(r1, r2, start, end);
        }
    }
}
