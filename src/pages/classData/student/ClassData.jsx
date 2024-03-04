import React, { useState } from "react";
import styled from "./student.module.css";
// import styled from "";
import StudentData from "./StudentData";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const DataClass = () => {
  const { id } = useParams();

  // const [isEdit, setIsEdit] = useState(false);

  const [classList, setClassList] = useState({
    id: "",
    std: "",
    division: "A",
    classTeacher: "",
    students: [],
  });

  useEffect(() => {
    if (id) {
      const classData = JSON.parse(localStorage.getItem("classData")) || [];
      if (classData) {
        const findData = classData.find((classData) => classData.id === id);
        if (findData) {
          setClassList(findData);
          // setIsEdit(true);
          setShowStudent(true);
        }
      }
    }
  }, [id]);

  const [error, setError] = useState({
    std: false,
    classTeacher: false,
  });

  const navigate = useNavigate();
  const [showStudent, setShowStudent] = useState(false);

  const handleChange = (e) => {
    const generateRandomString = () => {
      return [...Array(10)].map(() => Math.random().toString(36)[2]).join("");
    };
    const randomString = generateRandomString();

    const { name, value } = e.target;
    // const newId = classList.length + 1;
    setClassList({
      ...classList,
      id: randomString,
      [name]: value,
    });

    if (name === "std" && value !== "") {
      setError({ ...error, std: false });
    }

    if (name === "classTeacher" && value !== "") {
      setError({ ...error, classTeacher: false });
    }
  };

  const handleStudentsData = (e) => {
    e.preventDefault();

    if (classList.std === "") setError({ ...error, std: true });

    if (classList.classTeacher === "") {
      setError({ ...error, classTeacher: true });
    }
    if (classList.std !== "" && classList.classTeacher !== "") {
      const newStudent = {
        id: new Date(),
        name: "",
        rollNo: "",
        gender: "",
        errStr: "",
        err: { name: "", rollno: "", gender: "" },
      };

      const updatedStudents = [...classList.students, newStudent];
      setClassList({ ...classList, students: updatedStudents });
      setShowStudent(true);
    }

    // console.log(error.classTeacher);
  };

  // add student
  const addStudent = (newStudentData) => {
    setClassList((prevClassList) => ({
      ...prevClassList,
      students: [...prevClassList.students, newStudentData],
    }));

    // console.log(classList.students);
  };

  // remove student
  const removeStudentData = (index) => {
    const updatedStudents = classList.students.filter(
      (student, i) => i !== index
    );
    setClassList({ ...classList, students: updatedStudents });
    // console.log(classList.students);
  };

  const handleSubmited = (e) => {
    e.preventDefault();

    const rollNumbers = new Set();
    const updatedStList = classList.students.map((student) => {
      let updatedStudent = { ...student };
      updatedStudent.err = {};

      if (!student.name) {
        updatedStudent.err.name = "Please enter a name";
      }

      if (!student.rollNo) {
        updatedStudent.err.rollNo = "Please enter a roll number";
      } else if (rollNumbers.has(student.rollNo)) {
        console.log("roll error");
        updatedStudent.err.rollNo = "Please enter a unique roll number";
      } else {
        updatedStudent.err.rollNo = "";
      }

      rollNumbers.add(student.rollNo);

      // if (!(student.gender === "male" || student.gender === "female")) {
      //   updatedStudent.err.gender = "Please select a valid gender";
      // }

      updatedStudent.errStr = Object.values(updatedStudent.err)
        .filter((errMsg) => errMsg !== "")
        .join(", ");

      return updatedStudent;
    });
    if (
      updatedStList.some((student) =>
        Object.values(student.err).some((errMsg) => errMsg !== "")
      )
    ) {
      // setStudentList(updatedStList);
      setClassList((prevClassList) => ({
        ...prevClassList,
        students: updatedStList,
      }));
      return;
    }

    if (id) {
      const classData = JSON.parse(localStorage.getItem("classData")) || [];
      const findDataIndex = classData.findIndex((data) => data.id === id);
      const updatedClassData = { ...classList };
      classData[findDataIndex] = updatedClassData;
      localStorage.setItem("classData", JSON.stringify(classData));
      // const updatedClassData = classData.map((data) =>
      //   data.id === id ? { ...data, ...classList } : data
      // );
      // localStorage.setItem("classData", JSON.stringify(updatedClassData));
      toast.success("Edit Successfully");
      navigate("/getclassdata");
    } else {
      const localData = JSON.parse(localStorage.getItem("classData")) || [];
      const updateData = [...localData, classList];
      localStorage.setItem("classData", JSON.stringify(updateData));
      toast.success("Student add Successfully");
      navigate("/getclassdata");
    }
  };

  return (
    <div>
      <form className={styled.form} onSubmit={handleSubmited}>
        <div className={styled.classForm}>
          <label className={styled.labelData}>Name :</label>
          <input
            type="text"
            name="std"
            placeholder="Name"
            className={styled.inputData}
            value={classList.std}
            onChange={handleChange}
          />
          {error.std ? (
            <p className="mb-0  text-center" style={{ color: "red" }}>
              Standard is required
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={styled.classForm}>
          <label className={styled.labelData}>Division :</label>
          <select
            name="division"
            className={styled.inputData}
            onChange={handleChange}
          >
            <option value={"A"}>A</option>
            <option value={"B"}>B</option>
            <option value={"C"}>C</option>
          </select>
        </div>
        <div className={styled.classForm}>
          <label className={styled.labelData}>Teacher Name :</label>
          <input
            type="text"
            name="classTeacher"
            placeholder="Name"
            className={styled.inputData}
            value={classList.classTeacher}
            onChange={handleChange}
          />
          {error.classTeacher ? (
            <p className="mb-0  text-center" style={{ color: "red" }}>
              Class Teacher is required
            </p>
          ) : (
            ""
          )}
        </div>
        {!showStudent && (
          <div className="text-center mt-3">
            <button
              className="bg-primary py-2 px-4 border-0 text-light h6"
              onClick={handleStudentsData}
            >
              Add Student
            </button>
          </div>
        )}

        {showStudent && (
          <>
            <StudentData
              classList={classList}
              setClassList={setClassList}
              addStudent={addStudent}
              removeStudentData={removeStudentData}
            />
            <div className="text-center mt-3">
              <button className="bg-primary py-2 px-4 border-0 text-light h6 me-2">
                {id ? "Edit" : "submit"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default DataClass;
