import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import JudgingTable from './JudgingsTable';


export default class JudgingList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            judgings: []
        };
    }
    componentDidMount() {
        axios.get('http://localhost:8080/api/judgings/')
            .then(res => {
                this.setState({
                    judgings: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    DataTable() {
        return this.state.judgings.map((res, i) => {
            return <JudgingTable obj={res} key={i} />;
        });
    }

    render() {
        return (<div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th class="text-center">Id</th>
                        <th class="text-center">Project Id</th>
                        <th class="text-center">Grade</th>
                        <th class="text-center">Student Id</th>
                    </tr>
                </thead>
                <tbody>
                    {this.DataTable()}
                </tbody>
            </Table>
        </div>);
    }
}