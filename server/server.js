const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const PORT = 3500;
app.use(cors(corsOptions));

//middleware handler to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));

//json handler
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));

// app.use("/", (req, res) => res.send("hello"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/items", require("./routes/items"));

// app.all("*", (req, res) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts("json")) {
//     res.json({ error: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 Not Found");
//   }
// });

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
