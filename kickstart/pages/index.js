import factory from '../ethereum/factory'
import React, {Component} from 'react'
import {CardGroup, Button} from 'semantic-ui-react'
import Layout from '../components/Layout'

// next compile and render component first before putting it to the web browser
class CampaignIndex extends Component {
    // specific way of fetching data in next js
    // fetching initial data of the page and pass it to {this.props}
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns }
    }

    renderCampaigns() {
        // put campaigns in a card list
        // https://react.semantic-ui.com/views/card/#variations-group-centered
        const items = this.props.campaigns.map( address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            }
        });

        return <CardGroup items={items} />;
    }

    render() {
        return (
            <Layout>
                <div>
                    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                    <h3>Open Campaigns</h3>
                    {this.renderCampaigns()}
                    <Button
                        content={'Create Campaign'}
                        icon={'add circle'}
                        labelPosition={'right'}
                        primary
                    />
                </div>
            </Layout>
        );
    }

}

export default CampaignIndex;