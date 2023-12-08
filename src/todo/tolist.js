
import { Checkbox } from "antd";
import "./index.css";
import axios from "axios";
import { API_URL } from "../config/constants";
function ToList({todoList}){
   
    console.log(todoList)

    const endChangeTodo = (todoId) =>{
        axios.post(`${API_URL}/todos/end/${todoId}`)
        .then(function(result){
            console.log("end::::");

        }).catch(function(error){
            console.error(error);  
        });
    }
return (
        <div> 


        <div id="todo-list-todo">
           {
            todoList.end_yn==='Y'? (
            <Checkbox className="todo-ck" defaultChecked disabled >  {todoList.todo_contents}</Checkbox>
            ):(
            <Checkbox  className="todo-ck" >
                
                {todoList.todo_contents}
                </Checkbox>   
            )
           }              
        </div>
                 
          
          
          

                       
              
         
          
       
        </div>
 


    );

}
export default ToList;