import { IAppState } from './store';

const STATE_STORAGE_KEY = 'PetClockState';

export const LocalStorage = {

    loadState: () => {
        try {
            const serializedState = localStorage.getItem(STATE_STORAGE_KEY);
            if (serializedState === null) {
                    return undefined;
            }
            const state: any = JSON.parse(serializedState);
            state.petFormData.dateOfBirth = new Date(state.petFormData.dateOfBirth);
            return state;
        } catch (error) {
            return undefined;
        }
    } ,

    saveState: (state: IAppState) => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem(STATE_STORAGE_KEY, serializedState);
        } catch (error) {
            console.log('LocalStorage saveState failed. Error:' + error);
        }
    }
};
