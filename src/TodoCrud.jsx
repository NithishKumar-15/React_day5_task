import {React,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./TodoCrud.css";

function TodoCrud() {

    const[todo,addTodo]=useState([]);
    const[name,setName]=useState("");
    const[description,setdescription]=useState("");
    const[id,setID]=useState(0);
    const[editId,setEditID]=useState(null);
    const[filter,setFilter]=useState("All");

    function addTododFun(Num){
        setID(id+1);
        if(Num!=null){
           const items=todo.map((val,ind)=>(val.Id===Num?{...val,Name:name,Description:description}:val))
            addTodo(items);
            }
            else{
                let obj={
                    Id:id,
                    Name:name,
                    Description:description,
                    status:"Not Completed"
                }
                addTodo([...todo,obj])
                console.log(todo);
                console.log(id);
            }
        setName("");
        setdescription("");
        setEditID(null);
    }

    

    function editTodo(id){
        todo.forEach((val,ind)=>{
            val.Id===id&& setName(val.Name);
            val.Id===id&& setdescription(val.Description);
        })
        setEditID(id);
    }

    function deleteTodo(Num){
        let listItem=todo.map((val)=>(
            val.Id!=Num&&{...val}
        ))
        addTodo(listItem);
        setID(Num);
    }

    function changeStatus(Num,value){
        let listItem=todo.map((val)=>(
            val.Id===Num?{...val,status:value}:{...val}
        ))
        addTodo(listItem);
    }

    return (
        <>
        <div className="container-fluid">
            <h4 className="text-center">My Todo</h4>
            <form className="d-flex justify-content-around" onSubmit={(e)=>e.preventDefault()}>
                
            <input type={"text"} value={name} placeholder="Todo Name" onChange={(e)=>{setName(e.target.value)}}></input>
            <input type={"text"} value={description} placeholder="Todo Description" onChange={(e)=>{setdescription(e.target.value)}}></input>

            <button onClick={()=>addTododFun(editId)}>Add Todo</button>
            </form>
        </div>
        <br></br>
        <div className="container-fluid">

        <br></br>
        <br></br>
        <div className="d-flex justify-content-between">
        <h3>My Todos</h3>
        <div>
        <label>Status Filter :</label>
        <select onSelect={()=>changeStatus(val.Id)}>
            <option style={{backgroundColor:"rgb(254,127,132)"}} value="All" >All</option>
            <option style={{backgroundColor:"rgb(19,173,137)"}} value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
        </select>
        </div>
        </div>
        </div>
        <br></br>
        <br></br>

        <div className="row justify-content-between">
          {todo.map((val)=>{
            if(Object.keys(val).length!=0&& filter==="All"){
           
           return <div key={val.Id} className="col-3 content">
            <p>Name:{val.Name}</p>
            <p>Description:{val.Description}</p>
            <span>Status</span>
            <select onSelect={()=>changeStatus(val.Id,e.target.value)}>
                <option>{val.status}</option>
                {val.status==="Not Completed"?<option style={{backgroundColor:"rgb(19,173,137)"}} value="Completed" onClick={(e)=>changeStatus(val.Id,e.target.value)}>Completed</option>
                :<option>Not Completed</option>}
            </select>
            <br></br>
            <br></br>
            <button onClick={()=>{editTodo(val.Id)}} id="edit">Edit</button>
            <button onClick={()=>{deleteTodo(val.Id)}} id="delete">Delete</button>
            </div>
            }else if(Object.keys(val).length!=0&& filter==="Not Completed"&&val.status===""){

            }
          })}
        </div>
        </>
    )
}

export default TodoCrud;