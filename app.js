const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.listen(3000,()=>{
    console.log("Listenin on port 3000")
})