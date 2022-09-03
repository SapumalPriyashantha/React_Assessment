import React, {Component, Fragment} from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ProductService from "../../services/ProductService";
import GDSESnackBar from "../../component/SnackBar";


class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productForm: {
                title: '',
                price: '',
                description: '',
                image: '',
                category: '',
            },
            category:[],
            open: false,
            message: '',
            severity: ''
        }
    }

    ProductSave = async () => {
        let productForm = this.state.productForm;
        let response = await ProductService.saveProduct(productForm)
        if (response.status === 200) {
            this.clearFields();
            this.setState({
                open: true,
                message: 'Product Saved Successfully!',
                severity: 'success'
            })
        } else {
            this.setState({
                open: true,
                message: 'Product Saving Failed',
                severity: 'error'
            })
        }
    }

    clearFields = () => {
        this.setState({
            productForm: {
                title: '',
                price: '',
                description: '',
                image: '',
                category: '',
            },
            open: false,
            message: '',
            severity: ''
        })
    }

    getALLCategories = async ()=>{
        let response = await ProductService.getAllCategory();
        if (response.status === 200) {
            this.setState({
                category: response.data
            })
        }
    }

    async componentDidMount() {
        await this.getALLCategories()
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.container}>
                    <ValidatorForm className={classes.validatorForm_container} ref="form" onSubmit={this.ProductSave}>

                        <Typography variant="h4" gutterBottom className={classes.validatorForm_title_container}>
                            Product Manage
                        </Typography>


                        <div className={classes.form_column}>

                            <div className={classes.form_column_field}>
                                <div>
                                    <TextValidator
                                        id="Title"
                                        label="Title"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.productForm.title}
                                        onChange={(e) => {
                                            let productForm = this.state.productForm;
                                            productForm.title = e.target.value;
                                            this.setState({productForm})
                                        }}
                                        validators={['required']}/>
                                </div>
                                <FormControl className={classes.form_column_field_formControl}>
                                    <InputLabel id="product_category">
                                        Category
                                    </InputLabel>
                                    <Select
                                        labelId="product_category"
                                        id="product_category_select"
                                        label="Product Category"
                                        onChange={(e) => {
                                            let productForm = this.state.productForm;
                                            productForm.category = this.state.category[e.target.value];
                                            this.setState({productForm})
                                        }}
                                    >
                                        {this.state.category.map((category,index) => (
                                            <MenuItem value={index}>{category}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button className={classes.form_column_field_btn}
                                        variant="contained"
                                        component="label"
                                        fullWidth
                                >
                                    Choose Image
                                    <input hidden accept="image/*" multiple type="file"
                                           onChange={(e) => {
                                               let productForm = this.state.productForm;
                                               productForm.image = e.target.value;
                                               this.setState({productForm})
                                           }}
                                    />
                                </Button>
                            </div>


                            <div className={classes.form_column_field}>
                                <div>
                                    <TextValidator
                                        id="price"
                                        label="Price"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                        value={this.state.productForm.price}
                                        onChange={(e) => {
                                            let productForm = this.state.productForm;
                                            productForm.price = e.target.value;
                                            this.setState({productForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div>
                                    <TextValidator
                                        className={classes.form_column_field_TextValidator}
                                        id="description"
                                        label="Description"
                                        variant="outlined"
                                        multiline
                                        fullWidth
                                        rows={5}
                                        value={this.state.productForm.description}
                                        onChange={(e) => {
                                            let productForm = this.state.productForm;
                                            productForm.description = e.target.value;
                                            this.setState({productForm})
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
export default withStyles(styleSheet)(Product)