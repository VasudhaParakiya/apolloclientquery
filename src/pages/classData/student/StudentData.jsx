import React from "react";
import styled from "./student.module.css";

const StudentData = ({
  classList,
  setClassList,
  // handleInputChange,
  addStudent,
  removeStudentData,
}) => {
  const handleAddStudent = (index, e) => {
    if (classList.students.length < 4) {
      const newStudent = { id: new Date(), name: "", rollNo: "", gender: "" };

      addStudent(newStudent);
    }
  };

  const handleInputChange = (index, e) => {
    const { name, value, type } = e.target;

    setClassList((prev) => {
      const updatedStudentList = [...prev.students];

      // If it's a radio button, update the 'gender' property
      if (type === "radio") {
        updatedStudentList[index] = {
          ...updatedStudentList[index],
          gender: value,
        };
      } else {
        // For other input types, update the property specified by the 'name'
        updatedStudentList[index] = {
          ...updatedStudentList[index],
          [name]: value,
          // [name]: type === "checkbox" ? checked : value,
        };
      }

      return { ...prev, students: updatedStudentList };
    });
  };

  return (
    <>
      <div>
        {classList.students.map((studentList, index) => {
          return (
            <div className={styled.studentForm} key={index}>
              {classList.students.length > 1 && (
                <div className="d-flex justify-content-end me-2">
                  <button
                    type="button"
                    className="bg-danger py-2 px-4 border-0 text-light h6"
                    onClick={() => removeStudentData(index)}
                  >
                    -
                  </button>
                </div>
              )}

              <div className={styled.classForm}>
                <label className={styled.studentLabel}>Student Name : </label>
                <input
                  className={`${styled.inputData} ${
                    studentList.err && studentList.err.name
                      ? "Invalid Name"
                      : ""
                  }`}
                  type="text"
                  name="name"
                  placeholder="Student Name"
                  value={studentList.name}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>

              <div className={styled.classForm}>
                <label className={styled.studentLabel}>Roll No : </label>
                <input
                  className={`${styled.numberData} ${
                    studentList.err && studentList.err.rollNo
                      ? "Invalid roll no"
                      : ""
                  }`}
                  type="number"
                  name="rollNo"
                  placeholder="Roll No"
                  maxLength={3}
                  value={studentList.rollNo}
                  onChange={(e) => handleInputChange(index, e)}
                />
                {/* {studentError.rollNo && studentList.rollNo === "" && (
                  <p>roll no not a 0</p>
                )} */}
              </div>

              <div className={styled.classForm}>
                <label className={styled.studentLabel}>Gender : </label>
                <input
                  type="radio"
                  name={`gender-${index}`}
                  value={studentList.gender}
                  checked={
                    // studentList.gender === "male"
                    studentList[index] && studentList[index].gender === "male"
                  }
                  onChange={(e) => handleInputChange(index, e)}
                />
                male
                <input
                  type="radio"
                  name={`gender-${index}`}
                  value={studentList.gender}
                  checked={
                    // studentList.gender === "female"
                    studentList[index] && studentList[index].gender === "female"
                  }
                  onChange={(e) => handleInputChange(index, e)}
                />
                female
                {/* {studentError.gender && studentList.gender === "" && (
                  <p>gender is require</p>
                )}*/}
                {studentList.errStr && (
                  <div className="feedback text-danger mb-3">
                    {studentList.errStr}
                  </div>
                )}
              </div>

              {classList.students.length - 1 === index && (
                <div className="text-center">
                  <button
                    className="bg-primary py-2 px-4 border-0 text-light h6"
                    onClick={(e) => handleAddStudent(index, e)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StudentData;
