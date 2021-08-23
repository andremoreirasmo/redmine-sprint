import { SET_LOCATION } from "./actionTypes";

const INITIAL_STATE: AppState = {
  main : { 
    location: null,
    apiKey: "",
  }
};

export default function AppReducer(
  state: AppState = INITIAL_STATE,
  action: AppState
): AppState {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, location: action.payload };
  }

  return state;
}
