//mport { useParams } from "react-router";
import "../upload/index.css";
import { useState } from "react";
import { Divider, Form,Input, Upload,Button ,DatePicker,ConfigProvider,TimePicker, message } from "antd"; 
import dayjs from "dayjs";
import locale from 'antd/locale/ko_KR';
//import { Option } from "antd/es/mentions";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from "axios";
import { API_URL } from "../config/constants";
dayjs.extend(customParseFormat)
function UploadFood(){
    
    var format = "HH:mm";
    let tm = "00:00";

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);

    const [imageUrl,setImageUrl]=useState(null); 
    let eat_date = "";
    const today = new Date();
    eat_date = today;

    const onChangeImage = (info) => {
        if(info.file.status === 'uploading'){
            return;
        }
        if(info.file.status === 'done'){
            const response = info.file.response;
            const imageUrl =  response.imageUrl;
            setImageUrl(imageUrl);
            setImageUrl(imageUrl);
        }
    }

   
    const onsubmit = (values) => {
        console.log("전송시점"+eat_date);
        axios.post(`${API_URL}/foods`,{
            food_name : values.food_name,
            kcal : values.food_kcal,
            eat_date: dayjs(selectedDate).format("YYYY-MM-DD"),
            eat_time : selectedTime,
            food_place: values.food_place,
            image_url : imageUrl,
        })
        .then((result)=>{
            window.location.href = "/food";
        })
        .catch((error)=>{
            message.error(`에러가 발생${error.message}`);
        });
    }

    return (
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
            <div className="upload-label" >음식
            </div>}
       name="food_name" rules={[{required:true,message:"음식을 입력해주세요."}]}>
        <Input className="upload-name" size="midium" placeholder="음식을 입력해주세요"/>
       </Form.Item>
       <Divider style={{ borderBottom: '1.5px solid #00D8FF' }} />
       <Form.Item label={
            <div className="upload-label" >kcal
            </div>}
       name="food_kcal" type="Number" rules={[{required:true,message:"kcal를 입력해주세요."}]}>
        <Input className="upload-name" size="midium" placeholder="kcal를 입력해주세요"/>
      
       </Form.Item>
       <Divider  style={{ borderBottom: '1.5px solid #00D8FF' }}/>
       <Form.Item label={
            <div className="upload-label" >날짜
            </div>}
       name="food_date" >
        <ConfigProvider locale={locale}>
<DatePicker initialValues ={dayjs(eat_date).format('YYYY-MM-DD')}
onChange={(value,dateString)=>{
    setSelectedDate(dateString);
}}
placeholder={`${dayjs(eat_date).format("YYYY-MM-DD")}`}
allowClear={false} />
</ConfigProvider>
       </Form.Item>
       <Form.Item label={
        <div className="upload-label">시간</div>
       } name="food_time" >

      
<TimePicker initialValues={dayjs('00:00', 'HH:mm')}
 format={format} onChange={(time,timeString)=>{
    console.log(time);
    console.log(timeString);
    tm = timeString;
    console.log(tm);
    setSelectedTime(timeString);
    setSelectedTime(timeString);
    console.log(selectedTime);
 }}
 allowClear={false}/>
       </Form.Item>
       <Divider  style={{ borderBottom: '1.5px solid #00D8FF' }}/>
       <Form.Item label={
            <div className="upload-label" >장소
            </div>}
       name="food_place" rules={[{required:true,message:"장소를 입력해주세요."}]}>
        <Input className="upload-name" size="midium" placeholder="장소를 입력해주세요"/>
       </Form.Item>


       <Form.Item>
        <Button id="submit-button"  type="primary" size="midium" htmlType="submit">저장</Button>
       </Form.Item>
        </Form>
    </div>
    
    );
}
export default UploadFood;