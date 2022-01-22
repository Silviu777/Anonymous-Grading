import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ProjectTable from './ProjectsTable';


export default class ProjectList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projects: []
        };
    }
    componentDidMount() {
        axios.get('http://localhost:8080/api/projects/')
            .then(res => {
                this.setState({
                    projects: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    dataTable() {
        return this.state.projects.map((res, i) => {
            return <ProjectTable obj={res} key={i} />;
        });
    }

    render() {
        return (<div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th class="text-center">Id</th>
                        <th class="text-center">Name</th>
                        <th class="text-center">Team Id</th>
                        <th class="text-center">Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {this.dataTable()}
                </tbody>
            </Table>
        </div>);
    }
}