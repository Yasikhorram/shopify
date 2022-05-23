import React, { useState } from "react";
import axios from "axios";
import {
  ButtonGroup,
  Button,
  Form,
  Container,
  Col,
  Row,
  Toast,
} from "react-bootstrap";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([]);
  const maxTokens = 100;

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const getResponse = () => {
    axios
      .post(
        "https://api.openai.com/v1/engines/text-curie-001/completions",
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.REACT_APP_OPENAI_APIKEY,
            max_tokens: maxTokens,
          },
        }
      )
      .then((res) => {
        setResponse([
          ...response,
          { prompt: prompt, response: res.data.choices[0].text.trim() },
        ]);
      });
  };

  const submit = () => {
    getResponse();
  };

  return (
    <Container>
      <br />
      <br />
      <Row className="left-content-md-center">
        <Col xs lg="7">
          <h2>Fun with AI</h2>
          <br />
          <br />
        </Col>
        <Col xs lg="2"></Col>
      </Row>
      <Row>
        <Form>
          <Form.Label>Enter prompt:</Form.Label>
          <br />
          <Col xs lg="7">
            <Form.Control
              type="text"
              name="prompt"
              value={prompt}
              onChange={handleChange}
              as="textarea"
              rows="3"
            ></Form.Control>
          </Col>
          <Col md="auto"></Col>
          <br />
        </Form>
      </Row>
      <Row>
        <Col md={3}>
          <ButtonGroup className="d-flex">
            <Button variant="outline-primary" onClick={submit} size="lg">
              Submit
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <br />
      <br />

      {response.map(function (d, idx) {
        return (
          <Row key={idx}>
            <Col xs lg="7">
              <Toast>
                <Toast.Header>
                  <strong className="me-auto">{d.prompt}</strong>
                </Toast.Header>
                <Toast.Body>{d.response}</Toast.Body>
              </Toast>
              <br />
            </Col>
            <Col md="auto"></Col>
          </Row>
        );
      })}
    </Container>
  );
}
