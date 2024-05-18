const express = require("express");

const router = express.Router();

const db = require("../data/db");

router.get("/",  async (req,res)=>{

    try{
        const [users, ] = await db.execute("SELECT * FROM users");
        res.render("index",{
            title: "Anasayfa",
            users: users,
        })
    }catch(err){
        console.log(err)
    }
    
})

module.exports = router;