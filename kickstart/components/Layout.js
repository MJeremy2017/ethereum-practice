import React from 'react';
import Header from "./Header";
import Head from "next/head"
import {Container} from "semantic-ui-react";

// Head tag place content inside of it to the top
export default (props) => {
    // place everything inside a container so that width is restricted
    return (
        <Container>
            <Head>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
            </Head>

            <Header/>
            {props.children}
        </Container>
    )
};