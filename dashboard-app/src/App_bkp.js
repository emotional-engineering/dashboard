import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./body.css";
import { makeStyles } from "@material-ui/core/styles";
import { Layout } from "antd";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import Header from "./components/Header";
const API_URL = "http://localhost:4000";

/*
const CUBEJS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGT08iOiJCQVIiLCJpYXQiOjE1ODgwMTc1OTYsImV4cCI6MTU4ODEwMzk5Nn0.EqssXLCnVqPflmpC5uFUuKP8xkjb28ovaV0VN370iUk";
const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: `${API_URL}/cubejs-api/v1`
});

*/

let apiTokenPromise;

const cubejsApi = cubejs(() => {
    if (!apiTokenPromise) {
        apiTokenPromise = fetch(`${API_URL}/auth/cubejs-token`)
            .then(res => res.json()).then((responce) => {
                console.log("--- responce ----");
                console.log(responce);

                if (responce.error && responce.error == 'auth_fail') {
                    return false;
                } else {
                    return responce.token;
                }
            })
    }
    return apiTokenPromise;
}, {
    apiUrl: `${API_URL}/cubejs-api/v1`
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const AppLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <div>{children}</div>
    </div>
  );
};

// handleSubmit

class App extends Component {
//const App = ({ children }) => {

/*
    console.log("------- apiTokenPromise ---------");
    console.log(cubejsApi.transport.authorization);

    if (!cubejsApi.transport.authorization) {
        return <div>  no auth </div>;
    }
*/

    handleSignIn(data) {

        console.log("------ handleSignIn --------");
        console.log(data);

    }

    render() {

        return (<SignIn handleSubmit={this.handleSignIn}>)

        /*return (<CubeProvider cubejsApi = {cubejsApi}>
                   <AppLayout> {children} </AppLayout>
               </CubeProvider>)*/
    }
};


export default App;