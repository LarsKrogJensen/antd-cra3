import React from "react"

interface Props {
    refetch: () => void
    interval: number
}

export default class Polly extends React.Component<Props> {
    private timer?: any;

    public componentDidMount(): void {
        this.timer = setInterval(this.props.refetch, this.props.interval);
    }

    public componentWillUnmount(): void {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    public render() {
        return this.props.children;
    }

}

