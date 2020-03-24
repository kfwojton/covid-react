import React, { PureComponent } from 'react'
import linkImage from '../assets/images/link.svg';
import moment from 'moment'
import _ from 'lodash';
class Launch extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {

    const { launch } = this.props
    // var activeCases = launch.length
    // console.log("karen");
    // console.log(activeCases);

    var arrayCases = _.flatMap(launch)

    var activeCases = arrayCases[arrayCases.length-1]
    var yesterdaysCases = arrayCases[arrayCases.length-2]
    var newCases = activeCases - yesterdaysCases

    var percentDiff = parseInt(newCases/yesterdaysCases * 100) + '%'
    var countyName = launch['County Name']
  

    // var test = _.find(launch,_.size(launch))
    // jsonData.seats[jsonData.seats.length-1].countryid
    const launchDate = moment(launch.launch_date_utc).format('MMMM Do YYYY, h:mm a');
    return (

      <tr className="table_row">
        <th> {launch.State}</th>
        <th> {launch['County Name']}</th>
        <th> {activeCases}</th>
        <th> {newCases}</th>
        <th> {percentDiff}</th>


      </tr>


    )
  }
}

export default Launch
