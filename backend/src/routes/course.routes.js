const KoaRouter = require("koa-router");
const router = new KoaRouter({ prefix: "/course" });

const {
  addCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} = require("../controller/course.controller");

router.post("/add", addCourse);
router.get("/", getCourses);
router.put("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);

module.exports = router;
