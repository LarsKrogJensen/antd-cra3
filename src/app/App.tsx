import * as React from 'react'
import {Redirect, Route, Router, Switch} from "react-router-dom"
import "./app.less"
import AppBody from "app/AppBody";
import {ApolloProvider} from "react-apollo";
import apolloClient from "api/api";
import {LocaleProvider} from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import {createHashHistory} from "history";

const hashHistory = createHashHistory({
    basename: '/'
});

const App = () => (
    <ApolloProvider client={apolloClient}>
        <Router history={hashHistory}>
            <LocaleProvider locale={enUS}>
                <Switch>
                    <Redirect exact path="/" to="/env/default"/>
                    <Route path="/env/:id" render={(props) => {
                        return (
                            <AppBody id={props.match.params.id}
                                     onNavigate={(path: string) => props.history.push(path)}/>
                        )
                    }}/>
                </Switch>
            </LocaleProvider>
        </Router>
    </ApolloProvider>
)


export default App
