import React, {Component, Fragment} from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ProductService from "../../services/ProductService";
import CartService from "../../services/CartService";
import CustomerService from "../../services/CustomerServices";
import GDSESnackBar from "../../component/SnackBar";
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartForm: {
                userId: '',
                date: React.useState<Dayjs | null>(null),
                products:[{
                    productId:'',
                    quantity:''
                }],
            },
            products: [],
            users: [],

            open: false,
            message: '',
            severity: ''
        }
    }

    CartSave = async () => {
        let cartForm = this.state.cartForm;
        let response = await CartService.saveCart(cartForm);
        if (response.status === 200) {
            this.clearFields()
            this.setState({
                open: true,
                message: 'Cart Saved Successfully!',
                severity: 'success'
            })
        } else {
            this.setState({
                open: true,
                message: 'Cart Saving Failed',
                severity: 'error'
            })
        }
    }

    clearFields = () => {
        this.setState({
            cartForm: {
                date: React.useState<Dayjs | null>(null),
                products: [{quantity:''}],
            }
        })
    }

    setAllProductTitles = async () => {
        let response = await ProductService.getAllProducts();
        if (response.status === 200) {
            this.setState({
                products: response.data
            })
        }
    }

    setAllCustomers = async () => {
        let response = await CustomerService.getAllCustomers();
        if (response.status === 200) {
            this.setState({
                users: response.data
            })
        }
    }

    async componentDidMount() {
        await this.setAllCustomers()
        await this.setAllProductTitles()
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.container}>

                    <ValidatorForm className={classes.validatorForm_container} ref="form" onSubmit={this.CartSave}>

                        <Typography variant="h4" gutterBottom className={classes.validatorForm_title_container}>
                            Cart Manage
                        </Typography>

                        <div className={classes.form_column}>

                            <div className={classes.form_column_field}>

                                <FormControl className={classes.form_column_field_formControl}>
                                    <InputLabel id="user_name">
                                        User Name
                                    </InputLabel>
                                    <Select
                                        labelId="user_name"
                                        id="user_name_select"
                                        label="User Name"
                                        onChange={(e) => {
                                            let cartForm = this.state.cartForm;
                                            cartForm.userId = e.target.value;
                                            this.setState({cartForm})
                                        }}
                                    >
                                        {this.state.users.map((user) => (
                                            <MenuItem value={user.id}>
                                                {user.name.firstname + " " + user.name.lastname}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl  className={classes.form_column_field_formControl}>
                                    <InputLabel id="product_title">
                                        Product Title
                                    </InputLabel>
                                    <Select
                                        labelId="product_title"
                                        id="product_title_select"
                                        label="Product Title"
                                        onChange={(e) => {
                                            let cartForm = this.state.cartForm;
                                            cartForm.products[0].productId = e.target.value;
                                            this.setState({cartForm})
                                        }}
                                    >
                                        {this.state.products.map((product) => (
                                            <MenuItem value={product.id}>
                                                {product.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>

                            <div className={classes.form_column_field}>

                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        className={classes.form_column_field_datePicker}
                                        label="Date"
                                        value={this.state.cartForm.date}
                                        onChange={(e) => {
                                            let cartForm = this.state.cartForm;
                                            cartForm.date = e
                                            this.setState({cartForm})
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                                <div>
                                    <TextValidator
                                        className={classes.form_column_field_TextValidator}
                                        id="Qty"
                                        label="Qty"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.cartForm.products[0].quantity}
                                        onChange={(e) => {
                                            let cartForm = this.state.cartForm;
                                            cartForm.products[0].quantity = +(e.target.value)
                                            this.setState({cartForm})
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
                            <Button variant="outlined" size="large" type="submit" className={classes.form_btn_save} >
                                Save
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
                </div>
            </Fragment>
        );
    }
}
export default withStyles(styleSheet)(Cart)