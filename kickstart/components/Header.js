import {Menu} from "semantic-ui-react";
import React from 'react';

export default () => {
    return (
        <Menu style={{marginTop: '20px'}}>
            <Menu.Item>
                CrowdCoin
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>
                    Campaign
                </Menu.Item>
                <Menu.Item>
                    +
                </Menu.Item>
            </Menu.Menu>

        </Menu>
    );
}