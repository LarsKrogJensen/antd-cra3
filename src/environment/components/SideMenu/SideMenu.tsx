import * as React from "react"
import {Icon, Menu} from "antd"
import "./side-menu.less"
import {ClickParam} from "antd/lib/menu";
import {Environment} from "api/typings";
import {EnvActionDelegate} from "environment/envActionDelegate";

interface SideMenuProps {
    environment: Environment,
    actionDelegate: EnvActionDelegate
}

export default class SideMenu extends React.Component<SideMenuProps, {}> {

    public render() {
        return (
            <div>
                <Menu theme="dark"
                      className="env-side-menu"
                      onClick={this.handleMenuClick}
                      defaultOpenKeys={['sub1']}
                      selectedKeys={[]}
                      mode="inline">
                    <Menu.Item key="newEnv"><Icon type="plus"/>New Environment</Menu.Item>
                    <Menu.Item key="cloneEnv"><Icon type="switcher"/>Clone Environment</Menu.Item>
                    <Menu.Item key="deleteEnv"><Icon type="delete"/>Delete Environment</Menu.Item>
                    <Menu.Item key="addKambiApp"><Icon type="plus"/>Add Kambi App</Menu.Item>
                    <Menu.Item key="addSystemApp"><Icon type="plus"/>Add System App</Menu.Item>
                </Menu>
            </div>
        );
    }

    private handleMenuClick = (e: ClickParam) => {
        const {environment, actionDelegate} = this.props;
        if (e.key === "newEnv") {
            actionDelegate.onCreateEnv()
        } else if (e.key === "deleteEnv") {
            actionDelegate.onDeleteEnv(environment)
        } else if (e.key === "addKambiApp") {
            actionDelegate.onAddKambiAppToEnv(environment)
        } else if (e.key === "addSystemApp") {
            actionDelegate.onAddSystemAppToEnv(environment)
        } else if (e.key === "cloneEnv") {
            actionDelegate.onCloneEnv(environment)
        }
    }
}
