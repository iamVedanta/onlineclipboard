import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function App() {
  const [data, setData] = useState("");
  const [name, setname] = useState("");

  const getData = async () => {
    const resp = await Axios.get("http://localhost:5000/getData");
    setData(resp.data);
  };

  const postData = async () => {
    const resp = await Axios.post("http://localhost:5000/postdata", {
      body: name,
    });
    console.log(resp);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data}
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
      ></input>
      <button onClick={postData}>SUBMIT</button>
    </>
  );
}
//index.js
