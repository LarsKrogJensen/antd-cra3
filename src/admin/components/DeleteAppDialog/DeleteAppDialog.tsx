import * as React from "react";
import {FormEvent} from "react";
import {Alert, Button, Col, Form, Modal, Row} from "antd"
import {Environment, EnvironmentInput, KambiApp, SystemApp} from "api/typings";
import {cloneEnv} from "api/conversion";

interface DeleteAppDialogProps {
    app: KambiApp | SystemApp,
    environment: Environment,
    onSubmit: (id: string, input: EnvironmentInput) => Promise<any>
    onClose: (canceled: boolean) => void
}

interface DeleteAppDialogState {
    error?: string
    saving: boolean
}

class DeleteAppDialog extends React.Component<DeleteAppDialogProps, DeleteAppDialogState> {
    state = {
        saving: false,
        error: undefined
    }

    public render() {

        const error = this.state.error;
        return (
            <Modal title="Delete App"
                   onCancel={() => this.props.onClose(true)}
                   okText="OK"
                   cancelText="Cancel"
                   visible
                   footer={null}>

                <Form onSubmit={this.handleSubmitForm}>
                    <Row>
                        Are you sure you want to delete app {this.props.app.shortName} from
                        environment {this.props.environment.longName}
                    </Row>
                    <Row>
                        {error && <Alert message={`Failed to delete app ${error}`} type="error"/>}
                    </Row>
                    <Row style={{marginTop: 16}}>
                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button type="primary"
                                    htmlType="submit"
                                    disabled={this.state.saving}
                                    loading={this.state.saving}
                                    size="large">OK</Button>
                            <Button style={{marginLeft: 8}}
                                    size="large"
                                    disabled={this.state.saving}
                                    onClick={() => this.props.onClose(true)}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }

    private handleSubmitForm = (e: FormEvent<any>) => {
        e.preventDefault()
        const {onSubmit, onClose, environment, app} = this.props;

        const envInput: EnvironmentInput = cloneEnv(environment, (id) => id !== app.id)

        this.setState({saving: true})
        onSubmit(environment.id, envInput)
            .then(() => onClose(false))
            .catch(error => this.setState({error}))
    }

}

export default DeleteAppDialog
