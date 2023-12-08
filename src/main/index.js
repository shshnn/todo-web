import "./index.css";
import {Button,ConfigProvider,DatePicker,Checkbox} from "antd";
import locale from 'antd/locale/ko_KR';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from "axios";
import { API_URL } from "../config/constants";
import {  useState,useEffect } from "react";
dayjs.extend(customParseFormat)

function MainPage(){
    
    // const inputRef = useRef(null);

    // const handleInput = ()=>{
    //     inputRef.current.value="";

    // }
    
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
    const [studies, setStudies] = useState([]);
    const [foods, setFoods] = useState([]);
    
        useEffect(function(){
            setSelectedDate(date);
           
            getLoadTodo(date);
            getLoadStudy(date);
            getLoadFood(date);
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


    const getLoadStudy = (date) =>{
        axios.get(`${API_URL}/studies/${date}`)
        .then(function(result){
            if((result.data.studies).length>0){

                setStudies(result.data.studies);
                setStudies(result.data.studies);
            }else{
                setStudies("");
            }
           
            console.log(studies)
        }).catch(function(error){
            console.log('에러!!');
            console.log(error);
        });
    }

    
    const getLoadFood = (date) =>{
        axios.get(`${API_URL}/foods/${date}`)
        .then(function(result){
            if((result.data.foods).length>0){

                setFoods(result.data.foods);
                setFoods(result.data.foods);
            }else{
                setFoods("");
            }
           
            console.log(foods)
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

return (
        <div>

        <div className="main-wrap">
           
           <div className="main-date-area">

          <div className="main-date">
            <ConfigProvider locale={locale}>
            <DatePicker initialValues ={dayjs(todo_date).format('YYYY-MM-DD')}
            onChange={(value,dateString)=>{
                setSelectedDate(dateString);
                getLoadTodo(dateString);
                getLoadStudy(dateString);
                getLoadFood(dateString);
            }}
            placeholder={`${dayjs(todo_date).format("YYYY-MM-DD")}`}
            allowClear={false} />
            </ConfigProvider>
            </div>
           </div>
          <div className="main-contents">
            <div className="main-todo">
            <div className="main-title-t">Todo</div>
            {
                todos.length>0? (
                    
                    
                    todos.map(function(todos,index){
                        return(
                            <div key={index}>
                        {
                            
                            todos.end_yn==='Y'? (
                                <Checkbox id={todos.id} onChange={(e)=>{
                                    endChangeTodo(e.target.id)
                                }} className="todo-ck"  defaultChecked disabled >  {todos.todo_contents}</Checkbox>
                                ):(
                                    <Checkbox id={todos.id} onChange={(e)=>{
                                        endChangeTodo(e.target.id)}} className="todo-ck" >
                            
                            {todos.todo_contents}
                            </Checkbox>   
                        )
                    }
                    </div>
                    )
                })
                ):(
                    <div></div>
                    )
                    
                }            
            </div>
            <div className="main-study">
                <div className="main-title-s">Study</div>
                {
                    studies.length>0? (
                       studies.map(function(studies,index){
                            return(
                               
                            <div className="main-study-text">
                                          {
                                       studies.image_url==='' || studies.image_url===null || studies.image_url===undefined
                                        || studies.image_url===0  ?
                                      
                                         (
                                            <img  src={`${API_URL}/uploads/images/noimage.png`} alt="" /> 
                                            )
                                            :(
                                            <img  src={`${API_URL}/${studies.image_url}`} alt="" />
                                            )
                                   
                                     }  
                                    
                                    
                                    <span>{studies.study_name}</span> 
                                    </div>
                          
                               

                            );
                       })
                    ):(
                        <div></div>
                    )
                }
            </div>
            <div className="main-food">
            <div className="main-title-f">Food Record</div>
            {
                    foods.length>0? (
                       foods.map(function(foods,index){
                 
                        console.log(foods.image_url)
                        return(
                               
                            <div className="main-food-text">
                                     {
                                       foods.image_url==='' || foods.image_url===null || foods.image_url===undefined
                                        || foods.image_url===0  ?
                                      
                                         (
                                            <img  src={`${API_URL}/uploads/images/noimage.png`} alt="" /> 
                                            )
                                            :(
                                            <img  src={`${API_URL}/${foods.image_url}`} alt="" />
                                            )
                                   
                                     }  
                                    <span>{foods.food_name}</span> 
                                    </div>
                          
                               

                            );
                       })
                    ):(
                        <div></div>
                    )
                }
            </div>
          </div>
            
          
        
        </div>
        </div>
        
        

        
        


    );

}
export default MainPage;