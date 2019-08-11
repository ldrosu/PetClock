// The equivalent of the Date class, adjusted for the difference in life span
// passed into the constructor as lifeExpectancy factor
// Ex: If a human lives 80 years and the pet only 20 the lifeExpectancy factor is 4.
// Other the hours, minutes, and seconds the type contains another unit called subdays
// In the above example one the time of a day may return up to 4 subdays.

export class PetDate {
    private subDays: number;
    private hours: number;
    private minutes: number;
    private seconds: number;
    private milliseconds: number;

    constructor(lifeSpanFactor: number) {
        const d = new Date();

        const trueMilliseconds = ((
            d.getHours() * 60 + d.getMinutes()
            ) * 60 + d.getSeconds()
            ) * 1000 + d.getMilliseconds();

        const totalMilliseconds = Math.floor(trueMilliseconds * lifeSpanFactor);

        this.milliseconds = totalMilliseconds % (1000);

        const totalSeconds = (totalMilliseconds - this.milliseconds) / 1000;
        this.seconds = totalSeconds % 60;

        const totalMinutes = (totalSeconds - this.seconds) / 60;
        this.minutes = totalMinutes % 60;

        const totalHours = (totalMinutes - this.minutes) / 60;
        this.hours = totalHours % 24;

        this.subDays = (totalHours - this.hours) / 24;
    }
    // interface
    public getSubDays(): number {
        return this.subDays;
    }

    public getHours(): number {
        return this.hours;
    }

    public getMinutes(): number {
        return this.minutes;
    }

    public getSeconds(): number {
        return this.seconds;
    }

    public getMilliseconds(): number {
        return this.milliseconds;
    }
}
