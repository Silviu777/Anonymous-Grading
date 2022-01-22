import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class JudgingsTable extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.obj.id}</td>
                <td>{this.props.obj.projectId}</td>
                <td>{this.props.obj.grade}</td>
                <td>{this.props.obj.studentId}</td>
                <td>
                    <Link className="edit-link" to={"/api/judgings/" + this.props.obj.id}>
                        Edit
                    </Link>
                </td>
            </tr>
        );
    }
}