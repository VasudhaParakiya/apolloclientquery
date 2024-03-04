import React from "react";
import { useParams } from "react-router";
import Accordion from "react-bootstrap/Accordion";
import styled from "./readclass.modual.css";
import { useState } from "react";

export default function ReadClass() {
  const { id } = useParams();

  const classData = JSON.parse(localStorage.getItem("classData")) || [];
  const findData = classData.find((classData) => classData.id === id);
  console.log({ findData });

  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <>
      <div className="w-50 m-auto">
        <h2 className="text-center">Student Data</h2>
        <div>
          {findData &&
            findData.students.map((student, index) => (
              <div key={index} className=" cursor-pointer border">
                <div
                  className={
                    activeAccordion === index
                      ? "fs-3 px-4 bg-primary text-dark d-flex justify-content-between"
                      : "fs-3 px-4 text-dark d-flex justify-content-between"
                  }
                  //   className="d-flex justify-content-between"
                  onClick={() => toggleAccordion(index)}
                >
                  {/* {activeAccordion === index && (fs-3 bg-primary text-light */}
                  <h2 className="fs-3 ">{student.name}</h2>

                  <i className="bi bi-chevron-down"></i>
                </div>
                {activeAccordion === index && (
                  <div className=" px-4" style={{ backgroundColor: "#e7eef8" }}>
                    <p className="fw-bold fs-5">
                      Student_Name : <span>{student.name}</span>
                    </p>
                    <p className="fw-bold fs-5">
                      Roll_No. : <span>{student.rollNo}</span>
                    </p>
                    <p className="fw-bold fs-5 mb-0">
                      Gender :{" "}
                      <span className="text-md font-normal">
                        {student.gender}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
