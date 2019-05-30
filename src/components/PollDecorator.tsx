import * as React from 'react';

export const withRefetchPolling = (refetch: () => void, interval: number) =>
    <TOriginalProps extends {}>(Component: (React.ComponentClass<TOriginalProps> | React.StatelessComponent<TOriginalProps>)) => {
        return class PollDecorator extends React.Component<TOriginalProps> {
            private timer?: any;

            public componentDidMount(): void {
                this.timer = setInterval(refetch, interval);
            }

            public componentWillUnmount(): void {
                if (this.timer) {
                    clearInterval(this.timer)
                }
            }

            public render(): JSX.Element {
                return <Component {...this.props}/>
            }
        };
    }
