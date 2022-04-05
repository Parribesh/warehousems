import React, { useState } from "react";
import axios from "../../api/Axios";
import "./AddItem.css";

const ITEMS_URL = "/items";

export default function AddItem() {
  const [itemId, setItemId] = useState();
  const [itemName, setItemName] = useState();
  const [itemDepartment, setItemDepartment] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemSize, setItemSize] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchItem = {
      id: itemId,
      name: itemName,
      department: itemDepartment,
      price: itemPrice,
      size: itemSize,
    };
    try {
      const response = await axios.post(ITEMS_URL, JSON.stringify(fetchItem), {
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(response.data);
      setItemId("");
      setItemDepartment("");
      setItemName("");
      setItemPrice("");
      setItemSize("");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="form-container ">
      <div className="form-item ">
        <form className="flex flex-wrap" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setItemId(e.target.value)}
            placeholder=" ID "
          ></input>
          <input
            type="text"
            onChange={(e) => setItemDepartment(e.target.value)}
            placeholder=" Department"
          ></input>
          <input
            type="text"
            onChange={(e) => setItemName(e.target.value)}
            placeholder=" Name"
          ></input>
          <input
            type="text"
            onChange={(e) => setItemPrice(e.target.value)}
            placeholder=" Price "
          ></input>
          <input
            type="text"
            onChange={(e) => setItemSize(e.target.value)}
            placeholder=" Size "
          ></input>
          <input type="Submit" name="Add" />
        </form>
      </div>
    </div>
  );
}
