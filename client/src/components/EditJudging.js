import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditJudging extends Component {

    constructor(props) {
        super(props);

        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeProjectId = this.onChangeProjectId.bind(this);
        this.onChangeGrade = this.onChangeGrade.bind(this);
        this.onChangeStudentId = this.onChangeStudentId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            projectId: '',
            grade: '',
            studentId: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/judgings/' + this.props.match.params.id).then(res => {
            this.setState({
                id: res.data.id,
                projectId: res.data.projectId,
                grade: res.data.grade,
                studentId: res.data.studentId
            });
        })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeId(e) {
        this.setState({ id: e.target.value })
    }

    onChangeProjectId(e) {
        this.setState({ projectId: e.target.value })
    }

    onChangeGrade(e) {
        this.setState({ grade: e.target.value })
    }

    onChangeStudentId(e) {
        this.setState({ studentId: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const judgingObject = {
            id: this.state.id,
            projectId: this.state.projectId,
            grade: this.state.grade,
            studentId: this.state.studentId
        };

        axios.patch('http://localhost:8080/api/judgings/update/' + this.props.match.params.id, judgingObject).then((res) => {
            console.log(res.data)
            console.log(`Project updated!`)
        })
            .catch((error) => {
                console.log(error);
            })

        this.props.history.push('/api/judgings')
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Id">
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="number" value={this.state.id} onChange={this.onChangeId} />
                </Form.Group>

                <Form.Group controlId="Project Id">
                    <Form.Label>Project Id</Form.Label>
                    <Form.Control type="text" value={this.state.projectId} onChange={this.onChangeProjectId} />
                </Form.Group>

                <Form.Group controlId="Grade">
                    <Form.Label>Grade</Form.Label>
                    <Form.Control type="number" value={this.state.grade} onChange={this.onChangeGrade} />
                </Form.Group>

                <Form.Group controlId="Student Id">
                    <Form.Label>Student Id</Form.Label>
                    <Form.Control type="number" value={this.state.studentId} onChange={this.onChangeStudentId} />
                </Form.Group>

                <Button variant="primary" size="lg" block="block" type="submit" className="mt-4">
                    Edit Judging
                </Button>
            </Form>
        </div>);
    }
}