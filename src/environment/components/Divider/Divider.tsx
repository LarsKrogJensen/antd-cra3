import React from 'react';
import "./divider.less"

const Divider: React.FC = (props) => (
    <div className="divider">
        <hr className="divider-hr"/>
        <div className="divider-content">{props.children}</div>
        <hr className="divider-hr"/>
    </div>
)

export default Divider
