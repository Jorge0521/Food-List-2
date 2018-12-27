// src/Callback/Callback.js

import React, { Component } from "react";
import Auth from "./Auth";

class Callback extends Component {
  componentDidMount() {
    const auth = new Auth();
    auth.handleAuthentication();
  }
  render() {
    return (
      <div>
        <img src={"loading"} alt="loading" />
      </div>
    );
  }
}

export default Callback;
