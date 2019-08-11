import { PetFormData} from './model/petFormData';
import { ColorScheme, COLOR_SCHEMES } from './model/colorScheme';
import { SET_PET_DATA, SET_COLOR_SCHEME} from './actions';

export interface IAppState {
    version:  string;
    petFormData: PetFormData;
    colorScheme: ColorScheme;
    lastUpdate: Date;
}

export const INITIAL_STATE: IAppState = {
    version: '1.0.0.0',
    petFormData: {
        name: 'Rocky',
        type: 'dog',
        dateOfBirth: new Date(2015, 0, 1)
    },
    colorScheme: Object.assign({}, COLOR_SCHEMES[0]),
    lastUpdate: null
};

export function rootReducer(state: IAppState, action) {
  switch (action.type) {
    case SET_PET_DATA:
      return Object.assign( {}, state, {
          petFormData: action.petFormData,
          lastUpdate: new Date()
      });
    case SET_COLOR_SCHEME:
      return Object.assign( {}, state, {
          colorScheme: action.colorScheme,
          lastUpdate: new Date()
      });
    }
  return state;
}
