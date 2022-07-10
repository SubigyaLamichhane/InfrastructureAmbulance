import { UpdateFormActionI } from './registerForm';
import { SetMapLoadedFormActionI } from './setMapLoaded';

export enum ActionTypes {
  updateRegisterForm,
  setMapLoadedForm,
}

export type ActionI = UpdateFormActionI | SetMapLoadedFormActionI;
