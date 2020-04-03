import React, { Component } from 'react'

import ParentComponent from '../components/accordion'
import Search from '../components/search'
import { Table, Col, Row, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import refresh from '../assets/images/refresh.svg';
import { hotjar } from 'react-hotjar';
import _ from 'lodash';

import * as moment from 'moment';
import ReactGA from 'react-ga';

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
    ReactGA.initialize('UA-52755264-10');
    ReactGA.pageview('/homepage');
    this.props.getLaunches();
    hotjar.initialize(1754738, 6);
  }

  handleCheckBoxes(event) {
    const value = event.target.checked ;
    this.setState({[event.target.name]: value},() => this.props.filterLaunches(this.state));
  }

  handleSearch(event) {
    this.setState({'searchQuery': event.currentTarget.value}, ()=>this.props.filterLaunches(this.state));
  }

  render() {


    let { displayedLaunches, isFetched, error } = this.props
    let lastEntry = displayedLaunches[displayedLaunches.length-1]
    let today = moment().format("MMM Do YYYY");
    displayedLaunches = _.filter(displayedLaunches, launch => {
      if (launch['County Name'] === 'Weston County') {

        return false
      } else {

        return true

      }

    } )
    let actualLaunches = displayedLaunches.map((launch, index) => {

      return (

          <ParentComponent key={index} launch={launch}/>
      )
    })



    return (

      <div className="page">

        {error && <div className="page__error">{error}</div>}
        <div className="white_text page_title">
        US County Level COVID-19 data
        </div>



        {isFetched ? (
          <p className="white_text">Loading...</p>
        ) : (
           <Container>


            <Row>


            <Col md="1"> < /Col>
              <Col md="10">
              <div style={{color: "white", marginBottom:"20px", textAlign:"left"}}>
               <b style={{fontSize:"20px",textDecorationLine: "underline"}}> Purpose: </b>Why another COVID data table? We that found that there wasn't a good, easy to understand data source where you can quickly access what is happening in your county. None we found gave a good sense of over time data. Thus the Flux COVID reporting tools was created! This data may be a day or two delayed from local counties. What is Flux? Flux is a technology makerspace in Cleveland, Ohio. We build high-growth businesses and teach core development skills. Find out more at <a style={{color: "white" }} href="https://www.fluxmakerspace.com">  www.fluxmakerspace.com </a> or contact us at kevin@fluxmakerspace.com .
               </div>

              <div style={{color: "white", marginBottom:"20px", textAlign:"left"}}>
               <b style={{fontSize:"20px",textDecorationLine: "underline"}}> Data Source: </b>This data was pulled from US Data sources as a primary source - https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv
              </div>

              <div style={{color: "white", marginBottom:"20px", textAlign:"left"}}>
              <span > <b style={{fontSize:"20px",textDecorationLine: "underline"}}> Qualitative Update: </b>  </span>
              The US is just starting testing, we expect see numbers to rise drastically as testing is scaled up. The curve everyone is talking about is blue line in the chart. We won't see this decline until mass testing and social distancing adoption take root.
              </div>


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

                    Last updated { today } <br />
                    Click a county below to see the graph over time.


                     </th>
                     <th>


                     </th>


                    </tr>
                </tbody>
              </Table>



                         <ParentComponent launches={displayedLaunches}/>


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
