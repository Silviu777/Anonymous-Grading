import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import StudentTable from './StudentsTable';


export default class StudentList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            students: []
        };
    }
    componentDidMount() {
        axios.get('http://localhost:8080/api/students/')
            .then(res => {
                this.setState({
                    students: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    DataTable() {
        return this.state.students.map((res, i) => {
            return <StudentTable obj={res} key={i} />;
        });
    }

    render() {
        return (<div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th class="text-center">Id</th>
                        <th class="text-center">First Name</th>
                        <th class="text-center">Last Name</th>
                        <th class="text-center">Team Id</th>
                    </tr>
                </thead>
                <tbody>
                    {this.DataTable()}
                </tbody>
            </Table>
        </div>);
    }
}