const KoaRouter = require("koa-router");
const {
  addStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} = require("../controller/student.controller");

const router = new KoaRouter({ prefix: "/student" });

router.post("/add", addStudent);
router.get("/", getStudents);
router.put("/:studentId", updateStudent);
router.delete("/:studentId", deleteStudent);

module.exports = router;
