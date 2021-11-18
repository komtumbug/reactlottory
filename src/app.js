import React from "react";
import "./App.css";
import web3 from "./web3";
import contract from "./lotto.js";

class App extends React.Component {
    state = {
        pickWinner: '',
        manager: '',
        joinLottery:''
    }
    async componentDidMount() {
        const address = contract.options.address
        const balance = await web3.eth.getBalance(contract.options.address)
        this.setState({address});
        this.setState({balance});
    }

    buyLottery = async (event) => {
        event.preventDefault();
    
        const accounts = await web3.eth.getAccounts();
    
        this.setState({ message: 'Waiting on transaction success...' });
    
        await contract.methods.joinLottery().send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, 'ether')
        });
    
        this.setState({ message: 'You have been entered! ' });
      };


      render(){
          return(
              <div className="App">
                  <h1>LotteryRSU</h1>
                  <h2>{this.state.address}</h2>
                  <form> onSubmit = {this.buyLottery()}
                    <input type ="submit" vaule="Join"/>
                    </form>
              </div>
          )
      }
    
}


export default App;
