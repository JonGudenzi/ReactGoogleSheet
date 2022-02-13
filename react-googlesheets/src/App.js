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
  const [TotalVendors, setTotalVendors] = useState('');
  const [VendorName, setVendorName] = useState([{ vendor: "" }]);
  const [VendorBoxAmount, setVendorBoxAmount] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();

    const objt = {
      Date: Date,
      Freight_Company: Freight_Company,
      TotalBoxNumber: TotalBoxNumber,
      TotalVendors: TotalVendors,
      VendorName: VendorName,
      // VendorBoxAmount: VendorBoxAmount,
    };

    setDate("");
    setFreight_Company("");
    setTotalBoxNumber("");
    setTotalVendors('');
    // setVendorName("");
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

  const handleAddNewVendor = () => {
    setVendorName([...VendorName, { vendor: "" }]);
  };

  const handleRemoveVendor = (index) => {
    const list = [...VendorName];
    list.splice(index, 1);
    setVendorName(list);
  }

  const handleAddVendorChange = (e, index) => {
    const {name, value} = e.target
    const list = [...VendorName];
    list[index][name] = value;
    setVendorName(list)
  }

  

  


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
              onChange={(e) => setDate(e.target.value)}
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

        {/* -------------Add Another Vendor Form-------------------- */}


        <Form className="form flexAddAnotherVendor" >
          <div className="vendorNameAndBoxAmount">
            {VendorName.map((singleVendor, index) => (
              <Form.Field key={index}>
                <label>Vendor Name</label>
                <input
                  name="vendor"
                  id="vendor"
                  value={singleVendor.vendor}
                  placeholder="Enter Vendor name"
                  onChange={(e) => handleAddVendorChange(e, index)}
                  
                />
                
                
              </Form.Field>
            ))}

          </div>

          <Form.Field className="vendorNameAndBoxAmount">
            <label>Boxes</label>
            <input
              value={VendorBoxAmount}
              placeholder="Enter Amount of Boxes"
              onChange={(e) => setVendorBoxAmount(e.target.value)}
            />
            <Button onClick={handleRemoveVendor} color="blue" type="submit">
            <span>Remove Vendor</span>
          </Button>
          </Form.Field>
          <Button onClick={handleAddNewVendor} color="blue" type="submit">
            <span>Add Another Vendor</span>
          </Button>
        </Form>



      </div>

    </Container>
  );
};

export default App;
