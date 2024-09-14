"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { UserAuth } from "./AuthContext";
import UserType from "@/components/user-type-selection";
import SellerDetailsQuestionaire from "@/components/seller-details-questionaire";
import { searchUserByUid, createUser } from "@/services/userService";

interface MarketInfoContext {

}

const MarketInfoContext = createContext<MarketInfoContext>({
});

export const MarketContextProvider = ({ children }: any) => {
    const {user, loading} = UserAuth();
    const [showBuyerOrSellerScreen, setShowBuyerOrSellerScreen] = useState(false);
    const [showSellerDetailsScreen, setShowSellerDetailsScreen] = useState(false);

    useEffect(() => {
        if (user){
          searchUserByUid(user.uid).then((userQuery) => {
            console.log("= = = = = = = = ");
            console.log(userQuery);
            console.log("= = = = = = = = ");

            if (userQuery) {
              setShowBuyerOrSellerScreen(false);
              setShowSellerDetailsScreen(false);
            } else {
              setShowBuyerOrSellerScreen(true);
            }
          });
        }
    }, [loading]);






    const [selectedUserType, setSelectedUserType] = useState({ buyer: false, seller: false })

    const handleUserTypeToggle = (type) => {
        setSelectedUserType((prevState) => ({
          ...prevState,
          [type]: !prevState[type],
        }))
    }
    
    const onBuyerOrSellerSubmit = () => {
      setShowBuyerOrSellerScreen(false);
      if (selectedUserType.seller) {
        setShowSellerDetailsScreen(true);
      }
    };

    const onSellerDetailsSubmit = () => {
      setShowSellerDetailsScreen(false);
      // create a user using the createUserService
      const userToAdd = {
        uid: user.uid,
        andrewId: user.email.split('@')[0],
        email: user.email,
      }

      createUser(userToAdd).then((response) => {
        console.log(response);});

    }


    const sampleUsersQueryEmpty = []


    useEffect(() => {
      console.log(selectedUserType);
    }, [selectedUserType])


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Not logged in</div>;
    }

    if (user && !loading && showBuyerOrSellerScreen) {
        return (
          // pass selectedUserType and setSelectedUserType to UserType component
          <UserType selectedUserType={selectedUserType} setSelectedUserType={setSelectedUserType} onBuyerOrSellerSubmit={onBuyerOrSellerSubmit}/>
        );
    }

    if (user && !loading && showSellerDetailsScreen) {
      return (
        <SellerDetailsQuestionaire onSellerDetailsSubmit={onSellerDetailsSubmit}/>
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