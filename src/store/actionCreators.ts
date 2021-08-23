import * as actionTypes from "./actionTypes";
import { Location } from 'history';

export function setLocation(location: Location<any> ) {
  const action: AppAction = {
    type: actionTypes.SET_LOCATION,
    payload: location,
  };

  return action;
}
