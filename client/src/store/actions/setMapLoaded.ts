import 'redux';
import { ActionTypes } from './types';

export interface MapLoadedFormI {
  isMapLoaded: boolean;
}

export interface SetMapLoadedFormActionI {
  type: ActionTypes.setMapLoadedForm;
  payload: MapLoadedFormI;
}

export const setMapLoadedForm = (
  data: MapLoadedFormI
): SetMapLoadedFormActionI => {
  return {
    type: ActionTypes.setMapLoadedForm,
    payload: data,
  };
};
