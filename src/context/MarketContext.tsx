"use client";
import { useContext, createContext, useState } from "react";
import { UserAuth } from "./AuthContext";
import UserType from "@/components/user-type-selection";

interface MarketInfoContext {

}

const MarketInfoContext = createContext<MarketInfoContext>({
});

export const MarketContextProvider = ({ children }: any) => {
    const {user, loading} = UserAuth();
    const [showInitialScreen, setShowInitialScreen] = useState(true);
 

    const sampleUsersQueryEmpty = []


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Not logged in</div>;
    }

    if (user && !loading && showInitialScreen) {
        return (
            <UserType />
        );
        
    }

  return (
    <MarketInfoContext.Provider value={{}}>
      {children}
    </MarketInfoContext.Provider>
  );
};

export const MarketContext = () => {
  return useContext(MarketInfoContext);
};