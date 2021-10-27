import React, { useState } from 'react';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import axios from 'axios';
import './App.css';

function App() {
  const [ALU, setALU] = useState('');
  const [Description, setDescription] = useState('');
  const [Old_Price, setold_Price] = useState('');
  const [New_Price, setNew_Price] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const objt = { ALU, Description, Old_Price, New_Price, };
    if (ALU.length === 0) {
      alert('You are missing an ALU');
    }
    else if (Description.length === 0) {
      alert('You are missing a Description');
    }
    else if (Old_Price.length === 0) {
      alert('You are missing a Old Price');
    }
    else if (New_Price.length === 0) {
      alert('You are missing a New Price');
    }

    else {

      axios
        .post(
          'https://sheet.best/api/sheets/43b98d36-2257-422f-b1ee-60a1a2f1b568',
          objt
        )
        .then((response) => {
          console.log(response);
          
          
        });
    }
  };

  return (
    <Container fluid className="container">
      <Header as="h2">IE Price Change Request</Header>
      <Form className="form">
        <Form.Field>
          <label>ALU</label>
          <input
            placeholder="Enter your Name"
            onChange={(e) => setALU(e.target.value)}
          />
        </Form.Field>
        <Form.Field >
          <label>Description</label>
          <input
            placeholder="Enter your Age"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Old Price</label>
          <input
            placeholder="Enter your Old Price Here"
            onChange={(e) => setold_Price(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>New Price</label>
          <input
            placeholder="Enter your New Price"
            onChange={(e) => setNew_Price(e.target.value)}
          />
        </Form.Field>

        <Button color="blue" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default App;