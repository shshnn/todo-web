
import { Checkbox } from "antd";
import "./index.css";
function ToList({todoList}){
   
    console.log(todoList)

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