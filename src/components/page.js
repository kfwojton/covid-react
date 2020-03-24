import React, { Component } from 'react'
import Launch from '../components/launch'
import Search from '../components/search'
import { Table, Col, Row, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import refresh from '../assets/images/refresh.svg';
import _ from 'lodash';
import * as moment from 'moment';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLaunchSuccess: false,
      isUSOnly: false,
      isWithReddit: false,
      searchQuery: '',
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.handleCheckBoxes = this.handleCheckBoxes.bind(this)
  }

  componentDidMount() {
    this.props.getLaunches()
  }

  handleCheckBoxes(event) {
    const value = event.target.checked ;
    this.setState({[event.target.name]: value},() => this.props.filterLaunches(this.state));
  }

  handleSearch(event) {
    this.setState({'searchQuery': event.currentTarget.value}, ()=>this.props.filterLaunches(this.state));
  }

  render() {


    let { displayedLaunches, launches, isFetched, error } = this.props
    let lastEntry = displayedLaunches[displayedLaunches.length-1]
    let today = moment().format("MMM Do YYYY");
    let actualLaunches = displayedLaunches.map((launch, index) => {

      return (
          <Launch key={index} launch={launch}/>
      )
    })

    // let actualLaunches = launches.map((launch, index) => {
    //
    //   return (
    //       <Launch key={index} launch={launch}/>
    //   )
    // })


    return (

      <div className="page">

        {error && <div className="page__error">{error}</div>}
        <div className="white_text page_title">
        US County-level COVID-19 data
        </div>

        {isFetched ? (
          <p className="white_text">Loading...</p>
        ) : (
           <Container>

            <Row>


            <Col md="1"> < /Col>
              <Col md="10">
              <Table className="filter_bar">
               <tbody>
                 <tr>
                   <th>
                   <button className="button_hide" onClick={this.props.getLaunches}>
                    <img className="refresh_icon" src={refresh} alt="refresh"/>
                   </button>
                   </th>
                     <th>
                       <div className="page__search">
                         <Search onChange={this.handleSearch} />
                       </div>
                     </th>
                     <th style={{color: "white"}}>
                    Last updated { today }


                     </th>
                     <th>


                     </th>


                    </tr>
                </tbody>
              </Table>

                <Table className="main_table" hover>
                   <thead>
                     <tr>
                           <th>Country</th>
                           <th>State</th>
                           <th>Active Cases</th>

                           <th>New Cases yesterday</th>
                           <th>Day on Day Change</th>
                     </tr>
                     </thead>
                     <tbody>

                     {actualLaunches}

                    </tbody>
                </Table>

            </Col>
            <Col md="1"> < /Col>

          </ Row>
          </ Container>

        )}
      </div>
    )
  }
}

export default Page
