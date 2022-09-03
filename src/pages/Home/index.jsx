import React, {Component, Fragment} from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import NavBar from "../../component/navBar";
import CartService from "../../services/CartService";
import ProductService from "../../services/ProductService";
import CustomerService from "../../services/CustomerServices";
import LocalStorageService from "../../services/LocalStorageServices";
import jwt_decode from "jwt-decode";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users_length: '00',
            products_length: '00',
            carts_length: '00',
            username: ''
        }
    }

    setCartsTotal = async () => {
        let response = await CartService.getAllCarts();
        if (response.status === 200) {
            this.setState({
                carts_length: response.data.length
            })
        }
    }

    setProductsTotal = async () => {
        let response = await ProductService.getAllProducts();
        if (response.status === 200) {
            this.setState({
                products_length: response.data.length
            })

        }
    }

    setUsersTotal = async () => {
        let response = await CustomerService.getAllCustomers();
        if (response.status === 200) {
            this.setState({
                users_length: response.data.length
            })

        }
    }

    setUsername = async () => {
        const accessToken = await LocalStorageService.getItem('accessToken')
        const decoded = jwt_decode(accessToken);

        this.setState({
            username: decoded.user
        })
    }

    async componentDidMount() {
        await this.setUsername()
        await this.setUsersTotal()
        await this.setProductsTotal()
        await this.setCartsTotal()
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <NavBar username={this.state.username}/>
                <div className={classes.container}>
                    <div className={classes.sub_container}>
                        <div className={classes.card_container}>
                            <h1>Users</h1>
                            <h1>{this.state.users_length}</h1>
                        </div>
                        <div className={classes.card_container}>
                            <h1>Products</h1>
                            <h1>{this.state.products_length}</h1>
                        </div>
                        <div className={classes.card_container}>
                            <h1>cart</h1>
                            <h1>{this.state.carts_length}</h1>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default withStyles(styleSheet)(Home)