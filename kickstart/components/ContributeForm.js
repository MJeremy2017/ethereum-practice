import React, {Component} from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react'


class ContributeForm extends Component {
    render() {
        return (
            <Form>
                <Form.Feild>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                    />
                </Form.Feild>
                <Button primary>
                    Contribute
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;
