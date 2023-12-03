import './App.css';
import React from 'react';
import {Switch,Route} from "react-router-dom";
import MainPage from './main';
import TodoPage from './todo';
import {Button} from "antd";
import {CheckCircleTwoTone  } from "@ant-design/icons";
import FoodPage from './food';
import StudyPage from './study';
import UploadPage from './upload';
function App() {
 
 
  return (
   <div >
        <div id='header'>
          <div id='header-area'>
            
            <div className='logo'>
              
              <Button id='logoButton'
             
             icon={<CheckCircleTwoTone  twoToneColor="#00D8FF"/>} 
             onClick={function(){
              window.location.href = "/";
             }}>Todo</Button>
          
          </div>
          
          </div>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,600&family=Noto+Sans+KR:wght@500&display=swap"
 rel="stylesheet"></link>
      
        </div>

        <div id='menu-area'>
        <div id='menu-wrap'>
          <ul>
          <li><div className="manu-li"> <a className="manu-li-a" href='/todo'>Todo</a></div></li>
          
      <li className="manu-li"><div className="manu-border"><a className="manu-li-a" href='/study'> Study</a></div></li>
      <li className="manu-li"><div className="manu-border"><a className="manu-li-a" href='/food'> Food Record</a></div></li>
          </ul>
        </div>
        </div>
        <div id='body'>
          
          <Switch>
            <Route exact={true} path={"/"} component={MainPage}/>
            <Route exact={true} path={"/todo"} component={TodoPage} />
            <Route exact={true} path={"/food"} component={FoodPage} />
            <Route exact={true} path={"/study"} component={StudyPage} />
            <Route exact={true} path={"/upload/:item"} component={UploadPage}/>
          </Switch>
        </div>
        <div id='footer'></div>
    </div>
  );
}

export default App;
