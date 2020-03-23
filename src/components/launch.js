import React, { PureComponent } from 'react'
import linkImage from '../assets/images/link.svg';
import moment from 'moment'

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
    const launchDate = moment(launch.launch_date_utc).format('MMMM Do YYYY, h:mm a');
    return (

      <tr className="table_row">
        <th>n/a</th>
        <th>{launch.mission_name}</th>
        <th>{launch.rocket.rocket_name}</th>
        <th>{launch.rocket.rocket_type}</th>
        <th>{launchDate}</th>
        <th>{launch.details}</th>
        <th>{launch.flight_number}</th>
        <th><a href={launch.links.article_link}><img src={linkImage} className="link_icon" alt="link"/></a>
        </th>
      </tr>


    )
  }
}

export default Launch
