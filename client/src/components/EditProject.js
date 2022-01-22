import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditProject extends Component {

    constructor(props) {
        super(props);

        this.onChangeProjectId = this.onChangeProjectId.bind(this);
        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeTeamId = this.onChangeTeamId.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            projectName: '',
            teamId: '',
            deadline: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/projects/' + this.props.match.params.id).then(res => {
            this.setState({
                id: res.data.id,
                projectName: res.data.projectName,
                teamId: res.data.teamId,
                deadline: res.data.deadline
            });
        })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeProjectId(e) {
        this.setState({ id: e.target.value })
    }

    onChangeProjectName(e) {
        this.setState({ projectName: e.target.value })
    }

    onChangeTeamId(e) {
        this.setState({ teamId: e.target.value })
    }

    onChangeDeadline(e) {
        this.setState({ deadline: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const projectObject = {
            id: this.state.id,
            projectName: this.state.projectName,
            teamId: this.state.teamId,
            deadline: this.state.deadline
        };

        axios.put('http://localhost:8080/api/projects/update/' + this.props.match.params.id, projectObject).then((res) => {
            console.log(res.data)
            console.log(`Project updated!`)
        })
            .catch((error) => {
                console.log(error);
            })

        this.props.history.push('/api/projects')
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit.push}>
                <Form.Group controlId="Id">
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="number" value={this.state.id} onChange={this.onChangeProjectId} />
                </Form.Group>

                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={this.state.projectName} onChange={this.onChangeProjectName} />
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
                    Edit Project
                </Button>
            </Form>
        </div>);
    }
}