import React from "react";
import web3 from "./web3";
import rental from "./rental";

import {Button, Card, Form, Grid, Input, Message, Table} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
  state = {
    owner1: "",
    owner2: "",
    owner1_bal: "",
    owner2_bal: "",
    value: "",
    message: "",
    loading: false,
    errorMessage: ''
  };
  async componentDidMount() {
    console.log("=====>getOwners")
    const owners = await  rental.methods.getOwners().call();
    const owner1 = owners[0];
    const owner2 = owners[1];
    const owner1_bal_t = await web3.eth.getBalance(owner1);
    const owner2_bal_t = await web3.eth.getBalance(owner2);
    const owner1_bal = web3.utils.fromWei(owner1_bal_t);
    const owner2_bal = web3.utils.fromWei(owner2_bal_t);

    this.setState({ owner1, owner2, owner1_bal, owner2_bal });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    // this.setState({ message: "Waiting on transaction success..." });
    this.setState({loading: true, errorMessage: ''});


    try {

    // const accounts = await web3.eth.getAccounts();
        const currentAccount = await web3.givenProvider.selectedAddress;

        await rental.methods.payRental().send({
          // from: accounts[0],
          from: currentAccount,
          value: web3.utils.toWei(this.state.value, "ether"),
        });

        window.location.reload(); //refresh the page -> show the balance
    } catch (err) {
      console.log("===========>");
      console.log(err.message);
      this.setState({ errorMessage: err.message});
    }

    //this.setState({ message: "You have payment your rental!" });
    this.setState({loading: false});
  };


  render() {
    return (
        <div >
          <Grid padded>
            <Grid.Row>
              <Grid.Column width={10} >
                <h2>Owners Information</h2>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Address</Table.HeaderCell>
                      <Table.HeaderCell>Balance(Ether)</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Owner1</Table.Cell>
                      <Table.Cell>{this.state.owner1}</Table.Cell>
                      <Table.Cell>{this.state.owner1_bal}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Owner2</Table.Cell>
                      <Table.Cell>{this.state.owner2}</Table.Cell>
                      <Table.Cell>{this.state.owner2_bal}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={10}>
                <h2>Pay Rental</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                  <Form.Field>
                    <label>Value</label>
                    <Input
                        value={this.state.value}
                        label="ether"
                        labelPosition="right"
                        onChange={(event) => this.setState({ value: event.target.value })}
                    />
                  </Form.Field>
                  <Message error header="Oops!" content={this.state.errorMessage}/>
                  <Button primary loading={this.state.loading}>Pay!</Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </div>
    );
  }
}
export default App;
