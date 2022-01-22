import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateJudging extends Component {

    constructor(props) {
        super(props)

        this.onChangeJudgingId = this.onChangeJudgingId.bind(this);
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

    onChangeJudgingId(e) {
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
        e.preventDefault()

        const judgingObject = {
            id: this.state.id,
            projectId: this.state.projectId,
            grade: this.state.grade,
            studentId: this.state.studentId
        };
        axios.post('http://localhost:8080/api/judgings/addJudging', judgingObject)
            .then(res => console.log(res.data));

        this.setState({ id: '', projectId: '', grade: '', studentId: '' })
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="JudgingId">
                    <Form.Label>Judging Id</Form.Label>
                    <Form.Control type="number" value={this.state.id} onChange={this.onChangeJudgingId} />
                </Form.Group>

                <Form.Group controlId="ProjectId">
                    <Form.Label>Project Id</Form.Label>
                    <Form.Control type="number" value={this.state.projectId} onChange={this.onChangeProjectId} />
                </Form.Group>

                <Form.Group controlId="Grade">
                    <Form.Label>Grade</Form.Label>
                    <Form.Control type="number" value={this.state.grade} onChange={this.onChangeGrade} />
                </Form.Group>

                <Form.Group controlId="StudentId">
                    <Form.Label>Student Id</Form.Label>
                    <Form.Control type="number" value={this.state.studentId} onChange={this.onChangeStudentId} />
                </Form.Group>

                <Button variant="primary" size="lg" block="block" type="submit" className="mt-4">Add Judging</Button>
            </Form>
        </div>);
    }
}