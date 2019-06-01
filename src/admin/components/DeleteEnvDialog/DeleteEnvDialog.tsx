import React, {FormEvent} from "react";
import {Alert, Button, Col, Form, Modal, Row} from "antd"
import {Environment} from "api/typings";

interface DeleteEnvDialogProps {
    environment: Environment,
    submit: (id: string) => Promise<any>
    onClose: (canceled: boolean) => void
}

interface DeleteEnvDialogState {
    error?: string
    saving: boolean
}

class DeleteEnvironmentDialog extends React.Component<DeleteEnvDialogProps, DeleteEnvDialogState> {
    state = {
        saving: false,
        error: undefined
    }

    public render() {

        const error = this.state.error;
        return (
            <Modal title="Delete Environment"
                   onCancel={() => this.props.onClose(true)}
                   okText="OK"
                   cancelText="Cancel"
                   visible
                   footer={null}>

                <Form onSubmit={this.handleSubmitForm}>
                    <Row>
                        Are you sure you want to delete environment {this.props.environment.longName}
                    </Row>
                    <Row>
                        {error && <Alert message={`Failed to delete environment ${error}`} type="error"/>}
                    </Row>
                    <Row style={{marginTop: 16}}>
                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button type="primary"
                                    htmlType="submit"
                                    loading={this.state.saving}
                                    disabled={this.state.saving}
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
        const {submit, onClose, environment} = this.props;
        submit(environment.id)
            .then(res => onClose(false))
            .catch(error => this.setState({error, saving: false}))
        this.setState({saving: true})
    }

}

export default DeleteEnvironmentDialog
