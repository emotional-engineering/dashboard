import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import "./body.css";
import { makeStyles } from "@material-ui/core/styles";
import { Layout } from "antd";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
const API_URL = "http://localhost:4000";

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

class App extends Component {

    state = {
        cubejsApi : false
    }

    handleToken(token) {

        console.log(token)

        const cubejsApi = cubejs(token, {
            apiUrl: `${API_URL}/cubejs-api/v1`
        });

        this.setState({cubejsApi});
    }

    render() {

        if (!this.state.cubejsApi) {
            return <SignIn apiUrl={API_URL} handleToken={this.handleToken.bind(this)}/>;
        }

        return <CubeProvider cubejsApi = {this.state.cubejsApi}>
                   <AppLayout> {this.props.children} </AppLayout>
               </CubeProvider>
    }
};

export default App;