import React, { useEffect, useState } from "react";
import styled from "./viewSignupform.module.css";
import { Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function ViewSignupForm() {
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("useForm")) || []);
  }, []);

  const deleteHandler = (id) => {
    // console.log(id);
    const data = JSON.parse(localStorage.getItem("useForm")) || [];
    const newData = data.filter((item) => item.id !== id);
    setLocalData(newData);
    localStorage.setItem("useForm", JSON.stringify(newData));
    toast.success("remove successfully");
  };

  return (
    <>
      {/* <Outlet /> */}
      <div className={styled.viewForm}>
        <div className="d-flex justify-content-end mb-2">
          <Link
            to="signupform"
            className="bg-primary px-3 py-1 text-light text-decoration-none rounded-3 fw-bold"
          >
            + Form
          </Link>
        </div>
        {localData?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>Hobby</th>
                <th>Profile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {localData?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data?.firstName}</td>
                    <td>{data?.lastName}</td>
                    <td>{data?.email}</td>
                    <td>{data?.city}</td>
                    <td>{data?.mobile}</td>
                    <td>{data?.gender}</td>
                    <td>
                      {data?.hobby}
                      {/* {Array.isArray(data?.hobby)
                        ? data?.hobby.join(",")
                        : data?.hobby} */}
                    </td>

                    <td>
                      {data?.file && (
                        <img
                          src={data?.file?.base64URL}
                          alt="Profile"
                          style={{ maxWidth: "50px", maxHeight: "50px" }}
                        />
                      )}
                    </td>
                    <td>
                      <Link
                        to={`signupform/${data?.id}`}
                        className="text-decoration-none me-2"
                      >
                        Edit
                      </Link>
                      <Link
                        className="text-decoration-none me-2"
                        onClick={() => deleteHandler(data?.id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Data not found</p>
        )}
      </div>
    </>
  );
}
