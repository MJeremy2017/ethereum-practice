import web3 from "./web3";
// import CampaignFactory from "./build/CampaignFactory";
const CampaignFactory = require("./build/CampaignFactory");

// load the deployed factory instance for further import
const campaignAddress = '0xf07884145016e0c7985b2B3C307B040e33Caa150';
const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), campaignAddress);

export default instance;