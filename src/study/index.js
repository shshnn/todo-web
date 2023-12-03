import "../study/index.css";
import React from "react";
import { DatePicker,ConfigProvider ,Button} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import locale from 'antd/locale/ko_KR';
import { useEffect } from "react";
import dayjs from 'dayjs';
import axios from "axios";
import { API_URL } from "../config/constants";
function StudyPage(){
    const today = new Date();
    const year = today.getFullYear()
    let month = today.getMonth()+1
    month = month >=10 ? month : "0"+month;
    let day = today.getDate();
    day = day >=10 ? day : "0"+day;
    const date = year +"-"+month+"-"+day;
    //const [selectedDate,setSelectedDate]=useState(new Date());
   // let year = today.getFullYear(); // 년도
   const [ studies , setStudies ] = React.useState([]);
   useEffect(function(){
    getLoadStudy(date);
    console.log("============초기조회============")
   },[]); 

    
    const getLoadStudy = (dateStr) =>{
      console.log("조회시작!!!!")
        axios.get(`${API_URL}/studies/${dateStr}`)
        .then(function(result){
            console.log("스터디조회결과:::",result.data.studies);
            if((result.data.studies).length>0){

                setStudies(result.data.studies);
                setStudies(result.data.studies);
            }else{
                setStudies("");
            }
            
            
            console.log("setStudy::::",studies);
        })
        .catch(function(error){
            console.log("스터디 조회 에러 발생:::");
            console.error(error);
        });
    }
    
   
    return (
        <div>

        <div className="study-date-wrap">
           
           <div className="study-date-area">

     

<ConfigProvider locale={locale}>
  <DatePicker initialValues={dayjs(new Date(), 'YYYY-MM-DD')}
   onChange={(value,dateString)=>{
    console.log('dataString::'+dateString);
    getLoadStudy(dateString);
    //setSelectedDate(dateString);
}} 
allowClear={false}
placeholder={date}
/>
</ConfigProvider>
          
<Button id="study-plus-btn" size="large"
 icon={<PlusOutlined />}
 onClick={function(){
    window.location.href = "/upload/study";
   }}></Button>
        
    </div>
    </div>
    <div className="study-list-wrap">
        <div className="study-list-area">
            <div id="study-list">
                <div id="study-list-todo">
                {
                   studies.length>0 ? (

                       studies.map(function(studies,index){
                           return(
                               
                               <div id="study-item" key={index}>
                                
                                <div className="study-img-wrap">
                                    {
                                        studies.image_url? (<img  className="study-img" src={`${API_URL}/${studies.image_url}`} alt=""/>
                                        ):(<img className="study-img" src={`${API_URL}/uploads/images/noimage.png`} alt="" /> )
                                    }
                                     </div>
                                <div className="study-contents">
                                    <div className="study-label">
                                    <span className="study-label-style">스터디명</span>
                                    <span className="study-label-style">인원</span>
                                    <span className="study-label-style">시간</span>
                                    <span className="study-label-style">장소</span>
                                    </div>

                                    <div className="study-text">

                                    <span className="study-name">
                                        {studies.study_name}
                                    </span>
                                    <span className="study-inwon">
                                        {studies.study_inwon}
                                    </span>
                                  
                                    <span className="study-date">
                                        {studies.study_date}, {studies.study_time}
                                    </span>
                                    <span className="study-place">
                                        {studies.study_place}
                                    </span>
                                    </div>

                                </div>

                            </div>
                          
                          
                           
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          );  
                        })
    ):(<div className="no-study">스터디를 등록해 주세요</div>)
                    }
           
                    </div>
            
            </div>
        </div>    
        </div>   
        </div>
    );
}
export default StudyPage;