import React from "react";
import {
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import Food from "./Food.js";
import Auth from "../Auth/Auth";
import Callback from "../Auth/Callback";

const Protected = () => <h3>Protected</h3>;

const auth = new Auth();

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };
  login = () => {
    auth.login(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  };
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={auth.login}>Log in</button>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const AuthButton = withRouter(
  ({ history }) =>
    auth.isAuthenticated() ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            auth.logout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

const Routes = () => (
  <div>
    <Route
      path="/LA"
      render={props => <Food {...props} loc="Los Angeles" locAb="LA" />}
    />
    <Route
      path="/SF"
      render={props => <Food {...props} loc="San Fransisco" locAb="SF" />}
    />

    <Route path="/Login" component={Login} />
    <PrivateRoute path="/protected" component={Protected} />
    <Route
      path="/callback"
      render={props => {
        // handleAuthentication(props);
        return <Callback {...props} />;
      }}
    />
  </div>
);

export default Routes;
