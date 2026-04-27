import { useEffect } from "react";
import { getPost } from "./api/PostApi";
import { Post } from "./components/Post";


const App = () =>{
  // const getPostDate = async()=>{
  //      const res = await getPost();
  //      const data = res.json();
  //     //  console.log(res);
  //      console.log(res.data);

  // };
 

  // useEffect(()=>{
  //   getPostDate();
  // }, []);
  return (
    <section className="main-section ">
      <Post />
    </section>
  )
};

export default App;