import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteData,
  editdata,
  getdata,
  loguot,
  searchData,
  sortby,
} from "../../Redux/Action/action";
import { useNavigate } from "react-router-dom";

const Dashbord = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [search, seatsearch] = useState("title");
  const [query, seatquery] = useState("");

  const [currObj, setCurrObj] = useState({});
  const [edittedData, setEditedData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isError, isLoading, loggedin } = useSelector(
    (state) => state.prod
  );

  const handelLogout = () => {
    dispatch(loguot());
  };
  const handelchange = (e) => {
    setEditedData({ ...edittedData, [e.target.name]: e.target.value });
  };
  const hendeledit = (elem) => {
    setShowEdit(true);
    setCurrObj(elem);
  };
  //   console.log(edittedData);

  const handeleditsubmit = (e) => {
    setShowEdit(false);
    e.preventDefault();
    const payload = {
      id: currObj.id,
      title: edittedData.title || currObj.title,
      price: edittedData.price || currObj.price,
      description: edittedData.description || currObj.description,
    };
    dispatch(editdata(payload));
  };

  const searchhandler = (e) => {
    // seatquery(() => e.target.value);

    if (e.target.value == "") {
      //   console.log("no input");
      dispatch(getdata());
    }
    if (e.code == "Space") {
      //   console.log("space entred");
      dispatch(searchData(search, e.target.value.trim()));
    }
  };
  const handelsort = (e) => {
    // console.log(e.target.checked);
    //
    dispatch(sortby(e.target.checked));
  };

  useEffect(() => {
    if (!loggedin) {
      navigate("/login");
    }
    dispatch(getdata());
  }, [loggedin]);
  return (
    <>
      <div className="dashbordDiv">
        <div className="searchAndFilterbox">
          <input
            type="text"
            name=""
            id=""
            onKeyUp={searchhandler}
            placeholder="search products"
          />
          <select
            name=""
            defaultValue={search}
            onChange={(e) => seatsearch(e.target.value)}
            id=""
          >
            <option disabled value="search by">
              search by
            </option>
            <option value="id">Id</option>
            <option value="title">Title</option>
            <option value="description">Description</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
          </select>
          <div className="switch_parrent">
            <p>Desc &nbsp;</p>
            <input
              onChange={handelsort}
              className="react-switch-checkbox"
              id={`react-switch-new`}
              type="checkbox"
            />
            <label className="react-switch-label" htmlFor={`react-switch-new`}>
              <span className={`react-switch-button`} />
            </label>
            {"  "}
            <p> &nbsp; Asc</p>
          </div>
          {/* <label className="switch">
            <input
              //   checked={false}
              onChange={handelsort}
              className="switch-input"
              type="checkbox"
            />
            <span className="switch-label" data-on="Asc" data-off="Desc"></span>
            <span className="switch-handle"></span>
          </label> */}

          <button onClick={handelLogout}>signout</button>
        </div>
        <div className="tablebox">
          <table cellPadding="20" cellSpacing="0" border="0">
            <thead>
              <tr>
                <td>Id</td>
                <td>Title</td>
                <td>Price</td>
                <td>Category</td>
                <td>Description</td>
                <td> Edit </td>
                <td>Delete </td>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((elem) => (
                  <tr key={elem.id}>
                    <td>{elem.id}</td>
                    <td>{elem.title}</td>
                    <td>{elem.price}</td>
                    <td>{elem.category?.name}</td>
                    <td>{elem.description}</td>
                    <td onClick={() => hendeledit(elem)}>
                      <i className="fa-solid fa-pen-to-square" />
                    </td>
                    <td onClick={() => dispatch(deleteData(elem.id))}>
                      <i className="fa-solid fa-trash" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showEdit && (
        <div className="edit">
          <form onSubmit={handeleditsubmit}>
            <div className="formComponents">
              {" "}
              <div>
                <input
                  type="text"
                  autoComplete="Title"
                  name="title"
                  defaultValue={currObj.title}
                  id=""
                  onChange={handelchange}
                  placeholder="Title"
                />
              </div>
              <div>
                <input
                  type="text"
                  autoComplete="name"
                  name="price"
                  defaultValue={currObj.price}
                  onChange={handelchange}
                  id=""
                  placeholder="price"
                />
              </div>
              <div>
                <input
                  onClick={() => setShowEdit(false)}
                  type="text"
                  autoComplete="name"
                  name="description"
                  defaultValue={currObj.description}
                  id=""
                  onChange={handelchange}
                  placeholder="Name"
                />
              </div>
              <div>
                <input type="submit" value="submit" />
              </div>
              <div>
                <button
                  onClick={() => setShowEdit(false)}
                  className="button-46"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Dashbord;
