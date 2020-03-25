import React, { PureComponent } from 'react';
import { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

import linkImage from '../assets/images/link.svg';
import moment from 'moment'
import _ from 'lodash';
class Launch extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);

  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  toggle(event) {
    console.log("hit toggle");
    console.log(event);
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


    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);
    // var test = _.find(launch,_.size(launch))
    // jsonData.seats[jsonData.seats.length-1].countryid
    const launchDate = moment(launch.launch_date_utc).format('MMMM Do YYYY, h:mm a');
    return (

      <tr className="table_row" onClick={this.toggle}>
        <th> {launch.State}</th>
        <th> {launch['County Name']}</th>
        <th> {activeCases}</th>
        <th> {newCases}</th>
        <th> {percentDiff}</th>

      </tr>
      





//       <Collapse isOpen={true}>
//       <Card>
//       <CardBody>
//       Anim pariatur cliche reprehenderit,
//       enim eiusmod high life accusamus terry richardson ad squid. Nihil
//       anim keffiyeh helvetica, craft beer labore wes anderson cred
//       nesciunt sapiente ea proident.
//       </CardBody>
//       </Card>
//       </Collapse>
//
// \     </div>



    )
  }
}

export default Launch
