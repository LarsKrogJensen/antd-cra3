import * as React from "react"
import {Dropdown, Icon, Menu} from "antd"
import "./app-card.less"
import {KambiApp, SystemApp} from "api/typings";
import moment from "moment"

interface AppCardProps {
    app: KambiApp | SystemApp;
    onRemove: (app: KambiApp | SystemApp) => void;
    onEdit: (app: KambiApp | SystemApp) => void;
}

export default class AppCard extends React.Component<AppCardProps, {}> {

    public render() {
        const app = this.props.app;
        const menu = (
            <Menu theme="dark" onClick={this.handleMenuItemClick} style={{width: 200}}>
                <Menu.Item key="edit">Edit</Menu.Item>
                <Menu.Item key="remove">Remove</Menu.Item>
            </Menu>
        );

        let appBody;
        if (app.category === "KAMBI_APP") {
            appBody = AppCard.renderKambiAppBody(app as KambiApp);
        } else {
            appBody = AppCard.renderSystemAppBody(app as SystemApp);
        }
        let cardClasses
        if (app.metrics && app.metrics.running) {
            cardClasses = "app-card"
        } else {
            cardClasses = "app-card app-card-error"
        }

        return (
            <div className={cardClasses}>
                <div className="app-card-head">
                    <span className="app-card-head-title">{app.shortName}</span>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                            <Icon type="ellipsis" style={{color: "white"}}/>
                        </a>
                    </Dropdown>

                </div>
                {appBody}
            </div>
        )
    }


    private static renderKambiAppBody(app: KambiApp) {
        return (
            <div className="app-card-content">
                <div className="app-card-content-version">{(app.metrics && app.metrics.version) || "-"}</div>
                <div>{(app.metrics && app.metrics.scmBranch) || "-"}</div>
                <div className="app-card-content-uptime"
                     title={app.metrics && app.metrics.upSince}>
                    {(app.metrics && app.metrics.upSince && moment(app.metrics.upSince).fromNow()) || "-"}
                </div>
            </div>
        )
    }

    private static renderSystemAppBody(app: SystemApp) {
        return (
            <div className="app-card-content">

            </div>
        )
    }

    private handleMenuItemClick = ({key}: any) => {
        if (key === "edit") {
            this.props.onEdit(this.props.app)
        }
        if (key === "remove") {
            this.props.onRemove(this.props.app)
        }
    }
}
