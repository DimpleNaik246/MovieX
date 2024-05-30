import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Container, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Subscription.css';
import { Navigate, Route, useNavigate } from "react-router-dom";

const theme = createTheme();

export function SubScribePage({ setPlan }) {
    const navigateToCart = useNavigate();
    

    function buyAction(selectedPlan){
        setPlan(selectedPlan);
        navigateToCart('/cart');
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="background-page">
                <Container>
                    <Grid container spacing={3} style={{ marginTop: '200px' }}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom style={{color:"rgb(245, 197, 24)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                Select your Plan
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Card className="card-plan" >
                                <CardContent>
                                    <div className="heading-card">
                                        <Typography variant="h5" className="typo">Basic</Typography>
                                        <Typography variant="body1">
                                            $100
                                        </Typography>
                                    </div>
                                    
                                    <Typography variant="body" className="typo-content">
                                        720p
                                    </Typography><br></br>

                                    
                                </CardContent>
                                <Button size="large" className="buy-btn" style={{backgroundColor:"wheat"}} onClick={() => buyAction("Basic")}>Buy Now</Button>
                            </Card>
                        </Grid>

                        <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <div className="heading-card">
                                        <Typography variant="h5" className="typo">Standard</Typography>
                                        <Typography variant="body1">
                                            $149
                                        </Typography>
                                    </div>
                                    
                                    <Typography variant="body" className="typo-content">
                                        1080p
                                    </Typography>
                                </CardContent>
                                <Button size="large" style={{backgroundColor:"wheat"}} onClick={() => buyAction("Standard")}>Buy Now</Button>
                            </Card>
                        </Grid>

                        <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <div className="heading-card">
                                        <Typography variant="h5" className="typo">Premium</Typography>
                                        <Typography variant="body1">
                                            $500
                                        </Typography>
                                    </div>
                                    
                                    <Typography variant="body" className="typo-content">
                                        4k+ HDR
                                    </Typography>
                                </CardContent>
                                <Button size="large" style={{backgroundColor:"wheat"}} onClick={() => buyAction("Premium")}>Buy Now</Button>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    )
}
