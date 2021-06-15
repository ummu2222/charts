import React ,{useEffect , useState} from 'react';
import { Scatter } from 'react-chartjs-2';
import * as zoom from 'chartjs-plugin-zoom'
import { connect , useDispatch } from "react-redux";
import { fetchFaceEmotions } from "../../../actions/FaceEmotion/faceEmotionsActions";

let valenceDataset = {
    label: 'valence',
    borderColor: '#da6160',
    pointBackgroundColor: '#da6160',
    backgroundColor: "transparent",
    showLines: "false",
    borderWidth: "2",
    lineTension: "0",
    data: [],
};

let data = { datasets: [valenceDataset] }



const ValenceLinePerUser =(props) => {

    const dispatch = useDispatch();
    // componentDidMount() {
    //     this.props.dispatch(fetchFaceEmotions());
    // }



        //console.log(this.props);
        //s1.data = this.props.faceEmotions;
        const { faceEmotions, userId } = props;

        let valenceScoreList = []

        let range_max = new Date();
        let range_min = new Date();

        if ("emotions" in faceEmotions && faceEmotions.emotions.length != 0) {

            range_max = new Date(faceEmotions.emotions[0].timestamp);
            range_min = new Date(faceEmotions.emotions[faceEmotions.emotions.length - 1].timestamp);

            //console.log(faceEmotions.emotions);
            //console.log("aaaa");
            for (let i = 0; i < faceEmotions.emotions.length; i++) {

                const userIdInEmotions =  faceEmotions.emotions[i].user_id;
				
				if(userIdInEmotions != userId){
					continue;
				}

                let valenceScore = {}

                valenceScore.x = faceEmotions.emotions[i].timestamp
                valenceScore.y = faceEmotions.emotions[i].happy - (faceEmotions.emotions[i].angry + faceEmotions.emotions[i].fear + faceEmotions.emotions[i].disgust + faceEmotions.emotions[i].sad)
                valenceScoreList.push(valenceScore);

            };

            valenceDataset.data = valenceScoreList;

            data = { datasets: [valenceDataset] }
            console.log(data);

        }

        return (
            <div>
                <Scatter data={data} width={1200} height={400}
                    options={{
                        scales: {
                            xAxes: [{
                                type: 'time'
                            }],
                            yAxes: [{
                                ticks: {
                                    min: -1,
                                    max: 1
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
        faceEmotionsFetching: state.faceEmotionsReducer.fetching
    };
}

export default connect(mapStateToProps)(ValenceLinePerUser);

