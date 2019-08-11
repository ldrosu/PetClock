// Abstraction for both pets and human data
// type can be human or any other animal category
// this class containes paths for black and whites silhouette transparent pngs

export class Species {
    type: string;
    lifeExpectancy: number;
    imagePath_white: string;
    imagePath_black: string;
}

export const HUMAN: Species = {
    type: 'human',
    lifeExpectancy: 80,
    imagePath_white: 'assets/images/human_white.png',
    imagePath_black: 'assets/images/human_black.png'
};

export const PET_SPECIES: Species[] = [{
    type: 'dog',
    lifeExpectancy: 12,
    imagePath_white: 'assets/images/samoyed_white.png',
    imagePath_black: 'assets/images/samoyed_black.png'
}, {
    type: 'cat',
    lifeExpectancy: 15,
    imagePath_white: 'assets/images/cat_white.png',
    imagePath_black: 'assets/images/cat_black.png'
}, {
    type: 'parakeet',
    lifeExpectancy: 14,
    imagePath_white: 'assets/images/parakeet_white.png',
    imagePath_black: 'assets/images/parakeet_black.png'
}, {
    type: 'hamster',
    lifeExpectancy: 4,
    imagePath_white: 'assets/images/hamster_white.png',
    imagePath_black: 'assets/images/hamster_black.png'
}];


