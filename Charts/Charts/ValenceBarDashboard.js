import React, { Component } from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";

// Include the chart type
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import { connect , useDispatch } from "react-redux";
import { fetchFaceEmotions } from "../../../actions/FaceEmotion/faceEmotionsActions";


// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, FusionTheme);
charts(FusionCharts);


const ValenceBarDashboard = (props) => {

let dateFormat = require("dateformat");
let valenceScoreList = [];
let timestampsList =[];
const { faceEmotions } = props;

if ("emotions" in faceEmotions && faceEmotions.emotions.length != 0) {


  //console.log(faceEmotions.emotions);
  //console.log("aaaa");

  for (let i = 0; i < faceEmotions.emotions.length; i++) {

      let valenceScore = {};
      let timestamp ={};

      timestamp.label = dateFormat(new Date(faceEmotions.emotions[i].timestamp), "h:MM:ss TT");
      timestampsList.push(timestamp);
      valenceScore.value = faceEmotions.emotions[i].happy - (faceEmotions.emotions[i].angry + faceEmotions.emotions[i].fear + faceEmotions.emotions[i].disgust + faceEmotions.emotions[i].sad);
      valenceScoreList.push(valenceScore);

  };

}

const dataSource = {
  chart: {
    // caption: "Summer Olympics Medal Tally",
    subcaption: "Users Valence Score",
    yaxisname: "Score",
    numvisibleplot: "70",
    labeldisplay: "auto",
    theme: "fusion"
  },
  categories: [
    {
      category: timestampsList
    }
  ],
  dataset: [
    {
      seriesname: "Valence Score",
      data: valenceScoreList
    }
  ]
};
  
  
    return (
      <ReactFC
        type="scrollcolumn2d"
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


export default connect(mapStateToProps)(ValenceBarDashboard);