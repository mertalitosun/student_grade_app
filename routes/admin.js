const express = require("express");
const router = express.Router();

const db = require("../data/db");

//grade create
router.get("/admin/grade/create", async (req, res) => {
  try {
    const [courses] = await db.execute("SELECT * FROM courses");
    const [noteCategories] = await db.execute("SELECT * FROM noteCategories");
    res.render("admin/grades/grade-create", {
      title: "Grade Create",
      courses: courses,
      noteCategories: noteCategories,
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/admin/grade/create", async(req,res)=>{
  const courseName = req.body.courseName;
  const gradeCategoryName = req.body.gradeCategoryName;
  const grade = req.body.grade;
  
  try{
    await db.execute("INSERT INTO notes(courseid,categoryid,note) VALUES (?,?,?)",[courseName,gradeCategoryName,grade]);
    res.redirect("/")
  }catch(err){
    console.log(err)
  }
})

// grade category create
router.get("/admin/grade/category/create", (req, res) => {
  res.render("admin/grades/gradeCategory-create", {
    title: "Grade Category Create",
  });
});
router.post("/admin/grade/category/create", async (req, res) => {
  const name = req.body.categoryName;
  try {
    await db.execute("INSERT INTO noteCategories(name) VALUES(?)", [name]),
      res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

// all courses
router.get("/user/:id/courses", async (req, res) => {
  const id = req.params.id;
  try {
    const [courses] = await db.execute("SELECT * FROM courses WHERE userid=?", [
      id,
    ]);
    res.render("admin/courses/course-index", {
      title: "Courses",
      courses: courses,
    });
  } catch (err) {
    console.log(err);
  }
});

// course details
router.get("/courses/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [courses] = await db.execute("SELECT * FROM courses WHERE id=?", [
      id,
    ]);
    const [notes] = await db.execute("SELECT * FROM notes");
    const [noteCategories] = await db.execute("SELECT * FROM noteCategories");
    res.render("admin/courses/course-details", {
      title: "Course Details",
      courses: courses,
      notes: notes,
      noteCategories: noteCategories,
    });
  } catch (err) {
    console.log(err);
  }
});

// course  delete
router.get("/admin/course/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [courses] = await db.execute("SELECT * from courses WHERE id=?", [
      id,
    ]);
    res.render("admin/courses/course-delete", {
      title: "Courses Delete",
      courses: courses,
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/admin/course/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.execute("DELETE FROM courses WHERE id=?", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

// courses create
router.get("/admin/course/create", async (req, res) => {
  try {
    const [users] = await db.execute("SELECT * FROM users");
    res.render("admin/courses/course-create", {
      title: "Course Create",
      users: users,
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/admin/course/create", async (req, res) => {
  const name = req.body.courseName;
  const courseDesc = req.body.courseDesc;
  const users = req.body.users;

  try {
    await db.execute(
      "INSERT INTO courses(name,description,userid) VALUES(?,?,?)",
      [name, courseDesc, users]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

// users delete
router.get("/admin/user/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [users] = await db.execute("SELECT * FROM users WHERE id=?", [id]);
    res.render("admin/users/user-delete", {
      title: "User Delete",
      users: users,
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/admin/user/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.execute("DELETE FROM users WHERE id=?", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
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
