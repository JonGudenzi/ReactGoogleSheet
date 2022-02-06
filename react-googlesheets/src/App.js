import React, { useState } from "react";
import { Button, Form, Container, Header } from "semantic-ui-react";
import axios from "axios";
import "./App.css";

const App = () => {
  let APIkey = "48f7b748bbe946f9ada9ffd9fad114ab";
  let APItoken =
    "8ae340536776d2736422804003b661708a5fd174b18f7d88d7b6dd95f771233c";

  const [Date, setDate] = useState("");
  const [Freight_Company, setFreight_Company] = useState("");
  const [TotalBoxNumber, setTotalBoxNumber] = useState("");
  // const [TotalVendors, setTotalVendors] = useState('');
  const [VendorName, setVendorName] = useState("");
  const [VendorBoxAmount, setVendorBoxAmount] = useState("");

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const objt = {
      Date: Date,
      Freight_Company: Freight_Company,
      TotalBoxNumber: TotalBoxNumber,
      // TotalVendors: TotalVendors,
      VendorName: VendorName,
      VendorBoxAmount: VendorBoxAmount,
    };

    setDate("");
    setFreight_Company("");
    setTotalBoxNumber("");
    // setTotalVendors('');
    setVendorName("");
    setVendorBoxAmount("");

    const postToAPIS = () => {
      axios.post(
        "https://sheet.best/api/sheets/43b98d36-2257-422f-b1ee-60a1a2f1b568",
        objt
      );

      axios.post(
        `https://api.trello.com/1/cards?key=${APIkey}&token=${APItoken}&idList=6183456a546264705e648406&name=${VendorName}+(${VendorBoxAmount}+boxes)`
      );
    };

    if (Date.length === 0) {
      alert("You are missing the Date!");
    } else if (Freight_Company.length === 0) {
      alert("You are missing the Freight Company Name!");
    } else if (TotalBoxNumber.length === 0) {
      alert("Please provide how many total boxes");
    } else {
      postToAPIS();
      alert("Success!");
    }
  };

  const addNewVendor = (e) => {
    e.preventDefault();
    alert("working?");
  };

  console.log(addNewVendor);

  return (
    <Container fluid className="container">
      <div id="flexParent">
      <Header as="h1" >IE Incoming Shipment</Header>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Date</label>
          <input
            value={Date}
            placeholder="Enter Date"
            onChange={dateChangeHandler}
          />
        </Form.Field>

        <Form.Field>
          <label>Freight Company</label>
          <input
            value={Freight_Company}
            placeholder="Enter Freight Company"
            onChange={(e) => setFreight_Company(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Total Boxes</label>
          <input
            value={TotalBoxNumber}
            placeholder="Enter Total Box Amount"
            onChange={(e) => setTotalBoxNumber(e.target.value)}
          />
        </Form.Field>
        <Button color="blue" type="submit">
          Submit
        </Button>
        </Form>


          <Form className="form flexAddAnotherVendor" onSubmit={addNewVendor} >
          <Form.Field className="vendorNameAndBoxAmount">
            <label>Vendor Name</label>
            <input
              value={VendorName}
              placeholder="Enter Vendor name"
              onChange={(e) => setVendorName(e.target.value)}
            />
          </Form.Field>

          <Form.Field className="vendorNameAndBoxAmount">
            <label>Boxes</label>
            <input
              value={VendorBoxAmount}
              placeholder="Enter Amount of Boxes"
              onChange={(e) => setVendorBoxAmount(e.target.value)}
            />
          </Form.Field>

          <Button>
            <span>Add Another Vendor</span>
          </Button>
          </Form>
        
        
      
      </div>
      
    </Container>
  );
};

export default App;
