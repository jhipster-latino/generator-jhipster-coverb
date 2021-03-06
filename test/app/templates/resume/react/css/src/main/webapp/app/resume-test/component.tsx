import './style.css';
import './icon-loader';

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'reactstrap';

export class ResumeTest extends Component {
  render() {
    return (
      <div>
        <section id="resume-test">
          <div className="principal container-fluid">
            <Row>
              {/* My personal data*/}
              <Col md="4" className="text-center bg-blue">
                <span id="logo-resume" />
                <h2>Jhipster Generator</h2>
                <h3>
                  <strong>
                    Web developer
                  </strong>
                </h3>
                <hr />
                {/* About me*/}
                <h4>
                  About me
                </h4>
                <hr />
                <p className="text-justify">
                  I'm a fullstack web generator.
                  I can generate, develop and
                  deploy Spring Boot + Angular/React
                  Web applications and Spring microservices.
                  <br />
                  My goal is to generate for you a complete
                  and modern web app or microservice
                  architecture, unifying a high-performance
                  and robust Java stack on server side with
                  Spring Boot and a modern, mobile-first
                  front-end with Angular, React and Bootstrap.
                </p>
                <hr />
                {/* My profile on web*/}
                <h4>
                  RRSS
                </h4>
                <hr />
                <FontAwesomeIcon icon={['fab', 'github']} className="icon" />
                <h5>@jhipster</h5>
                <FontAwesomeIcon icon={['fab', 'twitter']} className="icon" />
                <h5>@java_hipster</h5>
                <FontAwesomeIcon icon={['fab', 'linkedin']} className="icon" />
                <h5>jhipster-generator</h5>
                <hr />
                {/* My contact info*/}
                <h4>
                  Contact
                </h4>
                <hr />
                <FontAwesomeIcon icon="home" className="icon" />
                <h5>Paris, France</h5>
                <FontAwesomeIcon icon="phone" className="icon" />
                <h5>+xx-xxx-xxxxxx</h5>
                <FontAwesomeIcon icon="envelope" className="icon" />
                <h5>contact@jhipster.tech</h5>
              </Col>
              {/* Professional data*/}
              <Col md="8" className="text-center content">
                <hr />
                {/* My formation*/}
                <h1>
                  <FontAwesomeIcon icon="graduation-cap" className="icon" />
                  Formation
                </h1>
                <hr />
                <h3>Full stack developer</h3>
                <p>
                  <em>University, Paris, France</em>
                </p>
                <h3>Master Web design</h3>
                <p>
                  <em>University, Paris, France</em>
                </p>
                <hr />
                {/* My experience*/}
                <h1>
                  <FontAwesomeIcon icon="handshake" className="icon" />
                  Experience
                </h1>
                <hr />
                <h3>Senior Full stack developer</h3>
                <p>
                  <em>Company (2016 - present)</em>
                </p>
                <p>Design, develop and deploy web aplications with Angular and Spring boot.</p>
                <h3>Semi-senior Frontend developer</h3>
                <p>
                  <em>Company (2013 - 2016)</em>
                </p>
                <p>Design, develop and deploy client with Angular</p>
                <h3>Junior Backend developer</h3>
                <p>
                  <em>Company (2011 - 2013)</em>
                </p>
                <p>Design, develop and deploy restfull api with Spring boot</p>
                <hr />
                {/* My habilities */}
                <h1>
                  <FontAwesomeIcon icon="code" className="icon" />
                  Habilities
                </h1>
                <hr />
                <Row>
                  <Col md="12" className="text-center logo-img">
                    <h3>Client Side</h3>
                    <span id="html5" />
                    <span id="css3" />
                    <span id="bootstrap" />
                    <span id="typescript" />
                    <span id="angular" />
                    <span id="react" />
                    <span id="webpack" />
                    <span id="sass" />
                  </Col>
                </Row>
                <Row>
                  <Col md="12" className="text-center logo-img">
                    <h3>Server Side</h3>
                    <span id="spring" />
                    <span id="netflix" />
                    <span id="gradle" />
                    <span id="maven" />
                    <span id="hibernate" />
                    <span id="swagger" />
                    <span id="gatling" />
                    <span id="cucumber" />
                  </Col>
                </Row>
                <Row>
                  <Col md="12" className="text-center logo-img">
                    <h3>CI/CD</h3>
                    <span id="jenkins" />
                    <span id="travis" />
                    <span id="gitlab" />
                    <span id="circleci" />
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="text-center">
                    <hr />
                    {/* My languages */}
                    <h1>
                      <FontAwesomeIcon icon="language" className="icon" />
                      Languages
                    </h1>
                    <hr />
                    <Row>
                      <Col md="6" className="text-center">
                        <h3>English</h3>
                      </Col>
                      <Col md="6" className="text-center">
                        <FontAwesomeIcon icon="keyboard" className="icon" />
                        <FontAwesomeIcon icon="headset" className="icon" />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" className="text-center">
                        <h3>Spanish</h3>
                      </Col>
                      <Col md="6" className="text-center">
                        <FontAwesomeIcon icon="keyboard" className="icon" />
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6" className="text-center">
                    <hr />
                    {/* Hobbies */}
                    <h1>
                      <FontAwesomeIcon icon="grin-beam" className="icon" />
                      Hobbies
                    </h1>
                    <hr />
                    <FontAwesomeIcon icon="baseball-ball" className="icon" />
                    <FontAwesomeIcon icon="bicycle" className="icon" />
                    <FontAwesomeIcon icon="book-reader" className="icon" />
                    <FontAwesomeIcon icon="camera" className="icon" />
                    <FontAwesomeIcon icon="dumbbell" className="icon" />
                    <FontAwesomeIcon icon="image" className="icon" />
                    <FontAwesomeIcon icon="ticket-alt" className="icon" />
                    <FontAwesomeIcon icon="theater-masks" className="icon" />
                    <FontAwesomeIcon icon="swimmer" className="icon" />
                    <FontAwesomeIcon icon="palette" className="icon" />
                    <FontAwesomeIcon icon="music" className="icon" />
                    <FontAwesomeIcon icon="gamepad" className="icon" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    );
  }
}

export default ResumeTest;
