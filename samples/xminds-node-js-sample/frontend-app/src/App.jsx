import React, { Component } from "react";
import "./App.css";
import { ApiClient } from "xminds-sdk-js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshToken: "",
            recommendations: [],
            alertOpen: false,
            alertSeverity: "",
            alertMessage: ""
        }
    }

    async login() {
        const url = "http://localhost:8000/api/xminds/loginService";
        const response = await fetch(url, {
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(
                {
                    frontendUserId: this.state.userId
                }
            )
        });
        return response.json();
    }

    getRecommendations() {
        if (this.state.refreshToken == "") {
            this.login(this.state.userId)
                .then(response => {
                    this.setState({ refreshToken: response.refresh_token },
                        () => this.getRecommendationsUserToItems(this.state.userId)
                    );
                })
                .catch(err => err);
        } else {
            this.getRecommendationsUserToItems(this.state.userId);
        }
    }

    getRecommendationsUserToItems() {
        // Get Recommendations
        const client = this.getClient(this.state.refreshToken);
        client.getRecommendationsUserToItems(this.state.userId)
            .then(data => {
                this.setState({
                    alertOpen: true,
                    alertMessage: 'Congrats! You got Crossing Minds recommendations',
                    alertSeverity: 'success'
                });
                this.fillRecommendations(data.items_id);
            })
            .catch(err => {
                let message = "Error retrieving recommendations: " + err.message;
                if (!this.state.refreshToken || this.state.refreshToken == "")
                    message = "Refresh Token not created. Check API credentials!";
                this.setState({
                    alertOpen: true,
                    alertMessage: message,
                    alertSeverity: "error",
                    recommendations: []
                });
            });
    }

    getClient(refreshToken) {
        const opts = {
            userAgent: "MVP_USER_AGENT", // Optional parameter
            refreshToken: refreshToken
        };
        // Initialize and return the client
        return new ApiClient(opts);
    }

    fillRecommendations(itemsId = []) {
        let recos = [];
        itemsId.forEach(itemId => {
            recos.push(
                this.createData(
                    itemId,
                    'Title for ' + itemId,
                    'Description for ' + itemId,
                    this.randomNumber(1, 99),
                    'http://fakedomain.store.net/items/detail/' + itemId
                ))
        });
        this.setState({ recommendations: recos })
    }

    createData(itemId, title, description, price, url) {
        return { itemId, title, description, price, url };
    }

    randomNumber(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2);
    }

    handleChange = event => {
        this.setState({ userId: event.target.value });
    }

    handleSubmit = event => {
        this.getRecommendations();
    }

    handleClose = event => {
        if (event === 'clickaway') {
            return;
        }
        this.setState({ alertOpen: false })
    };

    render() {
        return (
            <div className="App">

                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch', display: "flex" }, }} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="User Id" variant="standard" value={this.state.userId} onChange={this.handleChange} />
                    <Button variant="outlined" size="small" onClick={() => { this.handleSubmit(); }}>Get Recos</Button>
                </Box>

                <Divider variant="middle" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell size="medium">Item ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>URL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.recommendations.map((reco) => (
                                <TableRow key={reco.itemId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="reco">
                                        {reco.itemId}
                                    </TableCell>
                                    <TableCell>{reco.title}</TableCell>
                                    <TableCell>{reco.description}</TableCell>
                                    <TableCell>{reco.price} US$</TableCell>
                                    <TableCell>{reco.url}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar open={this.state.alertOpen} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert severity={this.state.alertSeverity}>
                        {this.state.alertMessage}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default App;