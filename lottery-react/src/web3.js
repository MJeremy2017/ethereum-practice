import Web3 from "web3";

// extract the provider from default web3 provided by the browser
// inject it into our web3 of different version
const web3 = new Web3(window.web3.currentProvider);

export default web3
