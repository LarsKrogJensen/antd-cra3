import * as React from "react";
import {Alert, Layout, Spin} from 'antd';
import {Environment} from "api/typings";
import EnvPageBody from "./EnvPageBody"
import {SideMenu} from "./components"
import "./env.less"
import {EnvActionDelegate} from "./envActionDelegate";

const {Sider, Content} = Layout;

export interface EnvPageProps {
    loading: boolean
    environment?: Environment
    sideMenuCollapsed: boolean
    error?: string
    actionDelegate: EnvActionDelegate;
}


export default class EnvPage extends React.Component<EnvPageProps> {
    
    public render() {
        const {environment, error, loading, actionDelegate} = this.props;

        if (loading) {
            return <div className="app-content" style={{padding: 16}}><Spin/></div>
        } else if (error) {
            return (
                <div className="app-content">
                    <Alert message="Environment Error"
                           description={`Failed load data ${error}`}
                           type="error"
                           showIcon
                           style={{margin: 32}}
                    /></div>
            )
        } else if (environment) {
            return (
                <Layout className="app-content">
                    <Content style={{padding: 16}}>
                        <EnvPageBody environment={environment}
                                     actionDelegate={actionDelegate}/>
                    </Content>
                    {this.renderSideMenu()}
                </Layout>
            )
        }

        return <div className="app-content"/>;
    }

    private renderSideMenu() {
        const {sideMenuCollapsed, environment, actionDelegate} = this.props;
        if (environment) {
            return (
                <Sider className="env-side-menu" collapsedWidth={0} trigger={null} collapsed={sideMenuCollapsed}>
                    <SideMenu environment={environment}
                              actionDelegate={actionDelegate}/>
                </Sider>
            )
        }

        return null;
    }

}

