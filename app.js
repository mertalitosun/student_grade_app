const express = require("express");
const app = express();

const path = require("path");

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("node_modules"));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(adminRoutes);
app.use(userRoutes);
app.listen(3000, () => {
  console.log("Listenin on port 3000");
});
