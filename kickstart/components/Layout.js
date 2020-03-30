import React from 'react';

export default (props) => {
    return (
        <div>
            <h1>This is a header</h1>
            {props.children}
            <h1>This is a footer</h1>
        </div>
    )
};