import React, { Component } from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import { connect , useDispatch } from "react-redux";
import { fetchFaceEmotions } from "../../../actions/FaceEmotion/faceEmotionsActions";


// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, FusionTheme);
charts(FusionCharts);


const EmotionBarLineDashboard = (props) => {
let emotionScoreList = []
let neutralScoreList = []
let happyScoreList = []
let sadScoreList = []
let angryScoreList = []
let fearScoreList = []
let disgustScoreList = []
let surpriseScoreList = []
let timestampsList = []
let dateFormat = require("dateformat");

const { faceEmotions } = props;

if ("emotions" in faceEmotions && faceEmotions.emotions.length != 0) {

            for (let i = 0; i < faceEmotions.emotions.length; i++) {

                let emotionScore = {}
                let neutralScore = {}
                let happyScore = {}
                let sadScore = {}
                let angryScore = {}
                let fearScore = {}
                let disgustScore = {}
                let surpriseScore = {}
                let timestamps = {}

                timestamps.label = dateFormat(new Date(faceEmotions.emotions[i].timestamp), "h:MM:ss TT");
                timestampsList.push(timestamps);
              
                emotionScore.value = (1 - faceEmotions.emotions[i].neutral) * 100
                emotionScoreList.push(emotionScore);

               
                neutralScore.value = faceEmotions.emotions[i].neutral * 100
                neutralScoreList.push(neutralScore);

                happyScore.value = faceEmotions.emotions[i].happy * 100
                happyScoreList.push(happyScore);

                sadScore.value = faceEmotions.emotions[i].sad * 100
                sadScoreList.push(sadScore);

                angryScore.value = faceEmotions.emotions[i].angry * 100
                angryScoreList.push(angryScore);

                fearScore.value = faceEmotions.emotions[i].fear * 100
                fearScoreList.push(fearScore);

                disgustScore.value = faceEmotions.emotions[i].disgust * 100
                disgustScoreList.push(disgustScore);

                surpriseScore.value = faceEmotions.emotions[i].surprise * 100
                surpriseScoreList.push(surpriseScore);



            };

}

  const dataSource = {
    chart: {
    //   caption: "Emotion Score",
      subcaption: "Multi-Line Bar",
      xaxisname: "Time",
      yaxisname: "Value",
      theme: "fusion",
      animation: "1",
      numvisibleplot: "30",
      drawAnchors:"0",
    },
    categories: [
      {
        category: timestampsList,
      },
    ],
    dataset: [
      {
        seriesname: "Emotion",
        data: emotionScoreList,
        color: "#dd6f6e",
      },
      {
        seriesname: "Happy",
        color: "#f48f57",
        renderas: "line",
        data: happyScoreList,
      },
      {
        seriesname: "Surprise",
        renderas: "line",
        color: "#e66b9d",
        data: surpriseScoreList,
      },
      {
        seriesname: "Disgust",
        renderas: "line",
        color: "#934e9f",
        data: disgustScoreList,
      },
      {
        seriesname: "Angry",
        renderas: "line",
        color: "#45379b",
        data: angryScoreList,
      },
      {
        seriesname: "Sad",
        renderas: "line",
        color: "#1d5fbf",
        data: sadScoreList,
      },
      {
        seriesname: "Fear",
        renderas: "line",
        color: "#2097b7",
        data: fearScoreList,
      },
    ],
  };

  
  
    return (
      <ReactFC
        type="scrollcombidy2d"
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


export default connect(mapStateToProps)(EmotionBarLineDashboard);