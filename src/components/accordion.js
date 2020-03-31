import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';


class ParentComponent extends PureComponent {
    constructor() {
        super();

        this.state = {
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

        var activeCases = parseInt(arrayCases[arrayCases.length-1])

        var yesterdaysCases = arrayCases[arrayCases.length-2]
        var newCases = activeCases - yesterdaysCases

        var percentDiff = parseInt(newCases/yesterdaysCases * 100) + '%'



        const clickCallback = () => this.handleRowClick(index);
        const itemRows = [
        			<tr onClick={clickCallback} key={"row-data-" + index}>
        			    <td>{item.State}</td>
                  <th> {item['County Name']}</th>
                  <th> {activeCases.toLocaleString()}</th>
                  <th> {newCases.toLocaleString()}</th>
                  <th> {percentDiff}</th>
        			</tr>
        ];

        let keysFlat = _.keys(item ).slice(-15);

        let itemsFlat = _.values(item).slice(-15)
        var dailyDiff = itemsFlat.map((rank, i, arr) => {
                              return (arr[i] - arr[i-1])
                      });

        let datab = {
          labels: keysFlat,
          datasets: [{
            label: 'Total Cases in ' + item['County Name'] + '/' + item['State'],
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: itemsFlat,
            fill: false,
            type: 'line'
          },
          {
            label: 'New Cases in ' + item['County Name'] + '/' + item['State'],
            backgroundColor: 'rgb(2, 99, 132)',
            borderColor: 'rgb(2, 99, 132)',
            data: dailyDiff,
            fill: true,
            borderDash: [],
            type: 'line'
          },


        ]
    }



        if(this.state.expandedRows.includes(index)) {
            itemRows.push(
                <tr key={"row-expanded-" + index}>


                   <td colSpan="5">

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


        launches.map((item, index) => {

          if (_.has(item,"")) {
            delete item[""]
          }
          const perItemRows = this.renderItem(item,index);
          allItemRows = allItemRows.concat(perItemRows);
        });

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
