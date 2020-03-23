import { connect } from 'react-redux'
import * as pageActions from '../redux/actions/page'
import Page from '../components/page'

function mapStateToProps(state) {
  const { displayedLaunches, isFetched, error } = state.page

  return {
    displayedLaunches,
    isFetched,
    error
  }
}

const mapDispatchToProps = {
  getLaunches: pageActions.getLaunches,
  filterLaunches: pageActions.filterLaunches
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
