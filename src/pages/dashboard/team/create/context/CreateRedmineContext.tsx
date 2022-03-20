/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from 'react';
import { ProjectRedmine } from '../types/';

export type CreateRedmineContextType = {
  state: { projects: ProjectRedmine[]; isLoadingProjects: boolean };
  actions: {
    setProjects: (projects: ProjectRedmine[]) => void;
    setIsLoadingProjects: (isLoadingProjects: boolean) => void;
  };
};

const initialContext = {
  state: { projects: [], isLoadingProjects: false },
  actions: {
    setProjects: (projects: ProjectRedmine[]) => {
      return;
    },
    setIsLoadingProjects: (isLoadingProjects: boolean) => {
      return;
    },
  },
};

export const CreateRedmineContext =
  createContext<CreateRedmineContextType>(initialContext);

const CreateRedmineProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [stateContextCreate, setStateContextCreate] = useState({
    projects: [] as ProjectRedmine[],
    isLoadingProjects: false,
  });

  const setProjects = (projects: ProjectRedmine[]) => {
    setStateContextCreate({
      ...stateContextCreate,
      projects,
    });
  };

  const setIsLoadingProjects = (isLoadingProjects: boolean) => {
    setStateContextCreate({
      ...stateContextCreate,
      isLoadingProjects,
      projects: [],
    });
  };

  return (
    <CreateRedmineContext.Provider
      value={{
        state: stateContextCreate,
        actions: { setProjects, setIsLoadingProjects },
      }}
    >
      {children}
    </CreateRedmineContext.Provider>
  );
};

export default CreateRedmineProvider;
