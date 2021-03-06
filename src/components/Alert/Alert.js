import React from 'react';
import { Alert } from 'antd';

const AlertBox = (props) => {
    let title = props.title ? props.title : props.type;
    return (
            <div className="mainContent" id="mainContent">
                <Alert
                    message     = {title.substring(0,1).toUpperCase() + title.substring(1)}
                    description = {props.message}
                    type        = {props.type}
                    showIcon
                />
            </div>
    );
}

export default AlertBox;