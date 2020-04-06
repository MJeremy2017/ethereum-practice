pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address campaignAddress = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(campaignAddress);
    }

    // view: no data modified
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }

}


contract Campaign {
    // define request type
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;  // store people who has approved
    }

    // storage variables
    Request[] public requests;
    address public manager;
    uint minimumContribution;
    // store people who has backed up
    mapping(address => bool) public approvers;
    uint approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        // right side is created as memory
        Request memory newReq = Request(description, value, recipient, false, 0);

        requests.push(newReq);
    }

    function approveRequest(uint index) public {
        // require it is a backer
        require(approvers[msg.sender]);
        // claim a storage to modify directly on the original address
        Request storage req = requests[index];
        // require it has not voted yet
        require(!req.approvals[msg.sender]);

        req.approvalCount ++;
        req.approvals[msg.sender] = true;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage req = requests[index];
        // request not completed yet
        require(!req.complete);
        // 50 percent more approval
        require(req.approvalCount > (approversCount / 2));

        req.recipient.transfer(req.value);
        req.complete = true;
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }

}