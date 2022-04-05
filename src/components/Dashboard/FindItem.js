import React, { useEffect, useState, useContext } from "react";
import axios from "../../api/Axios";
import ItemContext from "../../context/ItemsProvider";
import "./FindItem.css";

const GETITEM_URL = "/items/get";
export default function FindItem() {
  const { item, setItem } = useContext(ItemContext);
  const [name, setName] = useState();
  const [myOptions, setMyOptions] = useState([]);
  var hasOption = false;

  useEffect(() => {
    // document.getElementById("search-container").innerHTML = " ";
    async function fetchData() {
      setMyOptions([]);
      try {
        if (name) {
          const response = await axios.post(
            GETITEM_URL,
            JSON.stringify({ name }),
            {
              headers: { "Content-type": "application/json" },
            }
          );
          setMyOptions(response.data.map((item) => item));
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (name) {
      fetchData();
    }
  }, [name]);

  return (
    <div className="container">
      <div className="product-form ">
        <input
          className=" w-[100%]"
          type="text"
          placeholder="Search Item "
          onChange={(e) => setName(e.target.value)}
        ></input>
        <div
          id="option-container"
          className={`option-container w-[100%] ${hasOption ? "on" : "off"}`}
        >
          <ul id="search-container" className="option">
            {myOptions.map((i, key) => {
              return (
                <li>
                  <button onClick={(e) => setItem([...item, i])}>
                    {i.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
