const express = require("express");
const router = express.Router();

const db = require("../data/db");



// courses
router.get("/user/:id/courses", async(req,res)=>{
  const id = req.params.id;
  try{
    const [courses, ] = await db.execute("SELECT * FROM courses WHERE userid=?",[id]);
    res.render("admin/courses/courses-index",{
      title: "Courses",
      courses: courses,
    })
  }catch(err){
    console.log(err)
  }
})

router.get("/admin/course/create", async (req,res)=>{
  try{
    const [users, ] = await db.execute("SELECT * FROM users");
    res.render("admin/courses/course-create",{
      title: "Course Create",
      users: users
    })
  }catch(err){
    console.log(err)
  }
})

router.post("/admin/course/create", async (req,res)=>{
  const name = req.body.courseName;
  const courseDesc = req.body.courseDesc;
  const users = req.body.users;
  
  try{
    await db.execute("INSERT INTO courses(name,description,userid) VALUES(?,?,?)",[name,courseDesc,users]);
    res.redirect("/")
  }catch(err){
    console.log(err)
  }
})

// users delete 
router.get("/admin/user/delete/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const [users, ] = await db.execute("SELECT * FROM users WHERE id=?",[id]);
        res.render("admin/users/user-delete", {
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

// users create
router.get("/admin/user/create", (req, res) => {
  res.render("admin/users/user-create", {
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
