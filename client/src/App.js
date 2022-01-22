import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import JudgingComponent from './components/JudgingComponent'
import ProjectComponent from './components/ProjectComponent'
import EditProject from './components/EditProject'
import ProjectList from './components/ProjectsList'
import StudentList from './components/StudentsList'
import JudgingList from './components/JudgingsList'
import EditJudging from './components/EditJudging'



function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={'/api'} className="nav-link">
                  Anonymous Grading
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={'/api/judgings/addJudging'} className="nav-link">
                    Add Judging
                  </Link>
                </Nav>
                <Nav>
                  <Link to={'/api/judgings'} className="nav-link">
                    Judging List
                  </Link>
                </Nav>
                <Nav>
                  <Link to={'/api/projects/addProject'} className="nav-link">
                    Add Project
                  </Link>
                </Nav>
                <Nav>
                  <Link to={'/api/projects'} className="nav-link">
                    Project List
                  </Link>
                </Nav>
                <Nav>
                  <Link to={'/api/students'} className="nav-link">
                    Student List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>

            <div className='home'>
              <h1>Welcome to Anonymous Grading</h1>
              <p>Choose an option from above in order to get started</p>
            </div>

            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route
                    exact
                    path="/api/judgings"
                    component={(props) => <JudgingList {...props} />}
                  />
                  <Route
                    exact
                    path="/api/judgings/addJudging"
                    component={(props) => <JudgingComponent {...props} />}
                  />
                  <Route
                    exact
                    path="/api/judgings/:id"
                    component={(props) => <EditJudging {...props} />}
                  />
                  <Route
                    exact
                    path="/api/projects/addProject"
                    component={(props) => <ProjectComponent {...props} />}
                  />
                  <Route
                    exact
                    path="/api/projects/:id"
                    component={(props) => <EditProject {...props} />}
                  />
                  <Route
                    exact
                    path="/api/projects"
                    component={(props) => <ProjectList {...props} />}
                  />
                  <Route
                    exact
                    path="/api/students"
                    component={(props) => <StudentList {...props} />}
                  />

                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  )
}

export default App