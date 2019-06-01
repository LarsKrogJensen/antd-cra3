import React, {FormEvent, ReactNode} from "react";
import {Alert, Button, Col, Form, Input, InputNumber, Modal, Row, Select, Spin} from "antd"
import {FormComponentProps} from "antd/lib/form/Form";
import {Environment, EnvironmentInput, KeyValue, SystemApp, SystemAppConfig, SystemAppInput} from "api/typings";
import {cloneEnv} from "api/conversion";

export interface EditSystemAppDialogProps extends FormComponentProps {
    loading: boolean
    app?: SystemApp
    environment: Environment
    systemAppConfig: SystemAppConfig[]
    onClose: (canceled: boolean) => void
    onSubmit: (envId: string, env: EnvironmentInput) => Promise<any>
}

interface EditSystemAppDialogState {
    error?: string
    category?: string
    saving: boolean
}

class EditSystemAppDialog extends React.Component<EditSystemAppDialogProps, EditSystemAppDialogState> {

    constructor(props: EditSystemAppDialogProps, context: any) {
        super(props, context);
        this.state = {
            category: props.app && props.app.category,
            saving: false
        }
    }

    public render() {

        const formItemLayout = {
            labelCol: {
                sm: {span: 6},
                xs: {span: 24},
            },
            wrapperCol: {
                sm: {span: 14},
                xs: {span: 24},
            },
        };
        const error = this.state.error;
        const {app, onClose} = this.props;

        return (
            <Modal title={app ? "Edit System App" : "Add System App"}
                   onCancel={() => onClose(true)}
                   okText="OK"
                   cancelText="Cancel"
                   visible
                   footer={null}>
                <Form onSubmit={this.handleSubmitForm}>
                    {this.renderFormInputField("shortName", "Short name", app && app.shortName, formItemLayout)}
                    {this.renderFormInputField("longName", "Long name", app && app.longName, formItemLayout)}
                    {this.renderCatergorySelection(app && app.category, formItemLayout)}
                    {this.renderProperties(app ? app.properties : [], formItemLayout)}
                    <Row>
                        {error && <Alert message={error} type="error"/>}
                    </Row>
                    <Row style={{marginTop: 16}}>
                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button type="primary"
                                    htmlType="submit"
                                    loading={this.state.saving}
                                    disabled={this.state.saving}
                                    size="large">OK</Button>
                            <Button style={{marginLeft: 8}}
                                    disabled={this.state.saving}
                                    size="large"
                                    onClick={() => onClose(true)}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }

    private renderCatergorySelection(initialValue: any, formItemLayout: any): ReactNode {
        const {getFieldDecorator} = this.props.form;

        if (this.props.loading) {
            return <Spin/>
        }

        return (
            <Form.Item label="Category" hasFeedback {...formItemLayout}>
                {getFieldDecorator("category", {
                    rules: [{
                        message: "Please select category",
                        required: true
                    }],
                    initialValue
                })(
                    <Select onChange={this.handleCategoryChanged}>
                        {this.props.systemAppConfig
                            .filter(({category}) => category !== "KAMBI_APP")
                            .map(({category}) => (
                                <Select.Option key={category} value={category}>{category}</Select.Option>
                            ))}
                    </Select>
                )}
            </Form.Item>
        )
    }

    private renderProperties(properties: KeyValue[], formItemLayout: any) {
        const {systemAppConfig} = this.props
        if (systemAppConfig) {
            const config = systemAppConfig.find(value => value.category === this.state.category)

            if (config) {
                return (
                    <div>
                        {config.properties.map(({key, value}) => {
                            const initialValue: KeyValue | undefined = properties.find(kv => key === kv.key)
                            return this.renderFormInputField(key, value, initialValue && initialValue.value, formItemLayout)

                        })
                        }
                    </div>
                )
            }
        }

        return null;
    }

    private renderFormInputField(field: string, label: string, initialValue: any, formItemLayout: any) {
        const {getFieldDecorator} = this.props.form;


        const componentSelector = () => {
            if (field === "port") {
                return <InputNumber/>
            } else if (field === "host") {
                return (
                    <Select>
                        {this.props.environment.hosts
                            .map((host, index) => (
                                <Select.Option key={`host${index}`}
                                               value={"${env.host." + index + "}"}>{host}</Select.Option>
                            ))}
                    </Select>
                )
            } else {
                return <Input/>
            }
        }

        return (
            <Form.Item key={label} label={label} hasFeedback {...formItemLayout}>
                {getFieldDecorator(field, {
                    rules: [{
                        message: `Please input ${label}`,
                        required: true
                    }],
                    initialValue
                })(
                    componentSelector()
                )}
            </Form.Item>
        )
    }

    private handleCategoryChanged = (value: string) => {
        this.setState({category: value})
    }

    private handleSubmitForm = (e: FormEvent<any>) => {
        e.preventDefault()
        const {form, onSubmit, onClose, environment, app, systemAppConfig} = this.props;
        form.validateFields((err, formValues: any) => {
                if (!err && this.ensureUniqueAppName(formValues.shortName, environment, app)) {
                    const newApp: SystemAppInput = {
                        shortName: formValues.shortName,
                        longName: formValues.longName,
                        category: formValues.category,
                        properties: []
                    }
                    const config = systemAppConfig.find(sysAppConf => sysAppConf.category === this.state.category)
                    if (config) {
                        for (const {key} of config.properties) {
                            newApp.properties.push({key, value: formValues[key].toString()})
                        }
                    }
                    let envInput: EnvironmentInput
                    if (app) {
                        envInput = cloneEnv(environment, (id) => id !== app.id)
                    } else {
                        envInput = cloneEnv(environment)
                    }

                    envInput.systemApps.push(newApp)

                    onSubmit(environment.id, envInput)
                        .then(() => onClose(false))
                        .catch(error => this.setState({error: `Failed to add/update app to environment ${error}`, saving: false}))
                    this.setState({saving: true})
                }
            }
        )
    }

    private ensureUniqueAppName(shortName: string, env: Environment, existingApp?: SystemApp) {
        const collision = env.systemApps
            .filter(app => app.shortName === shortName) // find those with matching names
            .filter(app => !existingApp || app.id !== existingApp.id) // but not our self
            .length > 0;

        if (collision) {
            this.setState({error: `App with name ${shortName} already exist in environment, please select a unique shortname`})
        }
        return !collision
    }
}

const WrappedForm = Form.create<EditSystemAppDialogProps>()(EditSystemAppDialog)

export default WrappedForm
