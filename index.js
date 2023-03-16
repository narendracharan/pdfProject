const express = require("express");
const path = require("path");
const app = express();
const homeRoutes = require("./routes/homeRoutes");
app.set("view engine", "ejs");
app.use("/docs", express.static(path.join(__dirname, "docs")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRoutes);

app.listen(5000, () => {
  console.log("Server is  running port no :5000");
});
