
import React from 'react';
import { Link } from 'react-router-dom';
import styled from "./home.module.css";


export default function Home() {

    // const tokan=JSON.parse(localStorage.getItem("tokan"));

    const user=JSON.parse(localStorage.getItem("user"));
    // console.log(user);

  return (
    <>
        <h1 className='text-center'>User Details</h1>
        
        <table className={styled.userTable}>
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>{user?.userName}</td>
                    <td>{user?.fullName}</td>
                    <td>{user?.email}</td>
                    <td>{user?.mobile}</td>
                    <td>
                        <Link to={"#"}><i className="bi bi-pencil"></i></Link>
                        <Link to={"#"}><i className="bi bi-x-circle"></i></Link>
                    </td>
                </tr>
            </thead>
        </table>
    </>
  )
}
