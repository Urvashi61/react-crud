import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, deleteData } from "../redux/listingApi";

const Listing = () => {
  const getResponse1 = useSelector((state) => state.listdata.listData);
  const loading = useSelector((state) => state.listdata.loading);
  const dispatch = useDispatch();
  const history = useNavigate();
  
  const deleteDataItem = (id) => {
    dispatch(deleteData(id));
    setTimeout(() => {
      history("/");
    }, 2000);
  };

  useEffect(() => {
    if (!loading) {
      dispatch(getUser());
    }
  }, [getResponse1]);

  return (
    <React.Fragment>
      <table>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        {getResponse1.map((item) => (
          <>
            <tr>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>
                <button>
                  <Link to={`/edit/${item.id}`}>Edit</Link>
                </button>
                <button onClick={() => deleteDataItem(item.id)}>Delete</button>
              </td>
            </tr>
          </>
        ))}
      </table>
    </React.Fragment>
  );
};

export default Listing;
