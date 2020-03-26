import React, { PureComponent } from 'react';
import { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Table, Col, Row, Container } from 'reactstrap';
import linkImage from '../assets/images/link.svg';
import moment from 'moment'
import _ from 'lodash';
import {Bar , Line} from 'react-chartjs-2';

class ParentComponent extends PureComponent {
    constructor() {
        super();

        this.state = {
            data : [
                {id : 1, date : "2014-04-18", total : 121.0, status : "Shipped", name : "A", points: 5, percent : 50},
                {id : 2, date : "2014-04-21", total : 121.0, status : "Not Shipped", name : "B", points: 10, percent: 60},
                {id : 3, date : "2014-08-09", total : 121.0, status : "Not Shipped", name : "C", points: 15, percent: 70},
                {id : 4, date : "2014-04-24", total : 121.0, status : "Shipped", name : "D", points: 20, percent : 80},
                {id : 5, date : "2014-04-26", total : 121.0, status : "Shipped", name : "E", points: 25, percent : 90},
            ],
            expandedRows : []
        };
    }

    handleRowClick(rowId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
			currentExpandedRows.filter(id => id !== rowId) :
			currentExpandedRows.concat(rowId);

        this.setState({expandedRows : newExpandedRows});
    }

    renderItem(item,index) {

        var arrayCases = _.flatMap(item)


        var activeCases = arrayCases[arrayCases.length-1]

        var yesterdaysCases = arrayCases[arrayCases.length-2]
        var newCases = activeCases - yesterdaysCases

        var percentDiff = parseInt(newCases/yesterdaysCases * 100) + '%'
        var countyName = item['County Name']


        const clickCallback = () => this.handleRowClick(index);
        const itemRows = [
        			<tr onClick={clickCallback} key={"row-data-" + index}>
        			    <td>{item.State}</td>
                  <th> {item['County Name']}</th>
                  <th> {activeCases}</th>
                  <th> {newCases}</th>
                  <th> {percentDiff}</th>
        			</tr>
        ];

        let keysFlat = _.keys(item ).slice(-15);

        let itemsFlat = _.values(item).slice(-15)

        let datab = {
        labels: keysFlat,
        datasets: [{
        label: 'Cases in ' + item['County Name'] + '/' + item['State'],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: itemsFlat,
        fill: false
        }]
    }

        if(this.state.expandedRows.includes(index)) {
            itemRows.push(
                <tr key={"row-expanded-" + index}>


                   <td colspan="5">

                     < Line data={datab} />
                   </td>
                </tr>
            );
        }

        return itemRows;
    }

    render() {
        const { launches } = this.props
        let allItemRows = [];
        // let allItemRows = this.renderItem(launch)


        launches.map((item, index) => {
          console.log("kevin");
          if (_.has(item,"")) {
            delete item[""]
          }
          const perItemRows = this.renderItem(item,index);
          allItemRows = allItemRows.concat(perItemRows);
        });

        // launches.forEach(item => {
        //     const perItemRows = this.renderItem(item);
        //     allItemRows = allItemRows.concat(perItemRows);
        // });



        // const launchDate = moment(launch.launch_date_utc).format('MMMM Do YYYY, h:mm a');

        return (
          <Table className="main_table" hover>
          <thead>
            <tr>
                  <th>State</th>
                  <th>County</th>
                  <th>Active Cases</th>

                  <th>New Cases yesterday</th>
                  <th>Day on Day Change</th>
            </tr>
            </thead>
            <tbody>


           {allItemRows}
           </tbody>

           </Table>
        );
    }
}

export default ParentComponent
