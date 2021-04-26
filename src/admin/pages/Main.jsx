import React, { Component } from 'react';
import TableEx from '../contents/TableEx';
//import CircleChart from '../content/CircleChart';

class Main extends Component {
    render() {
        return (
            <div>
                {/*<CircleChart/>*/}
                관리자 메인
                <TableEx/>
            </div>
        );
    }
}

export default Main;