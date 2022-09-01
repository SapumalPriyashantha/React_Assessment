import React,{Component, Fragment} from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Edit';
import CustomerService from "../../services/CustomerServices";
import GDSESnackBar from "../../component/SnackBar";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            userSingInForm: {
                name: {
                    firstname: '',
                    lastname: '',
                },
                username: '',
                password: '',
                email: '',
                phone: '',
                address: {
                    city: '',
                    street: '',
                    number: '',
                    zipcode: '',
                    geolocation: {
                        lat: '',
                        long: ''
                    }
                }
            },
            btnStatus: 'SAVE',
            data: [],
        }
    }

    clearFields = () => {
        this.setState({
            userSingInForm: {
                name: {
                    firstname: '',
                    lastname: '',
                },
                username: '',
                password: '',
                email: '',
                phone: '',
                address: {
                    city: '',
                    street: '',
                    number: '',
                    zipcode: '',
                    geolocation: {
                        lat: '',
                        long: ''
                    }
                }
            },
            btnStatus: 'SAVE'
        });
    };

    CustomerSave = async () => {
        if (this.state.btnStatus === 'SAVE') {
            let userSingInForm = this.state.userSingInForm;
            let response = await CustomerService.saveCustomer(userSingInForm);
            if (response.status === 200) {
                await this.loadAllCustomers()
                this.clearFields();
                this.setState({
                    open: true,
                    message: 'User Saved Successfully!',
                    severity: 'success'
                })
            } else {
                this.setState({
                    open: true,
                    message: 'User Saving Failed!',
                    severity: 'error'
                })
            }
        } else {
            let userSingInForm = this.state.userSingInForm;
            let response = await CustomerService.putCustomer(userSingInForm, this.state.id);
            if (response.status === 200) {
                this.setState({
                    btnStatus: 'SAVE'
                })
                await this.loadAllCustomers()
                this.clearFields();
                this.setState({
                    open: true,
                    message: 'User Updated Successfully!',
                    severity: 'success'
                })
            } else {
                this.setState({
                    open: true,
                    message: 'User Updating Failed!',
                    severity: 'error'
                })
            }
        }
    }

    updateCustomer = (data) => {
        this.setState({
            id: data.id,
            userSingInForm: {
                name: {
                    firstname: data.name.firstname,
                    lastname: data.name.lastname,
                },
                username: data.username,
                password: data.password,
                email: data.email,
                phone: data.phone,
                address: {
                    city: data.address.city,
                    street: data.address.street,
                    number: data.address.number,
                    zipcode: data.address.zipcode,
                    geolocation: {
                        lat: data.address.geolocation.lat,
                        long: data.address.geolocation.long
                    }
                }
            },
            btnStatus: 'UPDATE',
            open: false,
            message: '',
            severity: ''
        });
    }

    deleteCustomer = async (id) => {
        let params = {
            id: id
        }
        let response = CustomerService.deleteCustomer(params);
        if (response.status === 200) {
            await this.loadAllCustomers()
            this.setState({
                open: true,
                message: 'User Delete Successfully!',
                severity: 'success'
            })
        } else {
            this.setState({
                open: true,
                message: 'User Delete Failed!',
                severity: 'error'
            })
        }
    }

    loadAllCustomers = async () => {
        let response = await CustomerService.getAllCustomers();
        if (response.status === 200) {
            this.setState({
                data: response.data
            })
        }
    }

    componentDidMount() {
        this.loadAllCustomers();
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.container}>

                    <ValidatorForm className={classes.validatorForm_container} ref="form" onSubmit={this.CustomerSave}>
                        <Typography variant="h4" gutterBottom className={classes.validatorForm_title_container}>
                            User Registration
                        </Typography>
                        <div className={classes.form_column}>
                            <div className={classes.form_column_field}>
                                <div >
                                    <TextValidator
                                        id="firstName"
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userSingInForm.name.firstname}
                                        onChange={(e) => {
                                            let userSingInForm = this.state.userSingInForm;
                                            userSingInForm.name.firstname = e.target.value
                                            this.setState({userSingInForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div>
                                    <TextValidator
                                        id="email"
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userSingInForm.email}
                                        onChange={(e) => {
                                            let userSingInForm = this.state.userSingInForm;
                                            userSingInForm.email = e.target.value
                                            this.setState({userSingInForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div >
                                    <TextValidator
                                        id="password"
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userSingInForm.password}
                                        onChange={(e) => {
                                            let userSingInForm = this.state.userSingInForm;
                                            userSingInForm.password = e.target.value
                                            this.setState({userSingInForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div >
                                    <TextValidator
                                        id="street"
                                        label="Street"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userSingInForm.address.street}
                                        onChange={(e) => {
                                            let userSingInForm = this.state.userSingInForm;
                                            userSingInForm.address.street = e.target.value
                                            this.setState({userSingInForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div >
                                    <TextValidator
                                        id="zipCode"
                                        label="Zip Code"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userSingInForm.address.zipcode}
                                        onChange={(e) => {
                                            let userSingInForm = this.state.userSingInForm;
                                            userSingInForm.address.zipcode = e.target.value
                                            this.setState({userSingInForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div >
                                    <TextValidator
                                        id="longValue"
                                        label="Long Value"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userSingInForm.address.geolocation.long}
                                        onChange={(e) => {
                                            let userSingInForm = this.state.userSingInForm;
                                            userSingInForm.address.geolocation.long = e.target.value
                                            this.setState({userSingInForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                            </div>
                            <div className={classes.form_column_field}>
                                <div>
                                    <TextValidator
                                        id="lastName"
                                        label="Last Name"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userSingInForm.name.lastname}
                                        onChange={(e) => {
                                            let userSingInForm = this.state.userSingInForm;
                                            userSingInForm.name.lastname = e.target.value
                                            this.setState({userSingInForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div >
                                    <TextValidator
                                        id="username"
                                        label="User Name"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userSingInForm.username}
                                        onChange={(e) => {
                                            let userSingInForm = this.state.userSingInForm;
                                            userSingInForm.username = e.target.value
                                            this.setState({userSingInForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div >
                                    <TextValidator
                                        id="city"
                                        label="City"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userSingInForm.address.city}
                                        onChange={(e) => {
                                            let userSingInForm = this.state.userSingInForm;
                                            userSingInForm.address.city = e.target.value
                                            this.setState({userSingInForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div >
                                    <TextValidator
                                        id="streetNumber"
                                        label="street Number"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userSingInForm.address.number}
                                        onChange={(e) => {
                                            let userSingInForm = this.state.userSingInForm;
                                            userSingInForm.address.number = e.target.value
                                            this.setState({userSingInForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div >
                                    <TextValidator
                                        id="latValue"
                                        label="Lat Value"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userSingInForm.address.geolocation.lat}
                                        onChange={(e) => {
                                            let userSingInForm = this.state.userSingInForm;
                                            userSingInForm.address.geolocation.lat = e.target.value
                                            this.setState({userSingInForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div >
                                    <TextValidator
                                        id="mobileNumber"
                                        label="Mobile Number"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userSingInForm.phone}
                                        onChange={(e) => {
                                            let userSingInForm = this.state.userSingInForm;
                                            userSingInForm.phone = e.target.value
                                            this.setState({userSingInForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.form_btn}>
                            <Button variant="outlined" color="error" size="large" onClick={() => {this.clearFields()}}>
                                Clear
                            </Button>
                            <Button variant="outlined" size="large" type="submit"  sx={{marginLeft: "10px"}}>
                                {this.state.btnStatus}
                            </Button>
                        </div>
                    </ValidatorForm>

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

                    <div className={classes.table_container}>
                        <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 650 }} aria-label="customer table" stickyHeader >
                                <TableHead >
                                    <TableRow>
                                        <TableCell align="left">First Name</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">City</TableCell>
                                        <TableCell align="left">Mobile Number</TableCell>
                                        <TableCell align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {

                                        this.state.data.map((row) => (
                                            <TableRow>
                                                <TableCell align="left">{row.name.firstname}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.address.city}</TableCell>
                                                <TableCell align="left">{row.phone}</TableCell>
                                                <TableCell align="left">
                                                    <Tooltip title="Update">
                                                        <IconButton onClick={() => {
                                                            this.updateCustomer(row);
                                                        }}
                                                        >
                                                            <UpdateIcon color="primary" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            onClick={() => {
                                                                this.deleteCustomer(row.id)
                                                            }}
                                                        >
                                                            <DeleteIcon color="error" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                </div>
            </Fragment>
        );
    }

}

export default withStyles(styleSheet)(SignIn)