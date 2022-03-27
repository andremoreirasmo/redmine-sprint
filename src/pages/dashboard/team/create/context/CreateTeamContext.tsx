import { createContext, useContext, useState } from 'react';
import { IActivity, ICategory } from '../types';

export type CreateTeamContextType = {
  state: { activities: IActivity[]; categories: ICategory[] };
  actions: {
    addActivity: (activity: IActivity) => void;
    removeActivity: (activity: IActivity) => void;
    addCategory: (category: ICategory) => void;
    removeCategory: (category: ICategory) => void;
  };
};

export const CreateTeamContext = createContext<CreateTeamContextType | null>(
  null,
);

const CreateTeamProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [stateContextCreate, setStateContextCreate] = useState({
    activities: [] as IActivity[],
    categories: [] as ICategory[],
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
      stateContextCreate.activities.splice(index, 1);
    }

    setStateContextCreate({
      ...stateContextCreate,
    });
  };

  const addCategory = (category: ICategory) => {
    stateContextCreate.categories.push(category);

    setStateContextCreate({
      ...stateContextCreate,
    });
  };

  const removeCategory = (category: ICategory) => {
    const index = stateContextCreate.categories.indexOf(category);
    if (index > -1) {
      stateContextCreate.categories.splice(index, 1);
    }

    setStateContextCreate({
      ...stateContextCreate,
    });
  };

  return (
    <CreateTeamContext.Provider
      value={{
        state: stateContextCreate,
        actions: { addActivity, removeActivity, addCategory, removeCategory },
      }}
    >
      {children}
    </CreateTeamContext.Provider>
  );
};
export const useCreateTeamContext = () =>
  useContext(CreateTeamContext) as CreateTeamContextType;

export default CreateTeamProvider;
