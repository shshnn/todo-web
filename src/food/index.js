
import "../food/index.css";
import React from "react";
import { ConfigProvider,DatePicker,Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import locale from 'antd/locale/ko_KR';
import { useEffect } from "react";
import dayjs from 'dayjs';
import { API_URL } from "../config/constants";
import axios from "axios";
function FoodPage(){
    const today = new Date();   
    
    const year = today.getFullYear(); // 년도
    let month = today.getMonth()+1
    month = month >=10 ? month : "0"+month;
    let day = today.getDate();
    day = day >=10 ? day : "0"+day;

    const date = year +"-"+month+"-"+day;
    
    const [foods, SetFoods] = React.useState([]);
    useEffect(function(){
        getLoadFood(date);
        console.log("=================초기조회===================")
    },[]);
    
    const getLoadFood = (dateStr) => {
        console.log('조회시작!!!!!');
        axios.get(`${API_URL}/foods/${dateStr}`)
        .then(function(result){
            console.log("푸드조회결과::::",result.data.foods);
            if((result.data.foods).length>0){
                SetFoods(result.data.foods);
                SetFoods(result.data.foods);

            }else{
                SetFoods("");
            }
        })
        .catch(function(error){
            console.log("푸드 조회 에러 발생:::::");
            console.error(error);
        });
    }
   
    return (
        <div>

        <div className="food-date-wrap">
           
           <div className="food-date-area">

     
           <ConfigProvider locale={locale}>
  <DatePicker initialValues={dayjs(new Date(), 'YYYY-MM-DD')}
  onChange={(value,dateString)=>{
    console.log('dateString::'+dateString);
    getLoadFood(dateString);
  }} 
  allowClear={false}
  placeholder={date}/>
</ConfigProvider>

<Button id="food-plus-btn" 
size="large" icon={<PlusOutlined />}
onClick={function(){
    window.location.href = "/upload/food";
   }}></Button>
          
        
        </div>

        </div>
        <div className="food-list-wrap">
            <div className="food-list-area">
                <div id="food-list">
                <div id="food-list-todo">
                    {
            foods.length>0 ? (

            foods.map(function(foods,index){
            return(
                
                <div id="food-item" key={index}>
                 
                 <div className="food-img-wrap">
                     {
                         foods.image_url? (<img  className="food-img" src={`${API_URL}/${foods.image_url}`} alt=""/>
                         ):(<img className="food-img" src={`${API_URL}/uploads/images/noimage.png`} alt="" /> )
                     }
                      </div>
                 <div className="food-contents">
                     <div className="food-label">
                     <span className="food-label-style">음식이름</span>
                     <span className="food-label-style">칼로리</span>
                     <span className="food-label-style">시간</span>
                     <span className="food-label-style">장소</span>
                     </div>

                     <div className="food-text">

                     <span className="food-name">
                         {foods.food_name}
                     </span>
                     <span className="food-kcal">
                         {foods.kcal}
                     </span>
                   
                     <span className="eat-date">
                         {foods.eat_date}, {foods.eat_time}
                     </span>
                     <span className="food-place">
                         {foods.food_place}
                     </span>
                     </div>

                 </div>

             </div>
           
           
            
           
           
           
           
           
           
           
           
           
           
           
           );  
         })
):(<div className="no-food">음식을 등록해 주세요</div>)
                    }
                 
                </div>
    
                
                </div>
            </div>    
        </div>   
        </div>
    );
}
export default FoodPage;