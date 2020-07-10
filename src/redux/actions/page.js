import Papa from 'papaparse'
import _ from 'lodash'

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

    return fetch(
      `https://usafactsstatic.blob.core.windows.net/public/data/covid-19/covid_confirmed_usafacts.csv`
    )
      .then(response => {
        if (response.ok) {
          return response.text()
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        var datas = data.replace(new RegExp('/', 'g'), '_')

        var parsedJson = Papa.parse(datas, {
          header: true,
          transformHeader: true
        })

        var allUSA = {
          'County Name': 'USA',
          State: 'All'
        }
        var dates = _.flatMap(_.keys(parsedJson.data[0])).slice(-130)
        console.log(dates)
        _.forEach(dates, date => {
          allUSA[date] = _.sum(
            parsedJson.data.map(item => {
              if (_.isNaN(parseInt(item[date]))) {
                return 0
              } else {
                return parseInt(item[date])
              }
            })
          )
        })

        parsedJson.data.push(allUSA)

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
  searchQuery: ''
}

export function filterLaunches(state = baseQueryState) {
  return (dispatch, getState) => {
    let displayedLaunches = getState().page.launches

    displayedLaunches = displayedLaunches.filter(launch =>
      _.has(launch, 'County Name')
    )

    var lastEntry = displayedLaunches[displayedLaunches.length - 1]
    var lastKey = _.findLastKey(lastEntry)

    displayedLaunches = _.reverse(
      _.sortBy(displayedLaunches, [object => parseInt(object[lastKey])])
    )
    // displayedLaunches = _.sortBy(displayedLaunchs, [function(o) { return o.user; }]
    if (state.isUSOnly) {
      displayedLaunches = displayedLaunches.filter(launch => {
        return launch.Province_State.toLowerCase().includes('us')
      })
    }

    if (state.searchQuery) {
      displayedLaunches = displayedLaunches.filter(launch => {
        if (launch['County Name']) {
          return launch['County Name']
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase())
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
