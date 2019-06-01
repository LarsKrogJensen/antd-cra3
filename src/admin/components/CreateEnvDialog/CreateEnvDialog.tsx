import React, {FormEvent} from "react"
import {Alert, Button, Col, Form, Icon, Input, InputNumber, Modal, Row} from "antd"
import {FormComponentProps} from "antd/lib/form/Form"
import {Environment, EnvironmentInput} from "api/typings"
import {cloneEnv} from "api/conversion"
import "./styles.less"

interface CreateEnvDialogProps extends FormComponentProps {
    envToClone?: Environment
    onComplete: (createdEnvId?: string) => void
    onSubmit: (env: EnvironmentInput) => Promise<any>
}

interface CreateEnvDialogState {
    error?: string
    hostKeys: number[],
    hostValues: any
    saving: boolean
}

class CreateEnvironmentDialog extends React.Component<CreateEnvDialogProps, CreateEnvDialogState> {
    private uuid = 0

    constructor(props: CreateEnvDialogProps, context: any) {
        super(props, context)

        this.uuid = props.envToClone ? props.envToClone.hosts.length : 0
        const initialHostKeys: number[] = []
        const initialHostValues: any = {}
        if (props.envToClone) {
            props.envToClone.hosts.forEach((host, index) => {
                initialHostKeys.push(index)
                initialHostValues[`host${index}`] = host
            })
        } else {
            initialHostKeys.push(1)
            initialHostValues["host1"] = ""
        }

        this.state = {
            hostKeys: initialHostKeys,
            hostValues: initialHostValues,
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
        }

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 14, offset: 6},
            },
        }

        const {getFieldDecorator} = this.props.form
        const error = this.state.error
        const envToClone = this.props.envToClone
        return (
            <Modal title={envToClone ? "Clone Environment" : "New Environment"}
                   onCancel={() => this.props.onComplete()}
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
                            initialValue: envToClone && envToClone.shortName
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
                            initialValue: envToClone && envToClone.longName
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="Team" hasFeedback {...formItemLayout}>
                        {getFieldDecorator("team", {
                            rules: [{
                                message: "Please input team",
                                required: true
                            }],
                            initialValue: envToClone && envToClone.team
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Input.Group>
                        <Form.Item label="Poll Interval" hasFeedback={false} {...formItemLayout}>
                            {getFieldDecorator("pollIntervalInSec", {
                                rules: [{
                                    message: "Please input poll interval",
                                    required: true
                                }],
                                initialValue: (envToClone && envToClone.pollIntervalInSec) || 10
                            })(
                                <InputNumber min={3} max={60}/>
                            )}
                            <span style={{marginLeft: 8}}>Seconds</span>
                        </Form.Item>
                    </Input.Group>
                    {this.renderHostItems(formItemLayout, formItemLayoutWithOutLabel)}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.handleAddHost} style={{width: "60%"}}>
                            <Icon type="plus"/> Add host
                        </Button>
                    </Form.Item>
                    <Row>
                        {error && <Alert message={`Failed to create environment ${error}`} type="error"/>}
                    </Row>
                    <Row style={{marginTop: 16}}>
                        <Col span={24} style={{textAlign: "right"}}>
                            <Button type="primary"
                                    htmlType="submit"
                                    loading={this.state.saving}
                                    disabled={this.state.saving}
                                    size="large">OK</Button>
                            <Button style={{marginLeft: 8}}
                                    size="large"
                                    disabled={this.state.saving}
                                    onClick={() => this.props.onComplete()}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }

    private renderHostItems(formItemLayout: any, formItemLayoutWithOutLabel: any) {
        const {getFieldDecorator, getFieldValue} = this.props.form
        const {hostKeys, hostValues} = this.state

        getFieldDecorator("keys", {initialValue: hostKeys})

        const keys: number[] = getFieldValue("keys")
        return keys.map((key, index) => (
            <Form.Item key={index}
                       label={index === 0 ? "Hosts" : ""}
                       {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}>
                {getFieldDecorator(`host${key}`, {
                    rules: [{
                        message: "Please input host",
                        required: true
                    }],
                    initialValue: hostValues[`host${key}`]
                })(
                    <Input placeholder='host'
                           style={{width: "85%", marginRight: 8}}/>
                )}
                {keys.length > 1 ? (
                    <Icon className="dynamic-delete-button"
                          type="minus-circle-o"
                          onClick={() => this.handleRemoveHost(key)}
                    />
                ) : null}
            </Form.Item>
        ))

    }

    private handleRemoveHost = (k: number) => {
        const {form} = this.props
        // can use data-binding to get
        const keys = form.getFieldValue("keys")
        // We need at least one passenger
        if (keys.length === 1) {
            return
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter((key: any) => key !== k),
        })
    }

    private handleAddHost = () => {
        this.uuid++
        const {form} = this.props
        const keys: number[] = form.getFieldValue("keys")
        const nextKeys: number[] = keys.concat(this.uuid)
        form.setFieldsValue({
            keys: nextKeys,
        })
    }

    private handleSubmitForm = (e: FormEvent<any>) => {
        e.preventDefault()
        const {form, onSubmit, onComplete, envToClone} = this.props
        form.validateFields((err, value) => {
                if (!err) {
                    let envInput: EnvironmentInput
                    const hosts: string[] = Object.entries(value)
                        .filter(([k]) => k.startsWith("host"))
                        .map(([, v]) => v.toString())
                    if (envToClone) {
                        envInput = {
                            ...cloneEnv(envToClone),
                            pollIntervalInSec: value.pollIntervalInSec,
                            shortName: value.shortName,
                            longName: value.longName,
                            team: value.team,
                            hosts: hosts
                        }
                    } else {
                        envInput = {
                            shortName: value.shortName,
                            longName: value.longName,
                            team: value.team,
                            pollIntervalInSec: value.pollIntervalInSec,
                            hosts,
                            kambiApps: [],
                            systemApps: []
                        }
                    }
                    onSubmit(envInput)
                        .then(res => onComplete(res.data.createEnvironment.environment.id))
                        .catch(error => this.setState({error, saving: false}))
                    this.setState({saving: true})
                }
            }
        )
    }
}

const WrappedForm = Form.create<CreateEnvDialogProps>()(CreateEnvironmentDialog)

export default WrappedForm
