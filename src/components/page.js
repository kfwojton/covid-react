import React, { Component } from 'react'

import ParentComponent from '../components/accordion'
import Search from '../components/search'
import { Table, Col, Row, Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import refresh from '../assets/images/refresh.svg'
import { hotjar } from 'react-hotjar'
import _ from 'lodash'

import * as moment from 'moment'
import ReactGA from 'react-ga'

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLaunchSuccess: false,
      isUSOnly: false,
      isWithReddit: false,
      searchQuery: ''
    }
    // all custom functions need to be binded to the component it self to allow two-way bindings. As you may know javascript/ react doesn't allow information to flow upwards unless you bind functions to the parent component like htis.
    this.handleSearch = this.handleSearch.bind(this)
    this.handleCheckBoxes = this.handleCheckBoxes.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.getCoordinates = this.getCoordinates.bind(this)
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates)
    } else {
      alert(
        'You can still use the search to find information regarding your area'
      )
    }
  }
  getCoordinates(position) {
    // console.log(position.cords.latitude)
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }
  // overwriting the intial component life cycle

  componentDidMount() {
    ReactGA.initialize('UA-52755264-10')
    ReactGA.pageview('/homepage')
    this.props.getLaunches()
    hotjar.initialize(1754738, 6)
  }

  // setting custom component functions
  handleCheckBoxes(event) {
    const value = event.target.checked
    this.setState({ [event.target.name]: value }, () =>
      this.props.filterLaunches(this.state)
    )
  }

  handleSearch(event) {
    this.setState({ searchQuery: event.currentTarget.value }, () =>
      this.props.filterLaunches(this.state)
    )
  }

  render() {
    let { displayedLaunches, isFetched, error } = this.props
    let lastEntry = displayedLaunches[displayedLaunches.length - 1]
    let today = moment().format('MMM Do YYYY')
    displayedLaunches = _.filter(displayedLaunches, launch => {
      if (launch['County Name'] === 'Weston County') {
        return false
      } else {
        return true
      }
    })
    // This is a great example of the equivelent statement in django of Item.objects.all().exclude(county_name  "Weston County"). Don't you love how verbose js is when compared to python.
    let actualLaunches = displayedLaunches.map((launch, index) => {
      return <ParentComponent key={index} launch={launch} />
      // These variables are called props, or properties, which means passing specific information to a component to manage from a parent component. Props are different than a redux state
    })

    return (
      <div className="page">
        {error && <div className="page__error">{error}</div>}
        <div className="white_text page_title">
          US County Level COVID-19 data
        </div>
        // This is all jsx, aka reacts version of html. The syntax is close but different than standard html, but compiles to standard html. The difference is that you can handle multiple components in real time.
        {isFetched ? (
          <p className="white_text">Loading...</p>
        ) : (
          <Container>
            <Row>
              <Col md="1"> </Col>
              <Col md="10">
                <div
                  style={{
                    color: 'white',
                    marginBottom: '20px',
                    textAlign: 'left'
                  }}
                >
                  <b
                    style={{
                      fontSize: '20px',
                      textDecorationLine: 'underline'
                    }}
                  >
                    {' '}
                    Purpose:{' '}
                  </b>
                  Why another COVID data table? We that found that there wasn't
                  a good, easy to understand data source where you can quickly
                  access what is happening in your county. None we found gave a
                  good sense of over time data. Thus the Flux COVID reporting
                  tools was created! This data may be a day or two delayed from
                  local counties. What is Flux? Flux is a technology makerspace
                  in Cleveland, Ohio. We build high-growth businesses and teach
                  core development skills. Find out more at{' '}
                  <a
                    style={{ color: 'white' }}
                    href="https://www.fluxmakerspace.com"
                  >
                    {' '}
                    www.fluxmakerspace.com{' '}
                  </a>{' '}
                  or contact us at kevin@fluxmakerspace.com .
                </div>

                <div
                  style={{
                    color: 'white',
                    marginBottom: '20px',
                    textAlign: 'left'
                  }}
                >
                  <b
                    style={{
                      fontSize: '20px',
                      textDecorationLine: 'underline'
                    }}
                  >
                    {' '}
                    Data Source:{' '}
                  </b>
                  This data was pulled from US Data sources as a primary source
                  -
                  https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv
                </div>

                <div
                  style={{
                    color: 'white',
                    marginBottom: '20px',
                    textAlign: 'left'
                  }}
                >
                  <span>
                    {' '}
                    <b
                      style={{
                        fontSize: '20px',
                        textDecorationLine: 'underline'
                      }}
                    >
                      {' '}
                      Qualitative Update:{' '}
                    </b>{' '}
                  </span>
                  The US is just starting testing, we expect see numbers to rise
                  drastically as testing is scaled up. The curve everyone is
                  talking about is blue line in the chart. We won't see this
                  decline until mass testing and social distancing adoption take
                  root.
                </div>

                <Container className="filter_bar">
                  <div>
                    <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                      <Col>
                        <button
                          className="button_hide"
                          onClick={this.props.getLaunches}
                        >
                          <img
                            className="refresh_icon"
                            src={refresh}
                            alt="refresh"
                          />
                        </button>
                      </Col>
                      <Col>
                        <div className="page__search">
                          <Search onChange={this.handleSearch} />
                        </div>
                      </Col>

                      <Col style={{ color: 'white' }}>
                        Last updated {today} <br />
                      </Col>

                      <Col xs="12" sm="12" style={{ color: 'white' }}>
                        Click a county below to see the graph over time.
                      </Col>
                    </Row>
                  </div>
                </Container>

                <ParentComponent launches={displayedLaunches} />
                // More props, you can see that {} plays the same role as {{ }} in django.
              </Col>
              <Col md="1"> </Col>
            </Row>
          </Container>
        )}
      </div>
    )
  }
}

export default Page
