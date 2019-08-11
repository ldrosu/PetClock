// Hour, minute and second markings consist of
// 1) a drawing
// 2) an array of angles at which the drawing is repeated on the circle by rotaion
// The first one is contained in the SVG section of the component template
// usually imported from inskape
// The second part is the IMark interface wich is just an array angles

export interface IMarks {
    angles: number[];

}

export class MajorHourMarks implements IMarks {
    angles: number[] = [];
    constructor() {
        for (let hour = 1; hour <= 12; hour++) {
            if (hour % 3 === 0) {
                this.angles.push(hour * 30);
            }
        }
    }
}

export class MinorHourMarks implements IMarks {
    angles: number[] = [];
    constructor() {
        for (let hour = 1; hour <= 12; hour++) {
            if (hour % 3 !== 0) {
                this.angles.push(hour * 30);
            }
        }
    }
}

export class MinuteMarks implements IMarks {
    angles: number[] = [];
    constructor() {
        for (let i = 1; i <= 60; i++) {
            if (i % 5 !== 0) {
                this.angles.push(i * 6);
            }
        }
    }
}

// For hour numbers we have to calculate not only the angle but also the sine an cosine
// which will be used to position the hour numbers at the right location on the dial
export class HourNumber {
    hour: number;
    angle: number;
    si: number;
    co: number;
    constructor(hour: number) {
        this.hour = hour;
        this.angle = hour * 30;
        this.si = Math.sin(hour * 30 * Math.PI / 180);
        this.co = Math.cos(hour * 30 * Math.PI / 180);
    }
}
// The colection of hour numbers
export class HourNumbers {
    data: HourNumber[];
    constructor() {
        this.data = [];
        for (let hour = 1; hour <= 12; hour++) {
            this.data.push( new HourNumber(hour));
        }
    }
}
