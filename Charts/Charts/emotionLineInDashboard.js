import React , {useEffect ,useState} from 'react';
import { Scatter } from 'react-chartjs-2';
import * as zoom from 'chartjs-plugin-zoom'
import { connect , useDispatch } from "react-redux";
import { fetchFaceEmotions } from "../../../actions/FaceEmotion/faceEmotionsActions";

let emotionDataset = {
    label: 'emotion',
    borderColor: '#da6160',
    pointBackgroundColor: '#da6160',
    backgroundColor: "transparent",
    showLines: "false",
    borderWidth: "2",
    lineTension: "0",
    data: [],
};

let neutralDataset = {
    label: 'neutral',
    borderColor: '#ffcd89',
    pointBackgroundColor: '#ffcd89',
    backgroundColor: "transparent",
    showLines: "false",
    borderWidth: "2",
    lineTension: "0",
    data: [],
};

let happyDataset = {
    label: 'happy',
    borderColor: '#f48f57',
    pointBackgroundColor: '#f48f57',
    backgroundColor: "transparent",
    showLines: "false",
    borderWidth: "2",
    lineTension: "0",
    data: [],
};

let sadDataset = {
    label: 'sad',
    borderColor: '#1d5fbf',
    pointBackgroundColor: '#1d5fbf',
    backgroundColor: "transparent",
    showLines: "false",
    borderWidth: "2",
    lineTension: "0",
    data: [],
};

let angryDataset = {
    label: 'angry',
    borderColor: '#45379b',
    pointBackgroundColor: '#45379b',
    backgroundColor: "transparent",
    showLines: "false",
    borderWidth: "2",
    lineTension: "0",
    data: [],
};

let fearDataset = {
    label: 'fear',
    borderColor: '#2097b7',
    pointBackgroundColor: '#2097b7',
    backgroundColor: "transparent",
    showLines: "false",
    borderWidth: "2",
    lineTension: "0",
    data: [],
};

let disgustDataset = {
    label: 'disgust',
    borderColor: '#934e9f',
    pointBackgroundColor: '#934e9f',
    backgroundColor: "transparent",
    showLines: "false",
    borderWidth: "2",
    lineTension: "0",
    data: [],
};

let surpriseDataset = {
    label: 'surprise',
    borderColor: '#e66b9d',
    pointBackgroundColor: '#e66b9d',
    backgroundColor: "transparent",
    showLines: "false",
    borderWidth: "2",
    lineTension: "0",
    data: [],
};

let data = { datasets: [emotionDataset, neutralDataset, happyDataset, sadDataset, angryDataset, fearDataset, disgustDataset, surpriseDataset] }


const EmotionLine = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFaceEmotions());
    }, [])
        
    const { faceEmotions } = props;

        let emotionScoreList = []
        let neutralScoreList = []
        let happyScoreList = []
        let sadScoreList = []
        let angryScoreList = []
        let fearScoreList = []
        let disgustScoreList = []
        let surpriseScoreList = []

        let range_max = new Date(Date.UTC(70, 1, 1, 0, 0, 0));
        let range_min = new Date();
       
        if ("emotions" in faceEmotions && faceEmotions.emotions.length != 0) {


            // range_max = new Date(faceEmotions.emotions[0].timestamp);
            // range_min = new Date(faceEmotions.emotions[faceEmotions.emotions.length - 1].timestamp);

            for (let i = 0; i < faceEmotions.emotions.length; i++) {

                let timestamp = new Date(faceEmotions.emotions[i].timestamp);

                if (timestamp.getTime() > range_max.getTime()) {
                    range_max = new Date(faceEmotions.emotions[i].timestamp)
                } else {
                    if (timestamp.getTime() < range_min.getTime()) {
                        range_min = new Date(faceEmotions.emotions[i].timestamp)
                    }
                }

                let emotionScore = {}
                let neutralScore = {}
                let happyScore = {}
                let sadScore = {}
                let angryScore = {}
                let fearScore = {}
                let disgustScore = {}
                let surpriseScore = {}

                emotionScore.x = faceEmotions.emotions[i].timestamp
                emotionScore.y = (1 - faceEmotions.emotions[i].neutral) * 100
                emotionScoreList.push(emotionScore);

                neutralScore.x = faceEmotions.emotions[i].timestamp
                neutralScore.y = faceEmotions.emotions[i].neutral * 100
                neutralScoreList.push(neutralScore);

                happyScore.x = faceEmotions.emotions[i].timestamp
                happyScore.y = faceEmotions.emotions[i].happy * 100
                happyScoreList.push(happyScore);

                sadScore.x = faceEmotions.emotions[i].timestamp
                sadScore.y = faceEmotions.emotions[i].sad * 100
                sadScoreList.push(sadScore);

                angryScore.x = faceEmotions.emotions[i].timestamp
                angryScore.y = faceEmotions.emotions[i].angry * 100
                angryScoreList.push(angryScore);

                fearScore.x = faceEmotions.emotions[i].timestamp
                fearScore.y = faceEmotions.emotions[i].fear * 100
                fearScoreList.push(fearScore);

                disgustScore.x = faceEmotions.emotions[i].timestamp
                disgustScore.y = faceEmotions.emotions[i].disgust * 100
                disgustScoreList.push(disgustScore);

                surpriseScore.x = faceEmotions.emotions[i].timestamp
                surpriseScore.y = faceEmotions.emotions[i].surprise * 100
                surpriseScoreList.push(surpriseScore);



            };

            emotionDataset.data = emotionScoreList;
            neutralDataset.data = neutralScoreList;
            happyDataset.data = happyScoreList;
            sadDataset.data = sadScoreList;
            angryDataset.data = angryScoreList;
            fearDataset.data = fearScoreList;
            disgustDataset.data = disgustScoreList;
            surpriseDataset.data = surpriseScoreList;

            data = { datasets: [emotionDataset, neutralDataset, happyDataset, sadDataset, angryDataset, fearDataset, disgustDataset, surpriseDataset] }
            console.log(data);

            console.log(range_max);
            console.log(range_min);

            range_max = range_max.getFullYear()
                + '-' + ('0' + (range_max.getMonth() + 1)).slice(-2)
                + '-' + ('0' + range_max.getDate()).slice(-2)
                + ' ' + ('0' + range_max.getHours()).slice(-2)
                + ':' + ('0' + range_max.getMinutes()).slice(-2)
                + ':' + ('0' + range_max.getSeconds()).slice(-2);

            range_min = range_min.getFullYear()
                + '-' + ('0' + (range_min.getMonth() + 1)).slice(-2)
                + '-' + ('0' + range_min.getDate()).slice(-2)
                + ' ' + ('0' + range_min.getHours()).slice(-2)
                + ':' + ('0' + range_min.getMinutes()).slice(-2)
                + ':' + ('0' + range_min.getSeconds()).slice(-2);

            console.log(range_max);
            console.log(range_min);

        }

        return (
            <div>
                <Scatter data={data} width={1200} height={600}
                    options={{
                        scales: {
                            xAxes: [{
                                type: 'time',
                                time: {
                                    parser: 'YYYY-MM-DD HH:mm:ss',
                                    displayFormat: 'MM-DD HH:mm:ss'
                                    
                                },
                                ticks: {
                                    min: range_min,
                                    max: range_max
                                },
                                distribution: "linear",
                            }],
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    max: 100
                                }
                            }]
                        },
                        pan: {
                            enabled: true,
                            mode: 'x',
                            speed: 0.1,
                            rangeMin: {
                                x: range_min,
                            },
                            rangeMax: {
                                x: range_max,
                            },
                        },
                        zoom: {
                            enabled: true,
                            mode: 'x',
                            speed: 0.1,
                            rangeMin: {
                                x: range_min,
                            },
                            rangeMax: {
                                x: range_max,
                            },

                        },
                        onClick: function (evt, element) {
                            if (element.length > 0) {
                                console.log(element);
                                console.log(element[0]._index);
                                const userId = faceEmotions.emotions[element[0]._index].user_id;
                                console.log(userId);
                                const url = "/users/" + userId;
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
        faceEmotionsFetching: state.faceEmotionsReducer.fetching
    };
}


export default connect(mapStateToProps)(EmotionLine);