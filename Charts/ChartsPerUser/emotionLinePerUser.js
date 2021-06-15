import React, { useEffect, Component } from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import { connect , useDispatch } from "react-redux";
import { fetchFaceEmotions } from "../../../actions/FaceEmotion/faceEmotionsActions";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts,FusionTheme, TimeSeries);

const EmotionLine = (props)=>{

    let dateFormat = require("dateformat");
    let data_set = [];
    let start_date  = new Date();
    let end_date = new Date();
    end_date.setDate(end_date.getDate());
    start_date.setDate(start_date.getDate()-5);
    start_date = dateFormat(start_date,"m/d/yyyy H");
    end_date = dateFormat(end_date,"m/d/yyyy H");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFaceEmotions());        
    }, []);

    const { faceEmotions, userId } = props;

  
    if ("emotions" in faceEmotions && faceEmotions.emotions.length != 0) {

        for (let i = 0; i < faceEmotions.emotions.length; i++) {

            const userIdInEmotions =  faceEmotions.emotions[i].user_id;
            
            if(userIdInEmotions != userId){
                continue;
            }

            let data = [];
                data.push(dateFormat(new Date(faceEmotions.emotions[i].timestamp), "m/d/yyyy H"));// H:M:ss form seconds
                data.push((1 - faceEmotions.emotions[i].neutral) * 100);
                data.push(faceEmotions.emotions[i].neutral * 100);
                data.push(faceEmotions.emotions[i].happy * 100);
                data.push(faceEmotions.emotions[i].sad * 100);
                data.push(faceEmotions.emotions[i].angry * 100);
                data.push(faceEmotions.emotions[i].fear * 100);
                data.push(faceEmotions.emotions[i].disgust * 100);
                data.push(faceEmotions.emotions[i].surprise * 100);
                data_set.push(data);

        };
    }

    const dataFetch = data_set;
    const schemaFetch =  [ {
      "name": "Time",
      "type": "date",
      "format": "%-m/%-d/%Y %H" // %H:%M:%S for seconds 
    }, {
      "name": "Emotion",
      "type": "number"
    }, {
      "name": "Neutral",
      "type": "number"
    }, {
      "name": "Happy",
      "type": "number"
    }, {
      "name": "Sad",
      "type": "number"
    }, {
      "name": "Angry",
      "type": "number"
    }, {
      "name": "Fear",
      "type": "number"
    }, {
      "name": "Disgust",
      "type": "number"
    }, {
      "name": "Surprise",
      "type": "number"
    }
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
      chart: {"palettecolors":"dd6f6e,ffcf8e,f48f57,1d5fbf,45379b,2097b7,934e9f,e66b9d"},
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
              value: "Emotion",
              type: "column",
              connectnulldata: true,
             
            },
            {
              value: "Neutral",
              type: "line",
              connectnulldata: true,
             
            },
            {
              value: "Happy",
              type: "line",
              connectnulldata: true,
            },
            {
              value: "Sad",
              type: "line",
              connectnulldata: true,
            },
            {
              value: "Angry",
              type: "line",
              connectnulldata: true,
            },
            {
              value: "Fear",
              type: "line",
              connectnulldata: true,
            },
            {
              value: "Disgust",
              type: "line",
              connectnulldata: true,
            }
            ,
            {
              value: "Surprise",
              type: "line",
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
    },
    // events: {
    //   dataPlotClick: function(e) {
    //     // var infoElem = document.getElementById("infolbl");
    //     // var index = e.data.dataIndex;
    //     // infoElem.innerHTML =
    //     //   "The average value from <b>" +
    //     //   e.data.startText +
    //     //   "</b> to <b>" +
    //     //   e.data.endText +
    //     //   "</b> is <b>" +
    //       console.log(e.data) ;
    //       // "k</b>";
    //   }
    // }
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

export default connect(mapStateToProps)(EmotionLine);