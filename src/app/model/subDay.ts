const SECONDS_PER_DAY = 24 * 60 * 60;
// Subday contains all the info necessary to draw the extra elements of the clock
// An outer circle is devided into segments that represents subdivisions of a day.
//
export class SubDay {
    // the two ends of the segment
    // note that the radial dimentions are hard coded,
    // svg will be used to scale them.
    startAngle: number;
    endAngle: number;
    // for scale purposes
    startSecond: number;
    endSecond: number;
    // calculated by d3
    path: string;
    text: string;
    textPath: string;
    progressPath: string;

    constructor(startAngle: number, endAngle: number, startSecond: number, endSecond: number) {
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.startSecond = startSecond;
        this.endSecond = endSecond;
    }
}
// The collection of subdays
export class SubDays {
    data: SubDay[] = [];
    constructor(lifeSpanFactor: number, getPathFromArc: any) {
        const interspace = 1;
        const arcSize = 360 / lifeSpanFactor;
        let startAngle = 0;
        let startSecond = 0;
        while (true) {
            let endAngle = startAngle + arcSize;
            let endSecond = startSecond + SECONDS_PER_DAY;
            if (endAngle > 360) {
                endAngle = 360;
                endSecond = SECONDS_PER_DAY * lifeSpanFactor;
            }

            this.data.push(new SubDay(startAngle, endAngle - interspace, startSecond, endSecond));
            startAngle = endAngle;
            startSecond = endSecond;
            if (endAngle >= 360) { break; }
        }
        // use d3 to set paths
        this.data.forEach((el, i) => {
            el.path = getPathFromArc(40, 46, el.startAngle, el.endAngle);

            if ((el.endAngle - el.startAngle) > 15) {
                const pathData = this.describeArc(0, 0, 42, el.startAngle, el.endAngle);
                el.textPath = pathData;
                el.text = `Day ${i + 1}`;
            }
        });

    }
// helper function

    private describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {

        const start = this.polarToCartesian(x, y, radius, startAngle);
        const end = this.polarToCartesian(x, y, radius, endAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

        const d = [
            'M', start.x, start.y,
            'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y
        ].join(' ');

        return d;
    }

    private polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
        };
      }
}
