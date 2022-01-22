import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateProject extends Component {

    constructor(props) {
        super(props)

        this.onChangeProjectId = this.onChangeProjectId.bind(this);
        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeTeamId = this.onChangeTeamId.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            name: '',
            teamId: '',
            deadline: ''
        }
    }

    onChangeProjectId(e) {
        this.setState({ id: e.target.value })
    }

    onChangeProjectName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeTeamId(e) {
        this.setState({ teamId: e.target.value })
    }

    onChangeDeadline(e) {
        this.setState({ deadline: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const projectObject = {
            id: this.state.id,
            name: this.state.name,
            teamId: this.state.teamId,
            deadline: this.state.deadline
        };
        axios.post('http://localhost:8080/api/projects/addProject', projectObject)
            .then(res => console.log(res.data));

        this.setState({ id: '', name: '', teamId: '', deadline: '' })
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="ProjectId">
                    <Form.Label>Project Id</Form.Label>
                    <Form.Control type="number" value={this.state.id} onChange={this.onChangeProjectId} />
                </Form.Group>

                <Form.Group controlId="Name">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={this.onChangeProjectName} />
                </Form.Group>

                <Form.Group controlId="TeamId">
                    <Form.Label>Team Id</Form.Label>
                    <Form.Control type="number" value={this.state.teamId} onChange={this.onChangeTeamId} />
                </Form.Group>

                <Form.Group controlId="Deadline">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control type="date" value={this.state.deadline} onChange={this.onChangeDeadline} />
                </Form.Group>


                <Button variant="primary" size="lg" block="block" type="submit" className="mt-4">
                    Add Project
        </Button>
            </Form>
        </div>);
    }
}