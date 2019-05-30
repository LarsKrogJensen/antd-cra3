import * as React from "react";
import {FormEvent} from "react";
import {Alert, Button, Col, Form, Modal, Row} from "antd"
import {Environment} from "api/typings";

interface DeleteEnvDialogProps {
    environment: Environment,
    submit: (id: string) => Promise<any>
    onClose: (canceled: boolean) => void
}

interface DeleteEnvDialogState {
    error?: string
}

class DeleteEnvironmentDialog extends React.Component<DeleteEnvDialogProps, DeleteEnvDialogState> {

    constructor(props: DeleteEnvDialogProps, context: any) {
        super(props, context);
        this.state = {}
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
                            <Button type="primary" htmlType="submit" size="large">OK</Button>
                            <Button style={{marginLeft: 8}}
                                    size="large"
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
            .catch(error => this.setState({error}))
    }

}

export default DeleteEnvironmentDialog
