const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/admin/user/delete/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const [users, ] = await db.execute("SELECT * FROM users WHERE id=?",[id]);
        res.render("admin/user-delete", {
            title: "User Delete",
            users: users,
          });
    }catch(err){
        console.log(err)
    }
});

router.post("/admin/user/delete/:id", async (req, res) => {
    const id = req.params.id;
    try{
        await db.execute("DELETE FROM users WHERE id=?",[id]);
        res.redirect("/");
    }catch(err){
        console.log(err)
    }
});


router.get("/admin/user/create", (req, res) => {
  res.render("admin/user-create", {
    title: "User Create",
  });
});

router.post("/admin/user/create", async (req, res) => {
  const username = req.body.username;
  try {
    await db.execute("INSERT INTO users(name) VALUES(?)", [username]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
