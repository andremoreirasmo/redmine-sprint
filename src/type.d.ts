interface MainState {
  location: Location<any> | null;
  apiKey: string;
};

type AppState = {
  main: MainState;
}

type AppAction = {
  type: string;
  payload: any;
};

type DispatchType = (args: AppAction) => AppAction;
