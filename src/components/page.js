import React, { Component } from 'react'
import Launch from '../components/launch'
import Search from '../components/search'
import { Table, Col, Row, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import refresh from '../assets/images/refresh.svg';

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
        a graphical approach of COVID-19
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
                     <th></th>
                     <th>
                       <input
                          name="isUSOnly"
                          type="checkbox"
                          checked={this.state.isUSOnly}
                          onChange={this.handleCheckBoxes} />
                          <span className="white_text small_padding_left"> US Only </span>
                     </th>
                     <th>
                       <input
                          name="sortByPercentDiff"
                          type="checkbox"
                          checked={this.state.sortByPercentDiff}
                          onChange={this.handleCheckBoxes} />
                          <span className="white_text small_padding_left">Sort by biggest % diff </span>
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
