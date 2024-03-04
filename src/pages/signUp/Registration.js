import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordStrengthBar from "react-password-strength-bar";
import { SIGN_UP } from "../../graphql/Mutation";
import styled from "./registration.module.css";

export default function Registration() {
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,12}$/;
  const contactRegex = /^[0-9]{10}$/;

  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    // gender:"",
    hobbyList: [{ hobby: "" }],
    profilePicture: "",
  });

  const [formError, setFormError] = useState({
    userName: false,
    fullName: false,
    email: false,
    password: false,
    mobile: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructuring into name and value variables

    let res;
    if (name === "mobile") {
      res = value.replace(/\D/g, "");
    }
    // Update form data
    setFormData({
      ...formData,
      [name]: value,
      mobile: res,
    });

    // password validation
    let hasNumber = /\d/.test(formData.password);
    let hasUpperCase = /[A-Z]/.test(formData.password);
    let hasLowerCase = /[a-z]/.test(formData.password);
    let hasSpecialCharacter = /[!@#\$%\^\&*\)\(+=._-]/.test(formData.password);

    let passError = [];

    if (!hasNumber) {
      passError = [...passError, "password at list one numbar"];
    }
    if (!hasLowerCase) {
      passError = [
        ...passError,
        "Password must contain at least one lowercase letter.",
      ];
    }
    if (!hasUpperCase) {
      passError = [
        ...passError,
        "Password must contain at least one uppercase letter.",
      ];
    }
    if (!hasSpecialCharacter) {
      passError = [
        ...passError,
        "Password must contain at least one special character (!@#$%^&*()_-=+.)",
      ];
    }

    if (name === "userName" && value.length < 6) {
      setFormError({ ...formError, userName: true });
    } else if (name === "fullName" && value.length < 8) {
      setFormError({ ...formError, fullName: true });
    } else if (name === "email" && !value.match(emailRegex)) {
      setFormError({ ...formError, email: true });
    } else if (name === "password" && value.length > 0 && value.length < 8) {
      setFormError({
        ...formError,
        password: passError.length > 0 ? passError.join(" ") : false,
      });
    } else if (name === "mobile" && !value.match(contactRegex)) {
      setFormError({ ...formError, mobile: true });
    } else {
      setFormError({ ...formError, [name]: false });
    }
  };

  const [registrationData, { data, loading, error }] = useMutation(SIGN_UP);

  // image convert to base64
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, profilePicture: reader.result.split(",")[1] });
      // setBase64String(reader.result.split(',')[1]); // Extracting base64 string from result
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // let isValid = true;
    const isValid = !Object.values(formError).some((error) => error);

    if (isValid) {
      registrationData({
        variables: {
          input: {
            userName: formData.userName,
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            mobile: formData.mobile,
            profilePicture: formData.profilePicture,
          },
        },
      })
        .then((res) => {
          console.log(res.data);
          navigate("/login");
          toast.success("successfully signed up");
        })
        .catch((error) => toast.error(error.message));
    }
  };

  const addHobby = (e) => {
    console.log("first", formData.hobbyList);
    if (formData.hobbyList.length < 4) {
      setFormData({
        ...formData,
        hobbyList: [...formData.hobbyList, { hobby: "" }],
      });
    }
    console.log(formData.hobbyList);
  };

  const removeHobby = (index) => {
    // const hobbyList=[...formData.hobbyList];
    // hobbyList.splice(index,1); //particular on index howmany ele is remove
    // setFormData({
    //   ...formData,
    //   hobbyList:[hobbyList],
    // });
    const updatedHobbies = formData.hobbyList.filter(
      (_, hobbyIndex) => hobbyIndex !== index
    );
    setFormData({
      ...formData,
      hobbyList: updatedHobbies,
    });
  };

  const handleHobbyInput = (e, index) => {
    const { name, value } = e.target;

    // const hobbyList=[...formData.hobbyList];
    // hobbyList[index][name]=value;
    // setFormData({
    //   ...formData,
    //   hobbyList: hobbyList,
    // });

    const updatedHobbies = formData.hobbyList.map((hobby, hobbyIndex) => {
      if (index === hobbyIndex) {
        return { ...hobby, [name]: value };
      }
      return hobby;
    });
    setFormData({
      ...formData,
      hobbyList: updatedHobbies,
    });
  };

  return (
    <div className={styled.signup}>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit} className="">
        <div>
          {/* <label>UserName:</label> */}
          <input
            type="text"
            name="userName"
            placeholder="userName"
            // value={formData.userName}
            onChange={handleChange}
          />

          {formError.userName ? (
            <p className="mb-0" style={{ color: "red" }}>
              User Name must be 6 character
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          {/* <label>FullName:</label> */}
          <input
            type="text"
            name="fullName"
            placeholder="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {formError.fullName ? (
            <p className="mb-0" style={{ color: "red" }}>
              fullName Name must be 8 character
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          {/* <label>Email:</label> */}
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formError.email ? (
            <p className="mb-0" style={{ color: "red" }}>
              Invalid Email
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          {/* <label>Password:</label> */}
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />
          <PasswordStrengthBar
            password={formData.password}
            className={styled.passBar}
          />
          {formError.password ? (
            <p className="mb-0" style={{ color: "red" }}>
              {formError.password}
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          {/* <label>Gender:</label> */}
          {/* <input
            type="radio"
            name="gender"
            value="male"
            onChange={(e) => setGender(e.target.value)}
          />
          male
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={(e) => setGender(e.target.value)}
          />
          female */}
        </div>
        <div>
          {/* <label>Mobile No.</label> */}
          <input
            type="text"
            name="mobile"
            placeholder="mobile"
            // minLength={10}
            maxLength={10}
            value={formData.mobile}
            onChange={handleChange}
          />
          {formError.mobile ? (
            <p className="mb-0" style={{ color: "red" }}>
              Invalid contact Number
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          {/* <label>profilePicture</label> */}
          <input
            type="file"
            name="profilePicture"
            className="ms-5"
            value=""
            accept="image/*"
            onChange={handleFileInputChange}
            // onChange={(e) =>
            //   setProfilePicture(URL.createObjectURL(e.target.files[0]))
          />
        </div>
        <div>
          <label className="">Hobby :</label>
          <br></br>
          {formData.hobbyList.map((singleHobby, index) => (
            <div key={index} className="d-flex mb-2">
              <div className={styled.hobbyInput}>
                <input
                  type="text"
                  name="hobby"
                  id="hobby"
                  value={singleHobby.hobby}
                  onChange={(e) => handleHobbyInput(e, index)}
                  className={styled.hobbyInput}
                />
                {
                  // formData.hobby.length - 1 give a last index of hobby array of object
                  formData.hobbyList.length - 1 === index &&
                    formData.hobbyList.length < 4 && (
                      <button
                        type="button"
                        className="ms-2 btn-primary py-1 px-2 border-0 rounded-1"
                        onClick={addHobby}
                      >
                        +
                      </button>
                    )
                }
              </div>
              <div className="mb-1">
                {formData.hobbyList.length > 1 && (
                  <button
                    type="button"
                    className="ms-2 btn-primary py-1 px-2 border-0 rounded-1"
                    onClick={() => removeHobby(index)}
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* {showHobbyInput && (
            <div className="hobby">
              <br></br>
              <input
                type="text"
                name="hobby"
                value=""
                className="my-1 hobby-input"
              />
              <br></br>
              <button className="me-2">+</button>
              <button>-</button>
            </div>
          )} */}
        </div>
        <div className="text-center">
          <button className="text-decoration-none py-1 px-3 bg-primary text-light fw-bold rounded-3 ms-3 border-0">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
