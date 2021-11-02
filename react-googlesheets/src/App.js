import React, { useState } from 'react';
import { Button, Form, Container, Header, } from 'semantic-ui-react';
import axios from 'axios';
import './App.css';

function App() {

  const [Card_Post, setCard_Post] = useState('');
  const [Date, setDate] = useState('');
  const [Freight_Company, setFreight_Company] = useState('');
  const [Old_Price, setold_Price] = useState('');
  const [New_Price, setNew_Price] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const objt = { Date, Freight_Company, Old_Price, New_Price, Card_Post};
    if (Date.length === 0) {
      alert('You are missing the Date!');
    }
    else if (Freight_Company.length === 0) {
      alert('You are missing the Freight Company Name!');
    }
    else if (Old_Price.length === 0) {
      alert('Please provide how many boxes');
    }
    else if (New_Price.length === 0) {
      alert('You are missing the company name');
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

    if (Card_Post.length === 0) {
      alert('You are missing the Company Name!');
    }
    else{

      axios
        .post(
          `https://api.trello.com/1/cards?key=48f7b748bbe946f9ada9ffd9fad114ab&token=8ae340536776d2736422804003b661708a5fd174b18f7d88d7b6dd95f771233c&idList=617ebe7269143a62624c8a39&name=${Card_Post}`
        )
        .then((response) => {
          console.log(response);
          alert('Success!');
        });   
    
      };
  };
////////////////////////////////////////////////////




  return (
    <Container fluid className="container">
      <Header  as="h1">IE Incoming Shipment</Header>
      <Form className="form">
        <Form.Field>
          <label>Date</label>
          <input
         
            placeholder="Enter Date"
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Field>
        <Form.Field >
          <label>Freight_Company</label>
          <input
            placeholder="Enter Freight Company"
            onChange={(e) => setFreight_Company(e.target.value)}
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

        <Form.Field>
          <label>Company</label>
          <input
            placeholder="Enter Company name"
            onChange={(e) => setCard_Post(e.target.value)}
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