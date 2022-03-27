import { createContext, useContext, useState } from 'react';
import { IActivity } from '../types';

export type CreateTeamContextType = {
  state: { activities: IActivity[] };
  actions: {
    addActivity: (activity: IActivity) => void;
    removeActivity: (activity: IActivity) => void;
  };
};

export const CreateTeamContext = createContext<CreateTeamContextType | null>(
  null,
);

const CreateTeamProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [stateContextCreate, setStateContextCreate] = useState({
    activities: [] as IActivity[],
  });

  const addActivity = (activity: IActivity) => {
    stateContextCreate.activities.push(activity);

    setStateContextCreate({
      ...stateContextCreate,
    });
  };

  const removeActivity = (activity: IActivity) => {
    const index = stateContextCreate.activities.indexOf(activity);
    if (index > -1) {
      stateContextCreate.activities.splice(index, 1); // 2nd parameter means remove one item only
    }

    setStateContextCreate({
      ...stateContextCreate,
    });
  };

  return (
    <CreateTeamContext.Provider
      value={{
        state: stateContextCreate,
        actions: { addActivity, removeActivity },
      }}
    >
      {children}
    </CreateTeamContext.Provider>
  );
};
export const useCreateTeamContext = () =>
  useContext(CreateTeamContext) as CreateTeamContextType;

export default CreateTeamProvider;
