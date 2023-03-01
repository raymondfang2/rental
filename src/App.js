import React from "react";
import web3 from "./web3";
import rental from "./rental";

class App extends React.Component {
  state = {
    owner1: "",
    owner2: "",
    value: "",
    message: "",
  };
  async componentDidMount() {
    console.log("=====>getOwners")
    const owners = await  rental.methods.getOwners().call();
    const owner1 = owners[0];
    const owner2 = owners[1];

    this.setState({ owner1, owner2 });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    // const accounts = await web3.eth.getAccounts();

    const currentAccount = await web3.givenProvider.selectedAddress;

    this.setState({ message: "Waiting on transaction success..." });

    await rental.methods.payRental().send({
      // from: accounts[0],
      from: currentAccount,
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "You have payment your rental!" });
  };


  render() {
    return (
      <div>
        <h2>My Rental Portal</h2>
        <p>
          The amount paid will be split into the following owners' account directly,
          <br/>
          Owner1 -  {this.state.owner1}
          <br/>
          Owner2 - {this.state.owner2}
        </p>

        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Ready to Pay?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />


        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
