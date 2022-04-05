import React, { useContext } from "react";
import RenderContext from "../../context/RenderContextProvider";

export default function Sidebar() {
  const { setState } = useContext(RenderContext);

  return (
    <div className="flex flex-col grow items-start bg-[#d1f0d9] p-2">
      <button>Dashboard</button>
      <button onClick={(e) => setState({ item: "find" })}>Search</button>
      <button onClick={(e) => setState({ item: "add" })}>Add</button>
      <button onClick={(e) => setState({ item: "invoice" })}>Invoice</button>
      <button onClick={(e) => setState({ item: "register" })}>
        Sales Register
      </button>
      <button onClick={(e) => setState({ item: "cart" })}>Cart</button>
    </div>
  );
}
