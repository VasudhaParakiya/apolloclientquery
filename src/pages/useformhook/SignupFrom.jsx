import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordStrengthBar from "react-password-strength-bar";

import Input from "./allField/Input";
import Button from "./allField/Button";
import { useRef } from "react";
import Select from "./allField/Select";
import RadioButton from "./allField/RadioButton";
import CheckboxField from "./allField/CheckField";
import { useNavigate, useParams } from "react-router";
import FileField from "./allField/FileField";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getValue } from "@testing-library/user-event/dist/utils";

export default function SignupFrom() {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: id
      ? async () => {
          return JSON.parse(localStorage.getItem("useForm")).find(
            (item) => item.id === Number(id)
          );
        }
      : {
          firstName: "",
          lastName: "",
          city: "",
          mobile: "",
          gender: false,
          hobby: [false, false, false],
          file: null,
        },
  });

  const navigate = useNavigate();

  const password = useRef({});
  password.current = watch("password", "");

  const optionCity = ["", "Rajkot", "Surat", "Vadodara", "Ahemdabad"];
  const radioGender = ["Male", "Female"];
  const checkboxHobby = ["Study", "Dancing", "Singing"];

  const formSubmit = (data) => {
    const localData = JSON.parse(localStorage.getItem("useForm")) || [];
    // console.log(localData);

    if (id) {
      const findIndexItem = localData.findIndex(
        (item) => item.id === Number(id)
      );

      localData[findIndexItem] = data;
      console.log(localData);
      localStorage.setItem("useForm", JSON.stringify(localData));
      toast.success("form edit successfully...");
      reset();
      navigate("/viewForm");
    } else {
      const id = localData.length + 1;
      // console.log(id);
      data.id = id;

      if (localData) {
        const newData = [...localData, data];
        // console.log(newData);
        localStorage.setItem("useForm", JSON.stringify(newData));
        toast.success("form submited successfully...");
        navigate("/viewForm");
        reset();
      }
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      getBase64(file)
        .then((result) => {
          setValue("file", {
            base64URL: result,
            file,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onError = (error) => console.log(error);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <form onSubmit={handleSubmit(formSubmit, onError)} className="w-25">
        <Input
          id="firstName"
          name="firstName"
          type="text"
          label="First Name"
          placeholder="FirstName..."
          register={{
            ...register("firstName", {
              required: "First Name is required",
              minLength: { value: 4, message: "minimum 4 character" },
            }),
          }}
          errorMessage={errors?.firstName?.message}
        />
        <Input
          id="lastName"
          name="lastName"
          type="text"
          label="Last Name"
          placeholder="LastName..."
          register={{
            ...register("lastName", {
              required: "Last Name is required",
              minLength: { value: 4, message: "minimum 4 character" },
            }),
          }}
          errorMessage={errors?.lastName?.message}
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Email..."
          register={{
            ...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid Email",
              },
            }),
          }}
          errorMessage={errors?.email?.message}
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Password..."
          register={{
            ...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number",
              },
            }),
          }}
          errorMessage={errors?.password?.message}
        />
        <PasswordStrengthBar password={password.current} />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="confirmPassword..."
          register={{
            ...register("confirmPassword", {
              validate: (value) =>
                value === password.current || "The passwords do not match",
            }),
          }}
          errorMessage={errors?.confirmPassword?.message}
        />

        <Input
          id="mobile"
          name="mobile"
          type="number"
          label="Mobile"
          placeholder="Mobile..."
          register={{
            ...register("mobile", {
              required: "Mobile is required",

              pattern: {
                value: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
                message: "Invalid Mobile number",
              },
              maxLength: {
                value: 10,
                message: "maximum 10 number",
              },
            }),
          }}
          errorMessage={errors?.mobile?.message}
        />

        <Select
          label="City"
          id="city"
          name="city"
          options={optionCity}
          register={{ ...register("city", { required: "city is required" }) }}
          errorMessage={errors?.city?.message}
        />

        <CheckboxField
          label="Hobby"
          type="checkbox"
          name="hobby"
          checkValue={checkboxHobby}
          register={{ ...register("hobby", { required: "hobby is required" }) }}
          errorMessage={errors?.hobby?.message}
        />

        <RadioButton
          type="radio"
          name="gender"
          label="Gender"
          id="gender"
          radioGender={radioGender}
          register={{
            ...register("gender", { required: "Gender is required" }),
          }}
          errorMessage={errors?.gender?.message}
        />

        {watch("file") ? (
          <div className="">
            <img
              src={watch("file").base64URL}
              alt="Profile"
              className="mt-3 d-inline-block"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <button
              className="border-0 bg-danger text-light ms-2 rounded-1 "
              onClick={(e) => {
                e.preventDefault();
                setValue("file", null);
              }}
            >
              {" "}
              x
            </button>
          </div>
        ) : (
          <FileField
            id="file"
            name="file"
            type="file"
            register={{
              ...register("file", {
                required: "file is required",
                onChange: handleFileInputChange,
              }),
            }}
            errorMessage={errors?.file?.message}
            // onChange={handleFileInputChange}
          />
        )}

        <Button
          className={"bg-primary px-4 py-2 border-0 text-light h5 rounded-2"}
          type={"submit"}
          btnName={"Submit"}
        />
      </form>
    </div>
  );
}
