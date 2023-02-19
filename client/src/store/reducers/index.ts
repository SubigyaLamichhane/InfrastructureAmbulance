import { combineReducers } from 'redux';
import { registerFormReducer } from './registerForm';
import { mapLoadedFormReducer } from './mapLoaded';
import { RegisterFormI } from '../actions';
import { MapLoadedFormI } from '../actions/setMapLoaded';

export interface StoreStateI {
  registerForm: RegisterFormI;
  mapLoadedForm: MapLoadedFormI;
}

export const reducers = combineReducers<StoreStateI>({
  registerForm: registerFormReducer,
  mapLoadedForm: mapLoadedFormReducer,
});
