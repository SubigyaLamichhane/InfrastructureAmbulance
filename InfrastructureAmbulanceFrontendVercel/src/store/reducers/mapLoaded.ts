import { ActionTypes, ActionI } from '../actions';
import { Reducer } from 'react';
import {
  MapLoadedFormI,
  SetMapLoadedFormActionI,
} from '../actions/setMapLoaded';

const initialState: MapLoadedFormI = {
  isMapLoaded: false,
};

export const mapLoadedFormReducer: Reducer<
  MapLoadedFormI,
  SetMapLoadedFormActionI
> = (state: MapLoadedFormI = initialState, action: ActionI) => {
  switch (action.type) {
    case ActionTypes.setMapLoadedForm:
      return action.payload;
    default:
      return state;
  }
};
