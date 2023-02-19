import 'redux';
import { ActionTypes } from './types';

export interface RegisterFormI {
  wardNo: 'Ward No.' | number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
}

export interface UpdateFormActionI {
  type: ActionTypes.updateRegisterForm;
  payload: RegisterFormI;
}

export const updateForm = (data: RegisterFormI): UpdateFormActionI => {
  return {
    type: ActionTypes.updateRegisterForm,
    payload: data,
  };
};
