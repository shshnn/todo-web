//import { useParams } from "react-router";
import "../upload/index.css";
//import { useState } from "react";
import { Divider, Form,Input, Upload,Button , Select,DatePicker, message, TimePicker } from "antd"; 
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/constants";
dayjs.extend(customParseFormat);
function StudyUpload(){
var format = "HH:mm";

let tm = "00:00";


const [selectedDate,setSelectedDate]=useState(new Date());
const [selectedTime,setSelectedTime]=useState(null);
const [imageUrl,setImageUrl]=useState(null);
let study_date ="";
const today = new Date();   
study_date= today;
   // let year = today.getFullYear();
   
    const onChangeImage = (info) => {
        if(info.file.status === 'uploading'){
           return;
        }
        if(info.file.status ===  'done') {
           const response = info.file.response;
           const imageUrl = response.imageUrl;
           setImageUrl(imageUrl);
           setImageUrl(imageUrl);
        }
       }

      
     

       const onsubmit = (values) => {
       console.log("전송시점"+study_date)
        axios.post(`${API_URL}/studies`,{
            study_name: values.study_name,
            study_inwon:values.study_inwon,
            study_date:dayjs(selectedDate).format("YYYY-MM-DD"),
            study_time:selectedTime,
            study_place:values.study_place,
            image_url:imageUrl
        })
        .then((result)=>{
            window.location.href = "/study";
           
            message.info("스터디등록");
        }).catch((error)=>{
            message.error(`에러가 발생${error.message}`);
        });
       }

return(

<div id="upload-container">
<Form name="업로드" onFinish={onsubmit}>
    <Form.Item name="upload" 
    label={<div className="upload-label">사진</div>}>
        <Upload
        name="image"
        action={`${API_URL}/image`}
        listType="picture"
        showUploadList={false}
        onChange={onChangeImage}>
            {
                imageUrl ? (
                    <img id="upload-img" src={`${API_URL}/${imageUrl}`} alt=""/>
                    ):(
                        <div id="upload-img-placeholder">
                    <img src="/images/icons/camera.png" alt=""/> 
                    <span>이미지를 업로드해주세요.</span>
                    </div>
                ) 
            }
        </Upload>
    </Form.Item>
    <Divider style={{ borderBottom: '1.5px solid #00D8FF' }}/>
    <Form.Item label={
    <div className="upload-label" >스터디이름
    </div>}
name="study_name" rules={[{required:true,message:"이름을 입력해주세요."}]}>
<Input className="upload-name" size="midium" placeholder="장소를 입력해주세요"/>
</Form.Item>
<Divider style={{ borderBottom: '1.5px solid #00D8FF' }} />
<Form.Item label={
    <div className="upload-label" >인원
    </div>}
name="study_inwon" >
<Select className="upload-name" 
size="midium" placeholder="인원을 선택해주세요"
options={[
    {value:1, label:"1명"},
    {value:2, label:"2명"},
    {value:3, label:"3명"},
    {value:4, label:"4명"},
    {value:5, label:"5명"},

]}>

</Select>

</Form.Item>
<Divider style={{ borderBottom: '1.5px solid #00D8FF' }} />
<Form.Item label={
    <div className="upload-label" >날짜
    </div>}
name="study_date" >

  <DatePicker
        
        
        // timeType=""=
        initialValues={dayjs(study_date).format('YYYY-MM-DD')}
        //initialValue="undefined"
        onChange={(value,dateString)=>{
            setSelectedDate(dateString);
        }}
        placeholder={`${dayjs(study_date).format("YYYY-MM-DD")}`}
        // width={360}
        allowClear={false}
        
        />
</Form.Item>
<Form.Item label={ 
<div className="upload-label">시간</div>
} name="study_time" >


<TimePicker  initialValues={dayjs('00:00', 'HH:mm')}
 format={format} onChange={(time, timeString)=>{
   console.log(time);
   console.log(timeString)
  tm = timeString;
  console.log(tm);
   setSelectedTime(timeString);
   setSelectedTime(timeString);
   console.log(selectedTime);
    
}} allowClear={false} />
</Form.Item>
<Divider style={{ borderBottom: '1.5px solid #00D8FF' }} />
<Form.Item label={
    <div className="upload-label" >장소
    </div>}
name="study_place" rules={[{required:true,message:"장소를 입력해주세요."}]}>
<Input className="upload-name" size="midium" placeholder="장소를 입력해주세요"/>
</Form.Item>


<Form.Item>
<Button id="submit-button"  type="primary" size="midium" htmlType="submit">저장</Button>
</Form.Item>
</Form>
</div>
);
}
export default StudyUpload;