
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import { GET_All_USER } from '../graphql/Query';

export default function Users() {

    // const tokan=JSON.parse(localStorage.getItem("tokan"));

    // const {loading,data,error}=useQuery(GET_All_USER);
    // console.log(data);
    const user=JSON.parse(localStorage.getItem("user"));
    const [userName,setUserName]=useState(user?.userName);
   
    // console.log(user);

  return (
    <>
        <h1 className='text-center'>User Details</h1>
        
        <table className='user-table mt-5'>
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
