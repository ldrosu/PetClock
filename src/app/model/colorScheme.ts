// Colors for different graphical elements of the clock
export class ColorScheme {
    name: string;
    dial: string;
    hourHand: string;
    minuteHand: string;
    secondHand: string;
    markings: string;
    days: string;
    daysProgress: string;
    daysText: string;
}
// Array of color schemes that can be selected by the user
// If needed new color schemes can be added to the array
export const COLOR_SCHEMES: ColorScheme[] = [{
        name: 'Spring',
        dial: '#a1ffb1',
        hourHand: '#9cb2ff',
        minuteHand: '#ff9a9a',
        secondHand: 'black',
        markings: 'black',
        days: '#d3a1ff',
        daysProgress: '#f8ffc3',
        daysText: 'black'
    }, {
        name: 'Summer',
        dial: '#ff4040',
        hourHand: '#ffb8b8',
        minuteHand: '#f9ff9b',
        secondHand: 'white',
        markings: 'white',
        days: '#44dbdf',
        daysProgress: '#b5ff9f',
        daysText: 'black'
    }, {
        name: 'Autumn',
        dial: '#fc6b05',
        hourHand: '#ffb62b',
        minuteHand: '#65b017',
        secondHand: 'white',
        markings: 'white',
        days: '#99d8d8',
        daysProgress: '#9bb7bb',
        daysText: 'black'

    }, {
        name: 'Winter',
        dial: '#b3cbe5',
        hourHand: '#50acd0',
        minuteHand: '#2e60cc',
        secondHand: 'white',
        markings: 'white',
        days: '#25b7c3',
        daysProgress: '#85ece9',
        daysText: 'black'
    }

];



