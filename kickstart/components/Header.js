import {Menu} from "semantic-ui-react";
import React from 'react';
import {Link} from '../routes';

// Link: link to other pages
export default () => {
    return (
        <Menu style={{marginTop: '20px'}}>
            <Link route={"/"}>
                <a className={"item"}>CrowdCoin</a>
            </Link>

            <Menu.Menu position='right'>
                <Link route={"/"}>
                    <a className={"item"}>Campaigns</a>
                </Link>
                <Link route={"/campaigns/new"}>
                    <a className={"item"}>+</a>
                </Link>
            </Menu.Menu>

        </Menu>
    );
}