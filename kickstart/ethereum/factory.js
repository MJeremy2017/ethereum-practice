import web3 from "./web3";
// import CampaignFactory from "./build/CampaignFactory";
const CampaignFactory = require("./build/CampaignFactory");

// load the deployed factory instance for further import
const campaignAddress = '0x0cA24B23981cE5a42a5ce5741DF078c77b2b682A';
const instance = web3.eth.Contract(JSON.parse(CampaignFactory.interface), campaignAddress);

export default instance;