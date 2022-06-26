import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentPage = () => {
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [age, setAge] = useState("");
  const [courseId, setCourseId] = useState("");
  const [editId, setEditId] = useState("");

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [isEditClick, setIsEditClick] = useState(false);
  const [editName, setEditName] = useState("");
  const [editNic, setEditNic] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editCourseId, setEditCourseId] = useState("");

  useEffect(() => {
    axios.get(`${process.env.BASE_URL}/course/`).then((res) => {
      setCourses(res.data);
    });
    axios.get(`${process.env.BASE_URL}/student/`).then((res) => {
      setStudents(res.data);
    });
  }, []);

  const addStudent = (e) => {
    e.preventDefault();
    const studentObj = {
      name,
      nic,
      age,
      courseId,
    };

    axios
      .post(`${process.env.BASE_URL}/student/add`, studentObj)
      .then((res) => {
        alert("Student Added Successfully");
        axios.get(`${process.env.BASE_URL}/student/`).then((res) => {
          setStudents(res.data);
        });
        setName("");
        setNic("");
        setAge("");
        setCourseId("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const updateStudent = (e) => {
    e.preventDefault();
    const studentObj = {
      name: editName,
      nic: editNic,
      age: editAge,
      courseId: editCourseId,
    };

    axios
      .put(`${process.env.BASE_URL}/student/${editId}`, studentObj)
      .then((res) => {
        alert("Student Updated Successfully");
        axios.get(`${process.env.BASE_URL}/student/`).then((res) => {
          setStudents(res.data);
        });
        setIsEditClick(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteStudent = (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.BASE_URL}/student/${e.target.id}`)
      .then((res) => {
        axios.get(`${process.env.BASE_URL}/student/`).then((res) => {
          setStudents(res.data);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const onEditClick = (e) => {
    e.preventDefault();
    setEditId(e.target.id);

    const student = students.find((student) => student._id === e.target.id);

    setEditName(student.name);
    setEditNic(student.nic);
    setEditAge(student.age);
    setEditCourseId(student.courseId);
    setIsEditClick(!isEditClick);
  };

  return (
    <div>
      <h1>Student Page</h1>
      <div style={{ marginBottom: 5 }}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          style={{ margin: 5 }}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Nic"
          value={nic}
          style={{ margin: 5 }}
          onChange={(e) => setNic(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          style={{ margin: 5 }}
          onChange={(e) => setAge(e.target.value)}
        />
        <select onChange={(e) => setCourseId(e.target.value)}>
          {courses &&
            courses.length > 0 &&
            courses.map((course, index) => (
              <option value={course._id} key={index}>
                {course.courseName}
              </option>
            ))}
        </select>
        <button onClick={(e) => addStudent(e)} style={{ margin: 5 }}>
          Add Student
        </button>
      </div>

      <table>
        <tr>
          <th>Name</th>
          <th>Nic</th>
          <th>Age</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
        {students &&
          students.length > 0 &&
          students.map((student, index) => (
            <tr key={index}>
              <td>
                {isEditClick && student._id === editId ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {isEditClick && student._id === editId ? (
                  <input
                    type="text"
                    value={editNic}
                    onChange={(e) => setEditNic(e.target.value)}
                  />
                ) : (
                  student.nic
                )}
              </td>
              <td>
                {isEditClick && student._id === editId ? (
                  <input
                    type="number"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                  />
                ) : (
                  student.age
                )}
              </td>
              <td>
              {isEditClick && student._id === editId ? (
                  <select onChange={(e) => setEditCourseId(e.target.value)}>
                    {courses &&
                      courses.length > 0 &&
                      courses.map((course, index) => (
                        <option value={course._id} key={index}>
                          {course.courseName}
                        </option>
                      ))}
                  </select>
                ) : (
                  student.courseId.courseName
                )}
              </td>
              <td>
                <button id={student._id} onClick={(e) => onEditClick(e)}>
                  {isEditClick && student._id === editId ? "Cancel" : "Update"}
                </button>
                {isEditClick && student._id === editId && (
                  <button onClick={(e) => updateStudent(e)}>Save</button>
                )}
                <button id={student._id} onClick={(e) => deleteStudent(e)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default StudentPage;
