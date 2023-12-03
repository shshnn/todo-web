import { useParams } from "react-router";
import "../upload/index.css";
//import { useState } from "react";
import dayjs from "dayjs";
//import locale from 'antd/locale/ko_KR';
//import { Option } from "antd/es/mentions";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import StudyUpload from "./study";
import UploadFood from "./food";

dayjs.extend(customParseFormat);

function UploadPage(){
    var {item} = useParams();
   
    console.log('item:::'+item);
    
    return(
        
                <div id="upload-wrap">
                
                {item==="study" ? <StudyUpload/> : <UploadFood/>}
      
 


    </div>
    );
}
export default UploadPage;