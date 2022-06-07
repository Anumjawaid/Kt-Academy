import React, {useContext} from "react";
import {User} from "./Model";
import {useSimpleCookieState} from "./UseSimpleCookieState";

export type GlobalState = {
    user: User | null,
    setUser: (user: User | null) => void
}

export const GlobalStateContext = React.createContext<GlobalState>({
    user: null,
    setUser: () => {},
});

export function useGlobalState(): GlobalState {
    return useContext(GlobalStateContext);
}

export const GlobalStateWrapper = ({children}) => {
    const [user, setUser] = useSimpleCookieState<User | null>(null, 'user');
    return <GlobalStateContext.Provider value={{user: user, setUser: setUser}}>
        {children}
    </GlobalStateContext.Provider>;
};