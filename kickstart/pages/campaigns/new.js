import React, {Component} from 'react';
import Layout from "../components/Layout";
import { Button, Form, Input, Message } from 'semantic-ui-react'
import factory from '../ethereum/factory'
import web3 from '../ethereum/web3'
import {Router} from '../routes'

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errMessage: '',
        loading: false
    };

    // must abide format: () => {}
    onSubmit = async event => {
        this.setState({loading: true, errMessage: ''});

        try {
            event.preventDefault();
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });

        } catch (err) {
            this.setState({errMessage: err.message});
        }

        this.setState({loading: false});

    };

    // must enable error in the Form so that it would be displayed
    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label='wei'
                            labelPosition='right'
                            value={this.state.minimumContribution}
                            onChange={e => {
                                this.setState({minimumContribution: e.target.value})
                            }}
                        />
                    </Form.Field>

                    <Message error header={'Oops!'} content={this.state.errMessage} />
                    <Button primary loading={this.state.loading}> Create </Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;