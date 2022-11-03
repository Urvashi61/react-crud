import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postUser } from "../redux/listingApi";
import { useDispatch } from "react-redux";

const AddData = () => {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const history = useNavigate();
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const data = {
    first_name: firstname,
    last_name: lastname,
    email: email,
    id: uuidv4(),
  };

  const postUserData = async () => {
    dispatch(postUser(data));
    setTimeout(() => {
      history("/");
    }, 200);
  };

  return (
    <form onSubmit={handleSubmit(postUserData)}>
      <table>
        <tr>
          <th> First Name</th>
          <td>
            {" "}
            <input
              type="text"
              value={firstname}
              {...register("firstname", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
              aria-invalid={errors.firstname ? "true" : "false"}
              onChange={(e) => setFirstname(e.target.value)}
            />
            {errors.firstname?.type === "required" && (
              <p role="alert">First name is required</p>
            )}
            {errors.firstname?.type === "pattern" && (
              <p role="alert">Invalid name</p>
            )}
          </td>
        </tr>
        <tr>
          <th> Last Name</th>
          <td>
            {" "}
            <input
              type="text"
              value={lastname}
              {...register("lastname", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
              aria-invalid={errors.lastname ? "true" : "false"}
              onChange={(e) => setLastname(e.target.value)}
            />
            {errors.lastname?.type === "required" && (
              <p role="alert">last name is required</p>
            )}
            {errors.lastname?.type === "pattern" && (
              <p role="alert">Invalid name</p>
            )}
          </td>
        </tr>
        <tr>
          <th> Email Name</th>
          <td>
            {" "}
            <input
              type="text"
              email={email}
              {...register("email", {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              aria-invalid={errors.email ? "true" : "false"}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email?.type === "required" && (
              <p role="alert">email is required</p>
            )}
            {errors.email?.type === "pattern" && (
              <p role="alert">email not vaild</p>
            )}
          </td>
        </tr>
        <tr>
          <th> </th>
          <td>
            {" "}
            <input type="submit" value="submit" />
          </td>
        </tr>
      </table>
    </form>
  );
};

export default AddData;
