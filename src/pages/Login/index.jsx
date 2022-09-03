import React, {Fragment,Component} from "react";
import {Typography, TextField, Button} from "@mui/material";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import CustomerService from "../../services/CustomerServices";
import LocalStorageService from "../../services/LocalStorageServices";
import GDSESnackBar from "../../component/SnackBar";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                username: '',
                password: ''
            },
            open: false,
            message: '',
            severity: ''
        }
    }

    loginCustomer = async () => {
        let formData = this.state.formData;
        let response = await CustomerService.loginCustomer(formData);
        if (response.status === 200) {
            LocalStorageService.setItem('accessToken', response.data.token)
            return true
        } else {
            return false
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.container}>
                    <div className={classes.sub_container}>
                        <Typography
                            className={classes.title_container}
                            variant="h3"
                            gutterBottom
                        >
                            Login
                        </Typography>
                        <div className={classes.login_cover}>
                            <TextField
                                id="username"
                                label="User Name"
                                type="text"
                                fullWidth
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.username = e.target.value
                                    this.setState({formData})
                                }}
                            />
                            <TextField
                                id="password"
                                label="Password"
                                type="Password"
                                fullWidth
                                onChange={(e) => {
                                    let formData = this.state.formData;
                                    formData.password = e.target.value
                                    this.setState({formData})
                                }}
                            />
                            <Button
                                className={classes.login_btn}
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={async () => {
                                    let login = await this.loginCustomer();
                                    if(login){
                                        this.setState({
                                            open: true,
                                            message: 'User credential matching success!',
                                            severity: 'success'
                                        })
                                        window.open("home", "_self")
                                    }else {
                                        this.setState({
                                            open: true,
                                            message: 'Incorrect username & password',
                                            severity: 'error'
                                        })
                                    }

                                }}
                            >
                                Login
                            </Button>
                            <div  className={classes.nav_user_div}>
                                <Typography
                                    className={classes.nav_user_h7}
                                      variant="h7"
                                      gutterBottom
                                >
                                     Create New Account?
                                </Typography>
                                <Button
                                    className={classes.nav_user_btn}
                                    size="large"
                                    href="signIn"
                                >
                                    Click Here
                                </Button>
                            </div>
                        </div>
                    </div>
                    <GDSESnackBar
                        open={this.state.open}
                        onClose={() => {
                            this.setState({ open: false })
                        }}
                        message={this.state.message}
                        autoHideDuration={3000}
                        severity={this.state.severity}
                        variant="filled"
                    />
                </div>
            </Fragment>
        );
    }
}
export default withStyles(styleSheet)(Login)