import React, {Component} from 'react';
import logo from './logo.svg';
import web3 from "./web3";
import './App.css';
import lottery from "./lottery";

class App extends Component {
    state = {
        manager: '',
        players: [],
        balance: '',
        value: ''
    };

    // override method that will be called after each render
    async componentDidMount() {
        const manager = await lottery.methods.manager().call();  // the call is from a default account
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);
        this.setState( { manager, players, balance } )
    }

    onSubmit = async (event) => {
        // prevent default submit
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, 'ether')
        });
    };

    render() {
        return (
            <div>
              <h2>Lottery Contract</h2>
                <p>
                  Contract manager is {this.state.manager}

                  There are currently {this.state.players.length} players entered
                  competing for {web3.utils.fromWei(this.state.balance, 'ether')} ether!
                </p>

                <hr />
                <form onSubmit={this.onSubmit}>
                    <h4>Want to try your luck?</h4>
                    <div>
                        <label>Amount of ether to enter</label>
                        <input
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </div>
                    <button>Enter</button>
                </form>

                <hr />
            </div>

        );
    }

}

export default App;
