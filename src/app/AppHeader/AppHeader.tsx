import * as React from 'react'
import {Button, Icon, Menu, Spin} from 'antd';
import {Environment} from "api/typings";
import {Link} from "react-router-dom";
import {CreateEnvDialog} from "admin"

const SubMenu = Menu.SubMenu;
const logo = require("./kambi-logo.png")

export interface AppHeaderProps {
    id: string,
    loading: boolean,
    error?: string,
    environments: Environment[];
    sideMenuCollapsed: boolean;
    onSideMenuCollapse: (collapse: boolean) => void
    onNavigate: (path: string) => void
}

interface AppHeaderState {
    showCreateEnvDialog: boolean;
}

export default class AppHeader extends React.Component<AppHeaderProps, AppHeaderState> {

    state = {
        showCreateEnvDialog: false
    }

    public render() {
        const {error, environments} = this.props;

        return (
            <div className="app-header">
                <div className="app-logo">
                    <img src={logo} alt="logo"/>
                </div>
                {!error && this.renderMenu()}
                {!error && environments && environments.length > 0 && <Button ghost onClick={this.toggleSideMenu}>
                    <Icon type={this.props.sideMenuCollapsed ? 'menu-unfold' : 'menu-fold'}/>
                </Button>}
                {!error && this.renderDialogs()}
            </div>
        )
    }

    private renderMenu() {
        const {environments, loading} = this.props;
        if (loading) {
            return (
                <div className="app-menu">
                    <Spin/>
                </div>
            )
        } else if (environments && environments.length > 0) {
            const selectedEnv = this.findSelectedEnvironment(environments, this.props.id);
            return (
                <Menu theme="dark" mode="horizontal" className="app-menu">
                    <SubMenu key="env" title={this.renderDropDownMenuTitle(selectedEnv)}>
                        {this.renderDropDownItems(environments)}
                    </SubMenu>
                </Menu>
            )
        } else {
            return (
                <div className="app-menu">
                    <Button ghost type="primary" onClick={this.handleCreateEnvClick}>
                        <Icon type="appstore"/> Create Enviroment
                    </Button>
                </div>
            )
        }
    }

    private renderDropDownItems = (environments: Environment[]) => {
        return [...environments]
            .sort((a, b) => a.longName.localeCompare(b.longName))
            .map(env => {
                return (
                    <Menu.Item key={env.shortName}>
                        <Link to={`/env/${env.id}`}><Icon type="appstore"/>{env.longName}</Link>
                    </Menu.Item>
                )
            });
    }

    private renderDropDownMenuTitle = (selectedEnv?: Environment) => {
        const title = selectedEnv ? selectedEnv.longName : "Select Environment"
        return (
            <div>
                <Icon style={{fontSize: 20}} type="appstore"/>
                <h1 style={{display: "inline", color: "white"}}>{title}</h1>
                <Icon style={{fontSize: 20, marginLeft: 8}} type="down"/>
            </div>
        );
    }

    private findSelectedEnvironment = (environments: Environment[], selectedEnvId: string): Environment | undefined => {
        return environments.find(env => env.id === selectedEnvId);
    }

    private toggleSideMenu = () => {
        this.props.onSideMenuCollapse(!this.props.sideMenuCollapsed)
    }

    private handleCreateEnvClick = () => {
        this.setState({showCreateEnvDialog: true})
    }

    private renderDialogs = () => {
        if (this.state.showCreateEnvDialog) {
            return <CreateEnvDialog onComplete={this.handleCreateEnvCompleted}/>
        }
        return null
    }

    private handleCreateEnvCompleted = (id?: string) => {
        this.setState({showCreateEnvDialog: false})
        if (id) {
            this.props.onNavigate(`/env/${id}`)
        }
    }
}

