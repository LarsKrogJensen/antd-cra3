import * as React from "react";
import {FormEvent} from "react";
import {Alert, Button, Col, Form, Input, InputNumber, Modal, Row, Select} from "antd"
import {FormComponentProps} from "antd/lib/form/Form";
import {Environment, EnvironmentInput, KambiApp, KambiAppInput} from "api/typings";
import {cloneEnv} from "api/conversion";
import "./styles.less"

interface EditKambiAppDialogProps extends FormComponentProps {
    app?: KambiApp
    environment: Environment
    onClose: (canceled: boolean) => void
    onSubmit: (envId: string, env: EnvironmentInput) => Promise<any>
}

interface EditKambiAppDialogState {
    error?: string
}


class EditKambiAppDialog extends React.Component<EditKambiAppDialogProps, EditKambiAppDialogState> {

    constructor(props: EditKambiAppDialogProps, context: any) {
        super(props, context);
        this.state = {}
    }

    public render() {
        const formItemLayout = {
            labelCol: {
                sm: {span: 4},
                xs: {span: 24},
            },
            wrapperCol: {
                sm: {span: 20},
                xs: {span: 24},
            },
        };
        const {app} = this.props
        const {getFieldDecorator} = this.props.form;
        const error = this.state.error;


        return (
            <Modal title={app ? "Update Kambi App" : "Add Kambi App"}
                   width={620}
                   onCancel={() => this.props.onClose(true)}
                   okText="OK"
                   cancelText="Cancel"
                   visible
                   footer={null}>

                <Form onSubmit={this.handleSubmitForm}>
                    <Form.Item label="Short name" hasFeedback {...formItemLayout}>
                        {getFieldDecorator("shortName", {
                            rules: [{
                                message: "Please input short name ",
                                required: true
                            }],
                            initialValue: app && app.shortName
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="Long name" hasFeedback {...formItemLayout}>
                        {getFieldDecorator("longName", {
                            rules: [{
                                message: "Please input long name ",
                                required: true
                            }],
                            initialValue: app && app.longName
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="Host" hasFeedback {...formItemLayout}>
                        {getFieldDecorator("host", {
                            rules: [{
                                message: "Please input host",
                                required: true
                            }],
                            initialValue: app && app.host
                        })(
                            <Select notFoundContent="No hosts available">
                                {this.props.environment.hosts
                                    .map((host, index) => (
                                        <Select.Option key={`host${index}`}
                                                       value={"${env.host." + index + "}"}>{host}</Select.Option>
                                    ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="Port" hasFeedback {...formItemLayout}>
                        {getFieldDecorator("port", {
                            rules: [{
                                message: "Please input port",
                                required: true
                            }],
                            initialValue: app && app.port || 1600
                        })(
                            <InputNumber/>
                        )}
                    </Form.Item>
                    <Form.Item label="Legacy context" hasFeedback {...formItemLayout}>
                        {getFieldDecorator("legacyContext", {
                            initialValue: app && app.legacyContext
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Row>
                        {error && <Alert message={error} type="error"/>}
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
        const {form, onSubmit, onClose, environment, app} = this.props;
        form.validateFields((err, value: KambiAppInput) => {
                if (!err && this.ensureUniqueAppName(value.shortName, environment, app)) {
                    const newApp: KambiAppInput = {
                        shortName: value.shortName,
                        longName: value.longName,
                        category: "KAMBI_APP",
                        host: value.host,
                        port: value.port,
                        legacyContext: value.legacyContext
                    }
                    let envInput: EnvironmentInput
                    if (app) {
                        envInput = cloneEnv(environment, (id) => id !== app.id)
                    } else {
                        envInput = cloneEnv(environment)
                    }
                    envInput.kambiApps.push(newApp)
                    onSubmit(environment.id, envInput)
                        .then(res => onClose(false))
                        .catch(error => this.setState({error: `Failed to add/update app: ${error}`}))
                }
            }
        )
    }

    private ensureUniqueAppName(shortName: string, env: Environment, existingApp?: KambiApp) {
        const collision = env.kambiApps
            .filter(app => app.shortName === shortName) // find those with matching names
            .filter(app => !existingApp || app.id !== existingApp.id) // but not our self
            .length > 0;

        if (collision) {
            this.setState({error: `App with name ${shortName} already exist in environment, please select a unique shortname`})
        }
        return !collision
    }
}

const WrappedForm = Form.create()(EditKambiAppDialog)

export default WrappedForm
