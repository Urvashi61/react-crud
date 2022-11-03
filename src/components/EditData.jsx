import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getUserById, updateUserById } from "../redux/listingApi";
import { useDispatch, useSelector } from "react-redux";

const EditData = () => {
  const dispatch = useDispatch();
  const listupdateData = useSelector((state) => state.listdata.ListDataById);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const params = useParams();
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
    id: params.id,
  };

  const changeData = () => {
    dispatch(updateUserById(data));
    setTimeout(() => {
      history("/");
    }, 200);
  };

  useEffect(() => {
    dispatch(getUserById(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    setfirstname(listupdateData.first_name);
    setlastname(listupdateData.last_name);
    setemail(listupdateData.email);
  }, [listupdateData]);

  return (
    <form onSubmit={handleSubmit(changeData)}>
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
              onChange={(e) => setfirstname(e.target.value)}
            />
            {firstname === "" && errors.firstname?.type === "required" && (
              <p role="alert">First name is required</p>
            )}
            {firstname === "" && errors.firstname?.type === "pattern" && (
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
              onChange={(e) => setlastname(e.target.value)}
            />
            {lastname === "" && errors.lastname?.type === "required" && (
              <p role="alert">last name is required</p>
            )}
            {lastname === "" && errors.lastname?.type === "pattern" && (
              <p role="alert">Invalid name</p>
            )}
          </td>
        </tr>
        <tr>
          <th> email Name</th>
          <td>
            {" "}
            <input
              type="text"
              value={email}
              {...register("email", {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              aria-invalid={errors.email ? "true" : "false"}
              onChange={(e) => setemail(e.target.value)}
            />
            {email === "" && errors.email?.type === "required" && (
              <p role="alert">email is required</p>
            )}
            {email === "" && errors.email?.type === "pattern" && (
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
export default EditData;
