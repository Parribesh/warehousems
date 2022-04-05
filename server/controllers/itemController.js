const itemsDB = {
  items: require("../model/items.json"),
  setItems: function (data) {
    this.items = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleNewItem = async (req, res) => {
  const { id, department, name, price, size } = req.body;
  if (!id || !department || !name || !price || !size)
    return res.status(400).json({ message: "Required input not provided" });

  const duplicate = itemsDB.items.find((item) => item.id === id);
  if (duplicate) {
    return res.sendStatus(409);
  } //conflict;
  try {
    const newItem = { id, department, name, price, size };
    itemsDB.setItems([...itemsDB.items, newItem]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "items.json"),
      JSON.stringify(itemsDB.items)
    );
    console.log(itemsDB.items);
    res.status(201).json({ message: `new item ${name} added ` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleGetItem = async (req, res) => {
  const { name } = req.body;
  const item = itemsDB.items.filter(
    (el) => el.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
  );

  if (item) {
    res.status(201).send(item);
  } else {
    res.sendStatus(500);
  }
};

module.exports = { handleNewItem, handleGetItem };
