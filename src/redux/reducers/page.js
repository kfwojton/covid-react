import {
  GET_LAUNCHES_REQUEST,
  GET_LAUNCHES_SUCCESS,
  GET_LAUNCHES_FAIL,
  SET_LAUNCHES,
  FILTER_LAUNCHES
} from '../constants/page'

const initialState = {
  isFetched: false,
  error: null,
  launches: [],
  displayedLaunches: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LAUNCHES_REQUEST:
      return {
        ...state,
        isFetched: true
      }

    case GET_LAUNCHES_SUCCESS:
      return {
        ...state,
        isFetched: false
      }

    case GET_LAUNCHES_FAIL:
      return {
        ...state,
        isFetched: false,
        error: action.payload
      }

    case SET_LAUNCHES:
      return {
        ...state,
        launches: action.payload
      }

    case FILTER_LAUNCHES:
      return {
        ...state,
        displayedLaunches: action.payload
      }

    default:
      return state
  }
}
