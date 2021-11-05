import { createContext, Dispatch, useReducer } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

type Auth = {
  user: User;
};

type Recipe = {
  id: number;
  title: string;
  author: string;
  text: string;
  img: string;
};

type BackendState = {
  auth: Auth;
  user: {};
  recipes: Recipe[];
};

type BackendStateContextProps = {
  state: BackendState;
  dispatch: Dispatch<any>;
};

export const BackendContext = createContext({} as BackendStateContextProps);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGOUT": {
      return {
        ...state,
        auth: {
          ...state.auth,
          user: null,
        },
      };
    }
    case "LOGGED_IN": {
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.user,
        },
      };
    }
  }
};

const initialState = {
  auth: {
    user: null,
  },
  user: {},
  recipes: [
    {
      id: "0",
      title: "recipe title 0",
      author: "author 0",
      text: "text 0",
      img: "img 0",
    },
    {
      id: "1",
      title: "recipe title 1",
      author: "author 1",
      text: "text 1",
      img: "img 1",
    },
    {
      id: "2",
      title: "recipe title 2",
      author: "author 2",
      text: "text 2",
      img: "img 2",
    },
    {
      id: "3",
      title: "recipe title 3",
      author: "author 3",
      text: "text 3",
      img: "img 3",
    },
  ],
};

export const DataProvider: React.FC = (props) => {
  const fullInitialState = {
    ...initialState,
  };

  const [state, dispatch] = useReducer(reducer, fullInitialState);

  return (
    <BackendContext.Provider value={{ state: state, dispatch: dispatch }}>
      {props.children}
    </BackendContext.Provider>
  );
};

export const AppContextConsumer = BackendContext.Consumer;

// Some state action creators
export const logout = () => ({
  type: "LOGOUT",
});

export const loggedIn = (user: any) => ({
  type: "LOGGED_IN",
  user,
});

// Some state selectors
export const getUser = (state: BackendState) => state.user;
export const getRecipes = (state: BackendState) => state.recipes;
export const getTrack = (state: BackendState, id: number) =>
  state.recipes.find((recipe) => recipe.id === id);
export const getRecipeIndex = (state: BackendState, id: number) =>
  state.recipes.findIndex((recipe) => recipe.id === id);
