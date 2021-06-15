import React, { Component } from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";

// Include the chart type
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import { connect , useDispatch } from "react-redux";
import { fetchFaceEmotions } from "../../../actions/FaceEmotion/faceEmotionsActions";


// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts,FusionTheme, TimeSeries);


const ValenceBarPerUser = (props) => {

    let dateFormat = require("dateformat");
    let data_set = [];
    const { faceEmotions, userId } = props;
    let start_date  = new Date();
    let end_date = new Date();
    end_date.setDate(end_date.getDate());
    start_date.setDate(start_date.getDate()-5);
    start_date = dateFormat(start_date,"m/d/yyyy H");
    end_date = dateFormat(end_date,"m/d/yyyy H");

    if ("emotions" in faceEmotions && faceEmotions.emotions.length != 0) {

        for (let i = 0; i < faceEmotions.emotions.length; i++) {

            const userIdInEmotions =  faceEmotions.emotions[i].user_id;
                        
            if(userIdInEmotions != userId){
                continue;
            }

            let data = [];
            data.push(dateFormat(new Date(faceEmotions.emotions[i].timestamp), "m/d/yyyy H"));// H:M:ss form seconds
            data.push(faceEmotions.emotions[i].happy - (faceEmotions.emotions[i].angry + faceEmotions.emotions[i].fear + faceEmotions.emotions[i].disgust + faceEmotions.emotions[i].sad));
            data_set.push(data);

        };

    }

    const dataFetch = data_set;
const schemaFetch =  [ {
  "name": "Time",
  "type": "date",
  "format": "%-m/%-d/%Y %H" // %H:%M:%S for seconds 
}, {
  "name": "Valence",
  "type": "number"
}, 
];
const fusionTable = new FusionCharts.DataStore().createDataTable(
  dataFetch,
  schemaFetch,
);
const dataSource = {
  type: "timeseries",
  renderAt: "container",
  width:"100%",
  height: "600",
  dataSource:{
  data:fusionTable,
  chart: {
      
    //   "palettecolors":"dd6f6e,ffcf8e,f48f57,1d5fbf,45379b,2097b7,934e9f,e66b9d"
    },
  caption: {
   
  },
  subcaption: {
   
  },
  legend: {
    position: 'top', 
    alignment: 'middle'
  },
  yaxis: [
    {
      plot: [
        {
          value: "Valence",
          type: "column",
          connectnulldata: true,
          
        }
      ]
    }
  ],
  xaxis: {
    // showclippingcue: "1",
    "autoClipNullData": "Hour",
    // "autoClipMultiplier": 4,
    // initialinterval: {
    //   from: start_date,
    //   to: end_date
    // }
}

}
};
    return (
      <ReactFC
      {...dataSource}
      />
    );

}
 
const mapStateToProps = (state) =>{

  return {
      faceEmotions: state.faceEmotionsReducer.faceEmotions,
      faceEmotionsFetching: state.faceEmotionsReducer.fetching
  };
}


export default connect(mapStateToProps)(ValenceBarPerUser);