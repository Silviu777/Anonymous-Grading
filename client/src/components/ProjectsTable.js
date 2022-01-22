import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class ProjectsTable extends Component {

    constructor(props) {
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
    }

    deleteProject() {
        axios.delete('http://localhost:8080/api/projects/delete/' + this.props.obj.id)
            .then((res) => {
            }).catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.id}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.teamId}</td>
                <td>{this.props.obj.deadline}</td>
                <td>
                    <Link className="edit-link" to={"/api/projects/" + this.props.obj.id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteProject} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}