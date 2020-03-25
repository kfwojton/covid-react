import Papa from 'papaparse';
import _ from 'lodash';

import {
  GET_LAUNCHES_REQUEST,
  GET_LAUNCHES_SUCCESS,
  GET_LAUNCHES_FAIL,
  SET_LAUNCHES,
  FILTER_LAUNCHES
} from '../constants/page'

function setLaunches(data) {

  const launches = data.data.map(launches => {
    return launches
  })

  return {
    type: SET_LAUNCHES,
    payload: launches
  }
}

  export function getLaunches() {
  return dispatch => {
    dispatch({
      type: GET_LAUNCHES_REQUEST
    })

    // return fetch(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv`)
    return fetch(`https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv`)
      .then(response => {

        if (response.ok) {
          return response.text()
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {

        var datas = data.replace(new RegExp('/', 'g'), '_');

        var parsedJson = Papa.parse(datas , { header : true, transformHeader:true,
        });


        let ip = fetch('https://api6.ipify.org?format=json')
          .then(res => res.json())
          .then(json => {


            return ({text: json.ip});
          });

        console.log(ip);
        console.log(ip);
        parsedJson['ip'] = ip;
        // parsedJson = _.filter(parsedJson, [launch => {
        //   if (launch.has('County Name')) {
        //     return true
        //   } else {
        //     return false
        //   }} ]
        //   );
        // parsedJson = _.sortBy(parsedJson, [item => item[item.length-1]])
        // parsedJson = _.sortBy(parsedJson, 'County Name')

        dispatch({
          type: GET_LAUNCHES_SUCCESS
        })

        dispatch(setLaunches(parsedJson))
        dispatch(filterLaunches())
      })
      .catch(error => {
        dispatch({
          type: GET_LAUNCHES_FAIL,
          payload: error.message
        })
      })
  }
}

const baseQueryState = {
  isLaunchSuccess: null,
  isUSOnly: null,
  isWithReddit: null,
  searchQuery: '',
}

export function filterLaunches(state = baseQueryState) {
  return (dispatch, getState) => {

    let displayedLaunches = getState().page.launches;

    displayedLaunches = displayedLaunches.filter(launch =>_.has(launch,'County Name') );

    var lastEntry = displayedLaunches[displayedLaunches.length-1]
    var lastKey = _.findLastKey(lastEntry)

    displayedLaunches = _.reverse(_.sortBy( displayedLaunches, [object => parseInt(object[lastKey])]));
    // displayedLaunches = _.sortBy(displayedLaunchs, [function(o) { return o.user; }]
    if (state.isUSOnly) {

      displayedLaunches = displayedLaunches.filter(launch => {
        return launch.Province_State.toLowerCase().includes("us")
      })
    }

    // if (state.isLaunchSuccess) {
    //   displayedLaunches = displayedLaunches.filter(launch => launch.launch_success === true);
    // }
    // if (state.isWithReddit) {
    //   displayedLaunches = displayedLaunches.filter(launch => launch.links.reddit_campaign || launch.links.reddit_launch || launch.links.reddit_media || launch.links.reddit_recovery);
    //   }
    if (state.searchQuery) {
      displayedLaunches = displayedLaunches.filter(launch => {
        if (launch['County Name'] ) {

        return launch['County Name'].toLowerCase().includes(state.searchQuery.toLowerCase())
      } else {
        return false

      }
      })
    }

    dispatch({
      type: FILTER_LAUNCHES,
      payload: displayedLaunches
    })
  }
}
