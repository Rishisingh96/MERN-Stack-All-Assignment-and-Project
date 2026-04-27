import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import "../App.css"
import {Form} from "./Form";

export const Post = () => {
  const [data, setData] = useState([]);

  const getPostDate = async () => {
    const res = await getPost();
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getPostDate();
  }, []);

  //   function to delete Post
  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => {
          return curPost.id !== id;
        });
        setData(newUpdatedPosts);
      } else {
        console.log("Failed to delete the post:", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          // updateDataApi={updateDataApi}
          // setUpdateDataApi={setUpdateDataApi}
        />
        </section>
    <section className="section-post">
     <ol>
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            console.log(id);
            return (
              <li key={id}>
                <p>ID: {id}</p>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button onClick={() => handleUpdatePost(curElem)}>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
    </section>
    </>
    
  );
};
