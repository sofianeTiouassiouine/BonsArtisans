import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import API from "../../utils/API";
import Paper from "@material-ui/core/Paper";

export class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  signup = () =>{
    window.location = "/signup";
  };
  send = async () => {
    const { email, password } = this.state;
    if (!email || email.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }
    try {
      const { data } = await API.login(email, password);
      localStorage.setItem("token", data.token);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="Login">
        
        <Paper style={{ marginTop: 30, padding: 10 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">Login</Typography>
          </Toolbar>
        </AppBar>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={this.send} block  type="submit">
          Connexion
        </Button>
        OR
        <Button onClick={this.signup} block  type="submit">
          Signup
        </Button>
        </Paper >
      </div>
    );
  }
}
