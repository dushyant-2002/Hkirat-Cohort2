import React, { useState } from 'react'

function CreateTodo() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");


  return (
    <div>
        <input style={{
            padding:10,
            margin:10
        }}
        onChange={(e)=>{setTitle(e.target.value)}}
        type="text" placeholder='title' /> <br />
        <input style={{
            padding:10,
            margin:10
        }}
        onChange={(e)=>{setDescription(e.target.value)}}
        type="description" placeholder='desc' /> <br />
        <button
        style={{
            padding:10,
            margin:10
        }}
        onClick={()=>{
            fetch("http://localhost:8080/todo",{
                method:"POST",
                body:JSON.stringify({
                    title:title,
                    description:description
                }),
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then(async(res)=>{
                const json = await res.json();
                alert("TODO Added")
            })
        }}
        >Add a Todo</button>

    </div>
  )
}

export default CreateTodo