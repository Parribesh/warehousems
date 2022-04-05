import React, { useContext, useEffect, useState } from "react";
import ItemContext from "../../context/ItemsProvider";
import FindItem from "./FindItem";

function SalesRegister() {
  const { item } = useContext(ItemContext);
  const [currentItem, setCurrentItem] = useState(item);
  const [currentPrice, setCurrentPrice] = useState();
  const [currentQuantity, setCurrentQuantity] = useState();
  const [currentTotal, setCurrentTotal] = useState();
  useEffect(() => {
    console.log(item);
    if (item) {
      setCurrentItem(item[-1]);
      setCurrentPrice(item[-1].price);
      setCurrentQuantity(1);
      setCurrentTotal(currentPrice * currentQuantity);
    }
  }, [item, currentPrice, currentQuantity]);

  return (
    <>
      <div className="flex ">
        <input placeholder="Location"></input>
        <input placeholder="Date"></input>
      </div>
      <div className="flex w-[100%]">
        <FindItem />
        <form className="flex">
          <input
            type="number"
            placeholder="Quantity"
            value={currentQuantity}
            onChange={(e) => setCurrentQuantity(e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setCurrentPrice(e.target.value)}
            value={currentPrice}
          ></input>
          <input
            type="number"
            placeholder="Total"
            onChange={(e) => setCurrentTotal(e.target.value)}
            value={currentTotal}
          ></input>
        </form>
      </div>
      <div className="flex w-[100%]">
        <table className="w-[100%]">
          <thead>
            <tr>
              <th>Department</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {item.map((i, key) => (
              <tr key={key}>
                <td>{i.department}</td>
                <td>{i.name}</td>
                <td>{1}</td>
                <td>{i.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SalesRegister;
