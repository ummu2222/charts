import React, { Component } from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import { connect , useDispatch } from "react-redux";
import { fetchFaceEmotions } from "../../../actions/FaceEmotion/faceEmotionsActions";


// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, PowerCharts, FusionTheme);





const EmotionDonutDashboard = (props) => {

let neutralScore = 0;
let happyScore = 0;
let sadScore = 0;
let angryScore = 0;
let fearScore = 0;
let disgustScore = 0;
let surpriseScore = 0;
const { faceEmotions } = props;
let users = new Set();
let users_emotion = {};
if ("emotions" in faceEmotions && faceEmotions.emotions.length != 0) {


  // range_max = new Date(faceEmotions.emotions[0].timestamp);
  // range_min = new Date(faceEmotions.emotions[faceEmotions.emotions.length - 1].timestamp);

  for (let i = 0; i < faceEmotions.emotions.length; i++) {
    users.add(faceEmotions.emotions[i].user_id);
  }
  users.forEach(a=>{users_emotion[a]={},users_emotion[a]["angry"]=0;
  users_emotion[a]['disgust']=0;
  users_emotion[a]['fear']=0;
  users_emotion[a]['happy']=0;
  users_emotion[a]['neutral']=0;
  users_emotion[a]['sad']=0;
  users_emotion[a]['surprise']=0;});
  // for (let i = 0; i < users.length; i++) {
  //   users_emotion[users[i]]={};
  // }
  for (let i = 0; i < faceEmotions.emotions.length; i++) {

    // users_emotion[faceEmotions.emotions[i].user_id]["angry"]+=faceEmotions.emotions[i].angry;
    // users_emotion[faceEmotions.emotions[i].user_id]['disgust']+=faceEmotions.emotions[i].disgust;
    // users_emotion[faceEmotions.emotions[i].user_id]['fear']+=faceEmotions.emotions[i].fear;
    // users_emotion[faceEmotions.emotions[i].user_id]['happy']+=faceEmotions.emotions[i].happy;
    // users_emotion[faceEmotions.emotions[i].user_id]['neutral']+=faceEmotions.emotions[i].neutral;
    // users_emotion[faceEmotions.emotions[i].user_id]['sad']+=faceEmotions.emotions[i].sad;
    // users_emotion[faceEmotions.emotions[i].user_id]['surprise']+=faceEmotions.emotions[i].surprise;
    neutralScore +=faceEmotions.emotions[i].neutral;
    happyScore +=faceEmotions.emotions[i].happy;
    sadScore +=faceEmotions.emotions[i].sad;
    angryScore +=faceEmotions.emotions[i].angry;
    fearScore +=faceEmotions.emotions[i].fear;
    disgustScore +=faceEmotions.emotions[i].disgust;
    surpriseScore +=faceEmotions.emotions[i].surprise;
  }
}
let rows = parseInt(users.size/4);
let cols = 4;
if(users.size%4!=0){
  rows+=1;
}
let dataset=[];
let cnt=0;
let r=1;
let c=1;
users.forEach(u=>{
  let data ={};
  let emotion="happy";
    if(users_emotion[u]['angry']>users_emotion[u]['disgust']&&users_emotion[u]['angry']>users_emotion[u]['fear']&&users_emotion[u]['angry']>users_emotion[u]['happy']&&users_emotion[u]['angry']>users_emotion[u]['neutral']&&users_emotion[u]['angry']>users_emotion[u]['sad']&&users_emotion[u]['angry']>users_emotion[u]['surprise']){
      emotion="angry";
    }
    else if(users_emotion[u]['disgust']>users_emotion[u]['angry']&&users_emotion[u]['disgust']>users_emotion[u]['fear']&&users_emotion[u]['disgust']>users_emotion[u]['happy']&&users_emotion[u]['disgust']>users_emotion[u]['neutral']&&users_emotion[u]['disgust']>users_emotion[u]['sad']&&users_emotion[u]['disgust']>users_emotion[u]['surprise']){
      emotion="disgust";
    }else if(users_emotion[u]['fear']>users_emotion[u]['disgust']&&users_emotion[u]['fear']>users_emotion[u]['angry']&&users_emotion[u]['fear']>users_emotion[u]['happy']&&users_emotion[u]['fear']>users_emotion[u]['neutral']&&users_emotion[u]['fear']>users_emotion[u]['sad']&&users_emotion[u]['fear']>users_emotion[u]['surprise']){
      emotion="fear";
    }else if(users_emotion[u]['happy']>users_emotion[u]['disgust']&&users_emotion[u]['happy']>users_emotion[u]['fear']&&users_emotion[u]['happy']>users_emotion[u]['angry']&&users_emotion[u]['happy']>users_emotion[u]['neutral']&&users_emotion[u]['happy']>users_emotion[u]['sad']&&users_emotion[u]['happy']>users_emotion[u]['surprise']){
      emotion="happy";
    }else if(users_emotion[u]['neutral']>users_emotion[u]['disgust']&&users_emotion[u]['neutral']>users_emotion[u]['fear']&&users_emotion[u]['neutral']>users_emotion[u]['happy']&&users_emotion[u]['neutral']>users_emotion[u]['angry']&&users_emotion[u]['neutral']>users_emotion[u]['sad']&&users_emotion[u]['neutral']>users_emotion[u]['surprise']){
      emotion="neutral";
    }else if(users_emotion[u]['sad']>users_emotion[u]['disgust']&&users_emotion[u]['sad']>users_emotion[u]['fear']&&users_emotion[u]['sad']>users_emotion[u]['happy']&&users_emotion[u]['sad']>users_emotion[u]['neutral']&&users_emotion[u]['sad']>users_emotion[u]['angry']&&users_emotion[u]['sad']>users_emotion[u]['surprise']){
      emotion="sad";
    }else if(users_emotion[u]['surprise']>users_emotion[u]['disgust']&&users_emotion[u]['surprise']>users_emotion[u]['fear']&&users_emotion[u]['surprise']>users_emotion[u]['happy']&&users_emotion[u]['surprise']>users_emotion[u]['neutral']&&users_emotion[u]['surprise']>users_emotion[u]['sad']&&users_emotion[u]['surprise']>users_emotion[u]['angry']){
      emotion="surprise";
    }
       data = {
        rowid: r.toString(),
        columnid: (c++).toString(),
        displayvalue: "User"+(++cnt),
        value:u,
        colorrangelabel: emotion,
      }

      if(cnt%4==0){
        r++;
        c=1;
      }
 
  dataset.push(data);
});

let rows_data =[];
let cols_data =[];
for (let i = 0; i < rows; i++) {
  let d = {
    id: (i+1).toString(),
  }
  rows_data.push(d);
}


for (let i = 0; i < cols; i++) {
  let d = {
    id: (i+1).toString(),
  }
  cols_data.push(d);
}


const dataSource = {
    chart: {
      caption: "Emotional Overview",
      subcaption: "Overall",
      showplotborder: "1",
      showLabels: "1",
      animation: "1",
      hoverfillcolor: "#efe3d8",
      numberprefix: "$",
      plottooltext: "<b>$label</b>  <b>$value</b>",
      theme: "fusion",
    },
    category: [
      {
        label: "Emotion",
        tooltext: "Please hover over a sub-category to see details",
        color: "#ffffff",
        value: (happyScore+sadScore+fearScore+angryScore+disgustScore+neutralScore).toString(),
        category: [
          {
            label: "Positive",
            color: "#ff884d",
            value: happyScore.toString(),
            category: [
              {
                label: "Happy",
                color: "#f48f57",
                value: happyScore.toString(),
              },
            ],
          },
          
          {
            label: "Negative",
            color: "#5375d4",
            value: (sadScore+fearScore+angryScore+disgustScore).toString(),
            category: [
              
              {
                label: "Disgust",
                color: "#934e9f",
                value: disgustScore.toString(),
              },
              {
                label: "Angry",
                color: "#45379b",
                value: angryScore.toString(),
              },
              {
                label: "Sad",
                color: "#1d5fbf",
                value: sadScore.toString(),
              },
              {
                label: "Fear",
                color: "#2097b7",
                value: fearScore.toString(),
              },
            ],
          },{
            label: "Neutral",
            color: "#ffcd89",
            value: neutralScore.toString(),
            category: [
              {
                label: "Neutral",
                color: "#ffcd89",
                value: neutralScore.toString(),
              },
            ],
          },
        ],
      },
    ],
  };
  
  // constructor(props) {
  //   super(props);
  //   // this.props = props;
  //   this.state = {
  //     message: "",
  //     enabled: false,
  //   };
    console.log(rows);
    // FusionCharts.addEventListener("dataplotClick", this.dataPlotClick);
  
  // dataPlotClick = (eventObj, dataObj) => {
  //   props.changeIt();
  // };

    return (
        <ReactFC
        type="multilevelpie"
        width="100%"
        height="500"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );

}
 
const mapStateToProps = (state) =>{

  return {
      faceEmotions: state.faceEmotionsReducer.faceEmotions,
      faceEmotionsFetching: state.faceEmotionsReducer.fetching
  };
}


export default connect(mapStateToProps)(EmotionDonutDashboard);