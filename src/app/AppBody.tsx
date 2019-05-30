import * as React from "react";
import {EnvPage} from "environment";
import {AppHeader} from "app/AppHeader";
import {CreateEnvDialog, DeleteAppDialog, DeleteEnvDialog, EditKambiAppDialog, EditSystemAppDialog} from "admin"
import {EnvActionDelegate} from "environment/envActionDelegate";
import {Environment, KambiApp, SystemApp} from "api/typings";


interface AppBodyProps {
    id: string
    onNavigate: (path: string) => void
}

interface AppBodyState {
    sideMenuCollapsed: boolean
    displayDialog?: () => void
}

export default class AppBody extends React.Component<AppBodyProps, AppBodyState> {

    private readonly actionDelegate: EnvActionDelegate


    constructor(props: AppBodyProps, context: any) {
        super(props, context);
        this.state = {sideMenuCollapsed: true}
        this.actionDelegate = {
            onCreateEnv: this.handleCreateNewEnv,
            onCloneEnv: this.handleCloneEnv,
            onDeleteEnv: this.handleDeleteEnv,
            onAddKambiAppToEnv: this.handleAddKambiAppToEnv,
            onAddSystemAppToEnv: this.handleAddSystemAppToEnv,
            onEditApp: this.handleEditApp,
            onRemoveApp: this.handleRemoveApp
        }
    }

    public render() {

        const {sideMenuCollapsed, displayDialog} = this.state;

        return (
            <div className="app">
                <AppHeader
                    id={this.props.id}
                    onSideMenuCollapse={this.handleCollapseSideMenu}
                    onNavigate={this.props.onNavigate}
                    sideMenuCollapsed={sideMenuCollapsed}/>
                <EnvPage id={this.props.id}
                         actionDelegate={this.actionDelegate}
                         sideMenuCollapsed={sideMenuCollapsed}/>

                {displayDialog && displayDialog()}
            </div>
        )
    }

    private handleCollapseSideMenu = (collapsed: boolean) => {
        this.setState({sideMenuCollapsed: collapsed})
    }

    private handleCreateNewEnv = () => {
        this.setState({
            displayDialog: () => {
                return <CreateEnvDialog onComplete={(id?: string) => {
                    if (id) {
                        this.props.onNavigate(`/env/${id}`)
                    }
                    this.handleCloseDialog()
                }}/>
            }
        })
    }

    private handleCloneEnv = (env: Environment) => {
        this.setState({
            displayDialog: () => {
                return <CreateEnvDialog envToClone={env} onComplete={(id?: string) => {
                    if (id) {
                        this.props.onNavigate(`/env/${id}`)
                    }
                    this.setState({displayDialog: undefined})
                }}/>
            }
        })
    }

    private handleDeleteEnv = (environment?: Environment) => {
        this.setState({
            displayDialog: () => {
                return <DeleteEnvDialog environment={environment!!}
                                        onClose={(canceled: boolean) => {
                                            if (!canceled) {
                                                this.props.onNavigate(`/env/default`)
                                            }
                                            this.handleCloseDialog()
                                        }}/>

            }
        })
    }

    private handleAddKambiAppToEnv = (environment: Environment) => {
        this.setState({
            displayDialog: () => {
                return <EditKambiAppDialog environment={environment}
                                           onClose={this.handleCloseDialog}/>

            }
        })
    }

    private handleAddSystemAppToEnv = (environment: Environment) => {
        this.setState({
            displayDialog: () => {
                return <EditSystemAppDialog environment={environment}
                                            onClose={this.handleCloseDialog}/>

            }
        })
    }

    private handleEditApp = (app: KambiApp | SystemApp, env: Environment) => {
        this.setState({
            displayDialog: () => {
                if (app.category === "KAMBI_APP") {
                    return <EditKambiAppDialog environment={env}
                                               app={app as KambiApp}
                                               onClose={this.handleCloseDialog}/>
                }
                return <EditSystemAppDialog environment={env}
                                            app={app as SystemApp}
                                            onClose={this.handleCloseDialog}/>

            }
        })
    }

    private handleRemoveApp = (app: KambiApp | SystemApp, env: Environment) => {
        this.setState({
            displayDialog: () => {
                return <DeleteAppDialog environment={env}
                                        app={app}
                                        onClose={this.handleCloseDialog}/>

            }
        })
    }

    private handleCloseDialog = () => {
        this.setState({displayDialog: undefined})
    }
}
