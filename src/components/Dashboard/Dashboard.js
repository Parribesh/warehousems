import React, { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import RenderContext from "../../context/RenderContextProvider";
import Sidebar from "../Sidebar/Sidebar";
import FindItem from "./FindItem.js";
import AddItem from "./AddItem.js";
import Register from "./SalesRegister";
import { ItemProvider } from "../../context/ItemsProvider";

export default function Dashboard() {
  const { setAuth } = useContext(AuthContext);
  const { state } = useContext(RenderContext);

  const renderSwitch = () => {
    switch (state.item) {
      case "find":
        return <FindItem />;

      case "add":
        return <AddItem />;

      // case "invoice":
      //   return <Invoice />;

      case "register":
        return <Register />;

      default:
        return <AddItem />;
    }
  };

  const handleLogOut = () => {
    setAuth({});
  };
  return (
    <ItemProvider>
      <div className="flex">
        <div className="sidebar flex flex-col h-screen w-[15em]">
          <Sidebar />
          <br />
          <button onClick={handleLogOut}>Logout</button>
        </div>
        <div className="item-container w-screen flex flex-col items-center">
          {renderSwitch()}
        </div>
      </div>
    </ItemProvider>
  );
}
