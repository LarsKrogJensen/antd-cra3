import * as React from "react";
import {Col, Row} from 'antd';
import {Environment, KambiApp, SystemApp} from "api/typings";
import {AppCard, Divider} from "./components";
import "./env.less"
import {EnvActionDelegate} from "environment/envActionDelegate";

interface EnvPageBodyProps {
    environment: Environment,
    actionDelegate: EnvActionDelegate
}

export default class EnvPageBody extends React.Component<EnvPageBodyProps, {}> {

    public render() {
        const {environment} = this.props;

        if (environment) {
            const kambiApps = [...environment.kambiApps]
                .sort((a, b) => a.shortName.localeCompare(b.shortName))
                .map(app => this.renderAppCard(app))
            const systemApps = [...environment.systemApps]
                .sort((a, b) => a.shortName.localeCompare(b.shortName))
                .map(app => this.renderAppCard(app))

            return (
                <div>
                    <Row gutter={16}>
                        {kambiApps}
                    </Row>
                    <Divider>SUPPORT SYSTEMS</Divider>
                    <Row gutter={16}>
                        {systemApps}
                    </Row>
                </div>
            )
        }

        return null;
    }

    private renderAppCard(app: KambiApp | SystemApp) {
        return (
            <Col key={app.id} xs={12} sm={8} md={6} lg={4}>
                <AppCard app={app} onRemove={this.onRemoveApp} onEdit={this.handleEditApp}/>
            </Col>
        );
    }

    private onRemoveApp = (app: KambiApp | SystemApp) => {
        const {environment, actionDelegate} = this.props;
        actionDelegate.onRemoveApp(app, environment)
    }

    private handleEditApp = (app: KambiApp | SystemApp) => {
        const {environment, actionDelegate} = this.props;
        actionDelegate.onEditApp(app, environment)
    }
}

