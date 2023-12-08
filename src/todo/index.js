import "../todo/index.css";
import {Button, Form, message,ConfigProvider,DatePicker, Divider,Checkbox} from "antd";
import {PlusOutlined } from "@ant-design/icons";
import locale from 'antd/locale/ko_KR';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
// import ToList from "../todo/tolist";
import axios from "axios";
import { API_URL } from "../config/constants";
import {  useState,useEffect,useRef } from "react";
dayjs.extend(customParseFormat)

function Todo(){
    
    const inputRef = useRef(null);

    const handleInput = ()=>{
        console.log("handleInput()")
        inputRef.current.value="";

    }
    
    const today = new Date();   
    
    const year = today.getFullYear(); // 년도
    let month = today.getMonth()+1
    month = month >=10 ? month : "0"+month;
    let day = today.getDate();
    day = day >=10 ? day : "0"+day;
    let todo_date = new Date(); 

    const date = year +"-"+month+"-"+day;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [todos, setTodos] = useState([]);
    
        useEffect(function(){
            setSelectedDate(date);
            getLoadTodo(date);
        },[]);



    const getLoadTodo = (date) =>{
        axios.get(`${API_URL}/todos/${date}`)
        .then(function(result){
            if((result.data.todos).length>0){

                setTodos(result.data.todos);
                setTodos(result.data.todos);
            }else{
                setTodos("");
            }
           
            console.log(todos)
        }).catch(function(error){
            console.log('에러!!');
            console.log(error);
        });
    }
    const endChangeTodo = (todoId) =>{
        axios.post(`${API_URL}/todos/end/${todoId}`)
        .then(function(result){
            console.log("end::::");
            getLoadTodo(selectedDate);
        }).catch(function(error){
            console.error(error);
        });
    }

    const onsubmit = (values) => {
        todo_date = dayjs(selectedDate).format("YYYY-MM-DD");
        axios.post(`${API_URL}/todos`,{
            todo_contents: values.todo_contents,
            todo_date:dayjs(selectedDate).format("YYYY-MM-DD"),
            end_yn:'N',

        })
        .then((result)=>{
            
            getLoadTodo(todo_date);
            handleInput();
            message.info("할일 등록!!!");
        }).catch((error)=>{
            message.error(`에러가 발생 ${error.message}`);
        });
    }

    
return (
        <div>

        <div className="todo-input-wrap">
           
           <div className="todo-input-area">

           <Form className=""  name="할일 등록" onFinish={onsubmit}>
           <Form.Item className="form-date" 
       name="food_date" >
            <ConfigProvider locale={locale}>
            <DatePicker initialValues ={dayjs(todo_date).format('YYYY-MM-DD')}
            onChange={(value,dateString)=>{
                setSelectedDate(dateString);
                getLoadTodo(dateString);
            }}
            placeholder={`${dayjs(todo_date).format("YYYY-MM-DD")}`}
            allowClear={false} />
            </ConfigProvider>
       </Form.Item>
            <Divider/>
            <div className="form-i">

        <Form.Item className="form-input" name="todo_contents" rules={[{required:true,message:"할일을 입력해주세요."}]}>
            <input id="todo-input" ref={inputRef} placeholder="TODO를 입력하세요"/>
        </Form.Item>
            <Form.Item className="form-btn">
            <Button id="todo-plus-btn" size="large" icon={<PlusOutlined />}
            htmlType="submit"></Button>
            </Form.Item>
            </div>
            
            </Form>
          
        
        </div>
        </div>
        
        

        <div className="todo-list-wrap">
    <div className="todo-list-area">
        <div id="todo-list">
            {
                
                todos.length>0? (
                todos.map(function(todos,index){
                   return(

                    <div id="todo-ck-style" key={index}>
                    { 
                        
                        todos.end_yn==='Y'? (
                            <Checkbox id={todos.id} onChange={(e)=>{
                                endChangeTodo(e.target.id);
                            }} className="todo-ck"  defaultChecked disabled >  {todos.todo_contents}</Checkbox>
                            ):(
                                <Checkbox id={todos.id} onChange={(e)=>{
                                    endChangeTodo(e.target.id)}} className="todo-ck" checked={false}>
                        
                        {todos.todo_contents} 
                        </Checkbox>    
                    )
                }
                </div>
                   ) 
                })
                ):(
                    <div>등록된 TODO가 없습니다</div>
                )
            }

                </div>
            </div>
        </div>

        </div>


    );

}
export default Todo;