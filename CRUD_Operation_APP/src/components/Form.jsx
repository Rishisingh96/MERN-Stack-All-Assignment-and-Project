import React, { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";


export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {  // Receive the updateDataApi state and setUpdateDataApi function as props from the Post component
//   console.log("Your Form data is ", data);
  const [addData, setAddData] =useState({
    title:"",
    body:"",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0; 
  // Check if updateDataApi is empty to determine whether to show "Add" or "Edit" on the button

  // get the updated data from the Post component when the Edit button is clicked and set it to the addData state to pre-fill the form with the existing data for editing
  useEffect(() =>{
    updateDataApi && setAddData({
      title: updateDataApi.title || "",
      body: updateDataApi.body || "",
    });
  },[updateDataApi]);

 const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

 const addPostData = async () => {
    const res = await postData(addData);
    console.log("res", res);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  //updatePostData
  const updatePostData = async() =>{
    try{
      const res = await updateData(updateDataApi.id, addData);
      console.log("update data show", res);

    if(res.status === 200){
      setData((prev)=>{
        return prev.map((curElem) => {
          // return curElem.id === updateDataApi.id ? res.data:curElem;
          return curElem.id === res.data.id ? res.data:curElem;
        });
      });
      setAddData({title:"", body:""});
      setUpdateDataApi({});
    }
    }catch({error}){
      console.log(error);
    }
  };

   //form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPostData();
    const action = e.nativeEvent.submitter.value;
    console.log("Action:", action);
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add Post"
          id="body"
          name="body"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
       <button type="submit" value={isEmpty ? "Add":"Edit"}>
        {isEmpty ? "Add":"Edit"}
      </button>
    </form>
  );
}

