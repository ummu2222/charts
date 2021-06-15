import React , {useEffect , useState} from 'react';
import { Scatter } from 'react-chartjs-2';
import * as zoom from 'chartjs-plugin-zoom'
import { connect ,useDispatch } from "react-redux";
import { fetchFaceEmotions } from "../../../actions/FaceEmotion/faceEmotionsActions";
import { appUsagesActions } from "../../../actions/AppUsageAction/appUsagesActions";



const chart_style = {
    width: "1200px",
    height: "400px",
};

const happyThreshold = 70
const valenceThreshold = -0.2


function groupEmotionsByID(emotions) {

    return emotions.reduce((result, current) => {

        //部署がprevにあるか
        const element = result.find(value => value.user_id === current.user_id);
    
        if (element) {
            //ある時（下記、初期データを操作）
            element.count++;
            element.happy += current.happy;
            element.angry += current.angry;
            element.fear += current.fear;
            element.disgust += current.disgust;
            element.surprise += current.surprise;

        } else {
            //無いとき（新規に初期データを作成）
            result.push({
                user_id: current.user_id,
                count: 1,
                happy: current.happy,
                angry: current.angry,
                fear: current.fear,
                disgust: current.disgust,
                surprise: current.surprise,
            })
        }
        return result;
    
    }, []); //初期値は[]

};


let data = { datasets: [] }



const UserEmotionScatter = (props) =>  {

    
        const { faceEmotions } = props;

        let datasetsValueList = []
        let labelList = []

        let range_x_max = 0;
        let range_y_max = 0;

        if ("emotions" in faceEmotions) {

           

            let happyCountsPerUser = {};
            let valenceCountsPerUser = {};

            for (var i = 0; i < faceEmotions.emotions.length; i++) {
                if (faceEmotions.emotions[i].happy * 100 > happyThreshold) {
                    happyCountsPerUser[faceEmotions.emotions[i].user_id] = 1 + (happyCountsPerUser[faceEmotions.emotions[i].user_id] || 0);
                }

                let valence = -(faceEmotions.emotions[i].angry + faceEmotions.emotions[i].fear + faceEmotions.emotions[i].disgust + faceEmotions.emotions[i].sad)
                if (valence < valenceThreshold) {
                    valenceCountsPerUser[faceEmotions.emotions[i].user_id] = 1 + (valenceCountsPerUser[faceEmotions.emotions[i].user_id] || 0);
                }
            }

            for (const [userId, happyCounts] of Object.entries(happyCountsPerUser)) {
                let dataValue = {}
                dataValue.x = happyCounts

                if (happyCounts > range_x_max){
                    range_x_max = happyCounts;
                }

                if (userId in valenceCountsPerUser) {
                    dataValue.y = valenceCountsPerUser[userId]

                    if (valenceCountsPerUser[userId] > range_y_max){
                        range_y_max = valenceCountsPerUser[userId];
                    }
                }
                else {
                    dataValue.y = 0
                }

                let dataset = {
                    label: userId,
                    borderColor: '#da6160',
                    pointBackgroundColor: '#da6160',
                    backgroundColor: "transparent",
                    showLines: "false",
                    borderWidth: "2",
                    lineTension: "0",
                    data: [],
                };

                dataset.data = [dataValue]
                datasetsValueList.push(dataset)
                labelList.push(userId)
            }

            data = { datasets: datasetsValueList }
        }

        return (
            <div >
                <Scatter data={data} width={1200} height={400}
                    options={{
                        scales: {
                            xAxes: [
                                {
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'happy count',
                                        fontSize: 12
                                    },
                                }
                            ],
                            yAxes: [
                                {
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'minus valence count',
                                        fontSize: 12
                                    },
                                }
                            ]
                        },
                        pan: {
                            enabled: true,
                            mode: 'x',
                            speed: 0.1,
                            rangeMin: {
                                x: 0,
                            },
                            rangeMax: {
                                x: range_x_max,
                                y: range_y_max,
                            },
                        },
                        zoom: {
                            enabled: true,
                            mode: 'x',
                            speed: 0.1,
                            rangeMin: {
                                x: 0,
                            },
                            rangeMax: {
                                x: range_x_max,
                                y: range_y_max,
                            },
                        },
                        onClick: function (evt, element) {
                            if (element.length > 0) {
                                console.log(element);
                                console.log(element[0]._datasetIndex);
                                // console.log(labelList[element[0]._datasetIndex]);
                                const userId = labelList[element[0]._datasetIndex]
                                console.log(accountId);
                                const url ="/users/" + userId;
                                window.open(url);
                            }
                        }
                    }}
                    type={'scatter'} />
            </div>
        );
}

const mapStateToProps = (state) =>{
    return {
        faceEmotions: state.faceEmotionsReducer.faceEmotions,
        faceEmotionsFetching: state.faceEmotionsReducer.fetching,
        appUsages: state.appUsagesReducer.appUsages,
        appUsagesFetching: state.appUsagesReducer.fetching,
    };
}

export default connect(mapStateToProps)(UserEmotionScatter);