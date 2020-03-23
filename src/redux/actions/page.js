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
        var parsedJson = Papa.parse(data , { header : true, transformHeader:true});
        dispatch({
          type: GET_LAUNCHES_SUCCESS
        })
        dispatch(setLaunches(parsedJson))
        // dispatch(filterLaunches())
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
  isReused: null,
  isWithReddit: null,
  searchQuery: '',
}

export function filterLaunches(state = baseQueryState) {
  return (dispatch, getState) => {

    let displayedLaunches = getState().page.launches;

    // if (state.isReused) {
    //   // TODO: This can be optimized, but given the current use case there isn't too much reason to spend a ton of time optimizing this
    //   displayedLaunches = displayedLaunches.filter(launch => {
    //     if (launch.rocket.fairings === null) {
    //       return false
    //     } else if (launch.rocket.fairings.reused) {
    //       return true
    //     }
    //
    //     let first_stage = launch.rocket.first_stage.cores.map(core => core.reused);
    //     if (first_stage.indexOf(true)) {
    //       return true
    //     }
    //
    //     let second_stage = launch.rocket.second_stage.payloads.map(payload => payload.reused);
    //     if (second_stage.indexOf(true)) {
    //       return true
    //     }
    //
    //     return false
    //   })
    // }
    // if (state.isLaunchSuccess) {
    //   displayedLaunches = displayedLaunches.filter(launch => launch.launch_success === true);
    // }
    // if (state.isWithReddit) {
    //   displayedLaunches = displayedLaunches.filter(launch => launch.links.reddit_campaign || launch.links.reddit_launch || launch.links.reddit_media || launch.links.reddit_recovery);
    //   }
    // if (state.searchQuery) {
    //   displayedLaunches = displayedLaunches.filter(launch => {
    //     return launch.mission_name.toLowerCase().includes(state.searchQuery.toLowerCase())
    //   })
    // }

    dispatch({
      type: FILTER_LAUNCHES,
      payload: displayedLaunches
    })
  }
}
