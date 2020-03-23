import Papa from 'papaparse';

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

    return fetch(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv`)
      .then(response => {

        if (response.ok) {
          return response.text()
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        // var datas = data.replace('/'g, '');
        var datas = data.replace(new RegExp('/', 'g'), '_');
        // datas = datas.replace('/', '');
        var parsedJson = Papa.parse(datas , { header : true, transformHeader:true,
        });


        let ip = fetch('https://api6.ipify.org?format=json')
          .then(res => res.json())
          .then(json => {

             // = json.ap
            return ({text: json.ip});
          });

        console.log(ip);
        console.log(ip);
        parsedJson['ip'] = ip;
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

    if (state.isUSOnly) {

      displayedLaunches = displayedLaunches.filter(launch => {
        console.log(launch.Province_State)
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
        return launch.Province_State.toLowerCase().includes(state.searchQuery.toLowerCase())
      })
    }

    dispatch({
      type: FILTER_LAUNCHES,
      payload: displayedLaunches
    })
  }
}
