import React, { useState } from "react";
import styled from "./getclassdata.module.css";
import { Link, Outlet } from "react-router-dom";
// import { useEffect } from "react";

export default function GetClassData() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  // const [classData, setClassData] = useState([]);

  // useEffect(() => {
  //   setClassData(JSON.parse(localStorage.getItem("classData")));
  // }, []);

  const classData = JSON.parse(localStorage.getItem("classData")) || [];

  // console.log(classData);

  const deleteClass = (id) => {
    const classData = JSON.parse(localStorage.getItem("classData")) || [];
    setIsOpen(true);

    if (isDelete) {
      console.log(isDelete);

      const updatedClass = classData.filter((classData) => classData.id !== id);
      localStorage.setItem("classData", JSON.stringify(updatedClass));
    }
  };

  return (
    <>
      <Outlet />
      <div className={styled.classData}>
        <div className="d-flex justify-content-end">
          <Link
            to="class"
            className="bg-primary px-3 py-1 text-light text-decoration-none rounded-3 fw-bold"
          >
            + Class
          </Link>
        </div>
        <div className="d-flex justify-content-center">
          {classData.length > 0 ? (
            <>
              <table className={styled.classTable}>
                <thead>
                  <tr>
                    <th>Standard</th>
                    <th>Division</th>
                    <th>Teacher Name</th>
                    <th>No. of Students</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.map((oneClassData, index) => {
                    return (
                      <tr key={index}>
                        <td>{oneClassData.std}</td>
                        <td>{oneClassData.division}</td>
                        <td>{oneClassData.classTeacher}</td>
                        <td>{oneClassData.students.length}</td>
                        <td>
                          <Link to={`readclass/${oneClassData.id}`}>
                            <i className="bi bi-eye "></i>
                          </Link>
                          <Link to={`class/${oneClassData.id}`}>
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <Link to={"#"}>
                            <i
                              className="bi bi-x-circle"
                              onClick={() => deleteClass(oneClassData.id)}
                            ></i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                  {isOpen && (
                    <div className={styled.modal}>
                      <div className={styled.modaldiv}>
                        <p className="fs-3 border-bottom py-3">
                          sure, are you wont to delete???
                        </p>
                        <div className="d-flex justify-content-end ">
                          <button
                            className="border-0 bg-primary px-3 py-1 text-light rounded-1"
                            onClick={(e) => {
                              e.preventDefault();

                              setIsDelete(true);
                              setIsOpen(false);
                            }}
                          >
                            yes
                          </button>
                          <button
                            className="border-0 bg-danger ms-2 px-2 py-1 text-light rounded-1"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsDelete(false);

                              setIsOpen(false);
                            }}
                          >
                            cancle
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p className="h2">No Data in Class. please add Data</p>
          )}
        </div>
      </div>
    </>
  );
}
