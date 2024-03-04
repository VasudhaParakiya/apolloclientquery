import React from "react";
import { Route, Routes } from "react-router";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Protected from "./pages/protected/protected";
import Registration from "./pages/signUp/Registration";
import Error from "./pages/error/Error";
import GetClassData from "./pages/classData/class/GetClassData";
import ClassData from "./pages/classData/student/ClassData";
import ReadClass from "./pages/classData/class/ReadClass";
import SignupFrom from "./pages/useformhook/SignupFrom";
// import DynamiccalyField from "./pages/useformhook/DynamiccalyField";
import ViewSignupForm from "./pages/useformhook/viewSignupForm";

// import StudentClass from "./pages/classData/student/StudentClass";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Protected component={Home} />} />

        <Route path="/getclassdata">
          <Route index element={<Protected component={GetClassData} />} />
          <Route path="class" element={<ClassData />} />
          <Route path="class/:id" element={<ClassData />} />
          <Route path="readclass/:id" element={<ReadClass />} />
        </Route>

        <Route path="/viewForm">
          <Route index element={<Protected component={ViewSignupForm} />} />
          <Route path="signupform" element={<SignupFrom />} />
          <Route path="signupform/:id" element={<SignupFrom />} />
        </Route>

        {/* <Route path="/readclass/:id" element={<ReadClass />}></Route> */}
        {/* <Route path="/class" element={<ClassData />}></Route> */}
        {/* <Route path="/class/:id" element={<ClassData />}></Route> */}
        {/* <Route path="/viewForm" element={<ViewSignupForm />} />
        <Route path="/signupform" element={<SignupFrom />} />
        <Route path="/signupform/:id" element={<SignupFrom />} /> */}

        {/* <Route path="/dynamicField" element={<DynamiccalyField />} /> */}
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
