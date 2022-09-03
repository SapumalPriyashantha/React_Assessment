import React, { Component } from "react";
import {styleSheet} from "./style.js";
import { withStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

class NavBar extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return(
            <AppBar position="fixed">
                <CssBaseline />
                <Toolbar className={classes.container}>
                    <div className={classes.sub_containers}>
                        <Box>
                            <Link href="/home" className={classes.nav_link}  style={{fontSize : '25px'}}>
                                DASHBOARD
                            </Link>
                        </Box>
                    </div>
                    <div className={classes.sub_containers}>
                        <Box>
                            <Link href="/product" className={classes.nav_link}  style={{fontSize : '25px'}}>
                                PRODUCT
                            </Link>
                        </Box>
                    </div>
                    <div className={classes.sub_containers}>
                        <Box>
                            <Link href="/cart" className={classes.nav_link}  style={{fontSize : '25px'}}>
                                CART
                            </Link>
                        </Box>
                    </div>
                    <div className={classes.sub_containers}>
                        <Typography
                            className={classes.nav_userName}
                            style={{fontSize : '25px'}}
                            variant="h6"
                        >
                            {this.props.username}
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}
export default withStyles(styleSheet)(NavBar)
