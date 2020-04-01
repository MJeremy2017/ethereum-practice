import Web3 from "web3";

let web3;

// typeof check if variable exists
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // if it's in the browser and has metamask installed
    web3 = new Web3(window.web3.currentProvider);
    console.log("Metamask used");
    const getAccounts = async () => {
        const accounts = await web3.eth.getAccounts();
        return accounts;
    };

    console.log('first account is ', getAccounts()[0]);
} else {
    // connect to rinkeby network through infura node
    console.log('not Metamask');
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/50266a515df44177bde45f83f877503d'
    );
    web3 = new Web3(provider);
}

export default web3;