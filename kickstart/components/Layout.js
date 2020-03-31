import React from 'react';
import Header from "./Header";
import {Container} from "semantic-ui-react";

export default (props) => {
    // place everything inside a container so that width is restricted
    return (
        <Container>
            <Header/>
            {props.children}
        </Container>
    )
};