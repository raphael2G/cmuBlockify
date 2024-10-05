"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { UserAuth } from "./AuthContext";
import UserType from "@/components/user-type-selection";
import SellerDetailsQuestionaire from "@/components/seller-details-questionaire";
import { MarketplaceApp } from "@/components/marketplace-app";
import { searchUserByUid, createUser } from "@/services/userService";
import { querySellerDetailsByUid } from "@/queries/sellerDetailsQueries";

import { useRouter } from 'next/navigation';

interface MarketInfoContext {

}

const MarketInfoContext = createContext<MarketInfoContext>({
});

export const MarketContextProvider = ({ children }: any) => {
    const {user, loading} = UserAuth();
    const [awaitingIsSeller, setAwaitingIsSeller] = useState(true);
    const [showBuyerOrSellerScreen, setShowBuyerOrSellerScreen] = useState(false);
    const [showSellerDetailsScreen, setShowSellerDetailsScreen] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState({ buyer: false, seller: false })

    const router = useRouter();


    useEffect(() => {
        if (user){
          searchUserByUid(user.uid).then((userQuery) => {
            console.log("= = = = = = = = ");
            console.log(userQuery);
            console.log("= = = = = = = = ");

            if (userQuery) {
              setShowBuyerOrSellerScreen(false);
              setShowSellerDetailsScreen(false);
              querySellerDetailsByUid(user.uid).then((sellerDetailsQuery) => {
                if (sellerDetailsQuery) {
                  setSelectedUserType({ buyer: true, seller: true });
                } else {
                  setSelectedUserType({ buyer: true, seller: false });
                }
              });


            } else {
              setShowBuyerOrSellerScreen(true);
            }
            setAwaitingIsSeller(false);
          });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);




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
      } else {
        // don't create if is a seller. we need to ask them questions first
        // create a user using the createUserService
        const userToAdd = {
          uid: user.uid,
          andrewId: user.email.split('@')[0],
          email: user.email
        }

        createUser(userToAdd).then((response) => {
          console.log(response);
          console.log("buyer created");
        });
      }
    };

    const onSellerDetailsSubmit = () => {
      setShowSellerDetailsScreen(false);
      setShowBuyerOrSellerScreen(false);

      // create a user using the createUserService
      const userToAdd = {
        uid: user.uid,
        andrewId: user.email.split('@')[0],
        email: user.email
      }

      createUser(userToAdd).then((response) => {
        console.log(response);});
    }


    const sampleUsersQueryEmpty = []


    useEffect(() => {
      console.log(selectedUserType);
    }, [selectedUserType])


    if (loading || awaitingIsSeller) {
        console.log("loading");
        return <div>Loading...</div>;
    }

    if (!user) {
      console.log("not user");

        return <div>Not logged in</div>;
    }

    if (user && !loading && !showBuyerOrSellerScreen && !showSellerDetailsScreen) {

      // router.push("/thanks");
      console.log("go to thankyou");
      console.log("showMarketplaceApp");

        return (
          <MarketplaceApp isSeller={selectedUserType.seller}/>
        );
    }

    if (user && !loading && showBuyerOrSellerScreen) {
      console.log("showBuyerOrSellerScreen");

        return (
          // pass selectedUserType and setSelectedUserType to UserType component
          <UserType selectedUserType={selectedUserType} setSelectedUserType={setSelectedUserType} onBuyerOrSellerSubmit={onBuyerOrSellerSubmit}/>
        );
    }

    if (user && !loading && showSellerDetailsScreen) {
      console.log("showSellerDetailsScreen");

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