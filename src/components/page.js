import React, { Component } from 'react'
import Launch from '../components/launch'
import ParentComponent from '../components/accordion'
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

          <ParentComponent key={index} launch={launch}/>
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
              <div style={{color: "white", marginBottom:"20px", textAlign:"left"}}>
              Why another COVID data table? We that found that there wasn't a good, easy to understand data source where you can quickly access what is happening in your county. Thus the Flux COVID reporting tools was created! This data may be a day or two delayed from local countys. What is Flux? Flux is a technology makerspace in Cleveland, Ohio. Find out more at www.fluxmakerspace.com.
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

                    Last updated { today }


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
