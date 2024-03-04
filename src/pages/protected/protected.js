import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Protected(props) {
  let Component = props.component;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token && !user) {
        navigate("/login");
    }
  }, [navigate]);

  

  return (
    <>
      <Component />
    </>
  );
}
