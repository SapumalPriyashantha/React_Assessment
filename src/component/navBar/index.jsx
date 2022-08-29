import React, { Component } from "react";
import {styleSheet} from "./style.js";
import { withStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";

class NavBar extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return(
            <AppBar position="fixed">
                <CssBaseline />
                <Toolbar>
                    <div className={classes.logo}>
                        <Box>
                            <Link href="/homepage" style={{color:"white" ,
                                marginLeft:"15px" ,
                                textDecoration: "none" ,
                                fontSize: "30px"}}
                            >Dashboard</Link>
                        </Box>
                    </div>

                    <div className={classes.navLinks}>
                        <Box>
                            <Link href="/product"
                                  className={classes.link}
                                  style={{color:"#010809" ,
                                      marginLeft:"15px" ,
                                      textDecoration: "none"}}
                            >Product</Link>
                        </Box>
                    </div>
                    <div className={classes.navLinks}>
                        <Box>
                            <Link href="/cart"
                                  className={classes.link}
                                  style={{color:"#010809"
                                      ,marginLeft:"15px" ,
                                      textDecoration: "none"}}
                            >Cart</Link>
                        </Box>
                    </div>
                    <Tabs value={1} sx={{margin: 'auto', mr: 1, display: 'flex', alignItems: "center"}}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 1,
                                display: {xs: 'none', md: 'flex'},
                                fontWeight: 700,
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '25px',
                                marginRight: '10px',
                            }}
                        >{this.props.username}
                        </Typography>
                        <Link href="/" style={{textDecoration: 'none'}}>
                            <Button style={{
                                textTransform: 'none',
                                color: 'red',
                                marginLeft: '5px',
                                fontSize: 'medium'
                            }}>Logout</Button>
                        </Link>
                    </Tabs>
                </Toolbar>
            </AppBar>
        )
    }
}
export default withStyles(styleSheet)(NavBar)
