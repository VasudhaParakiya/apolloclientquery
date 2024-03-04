import { redirect } from "react-router";

export const logout=(e)=>{
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    redirect("/login");
  }