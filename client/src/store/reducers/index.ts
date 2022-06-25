import { combineReducers } from 'redux';
import { registerFormReducer } from './registerForm';
import { RegisterFormI } from '../actions';

export interface StoreStateI {
  registerForm: RegisterFormI;
}

export const reducers = combineReducers<StoreStateI>({
  registerForm: registerFormReducer,
});
