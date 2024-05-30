import React from "react";
import { Container, Typography } from "@mui/material";

export function Cart({ plan }) {
    let price, details;
    
    
    switch (plan) {
        case "Basic":
            price = "$100";
            details = "720p";
            break;
        case "Standard":
            price = "$149";
            details = "1080p";
            break;
        case "Premium":
            price = "$500";
            details = "4k+ HDR";
            break;
        default:
            price = "";
            details = "";
            break;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ marginTop: '200px', color: "rgb(245, 197, 24)", textAlign: "center" }}>
                Your Plan: {plan}
            </Typography>
            <Typography variant="h5" gutterBottom style={{ marginTop: '20px', color: "rgb(245, 197, 24)", textAlign: "center" }}>
                Price: {price}
            </Typography>
            <Typography variant="body1" gutterBottom style={{ marginTop: '20px', color: "rgb(245, 197, 24)", textAlign: "center" }}>
                Details: {details}
            </Typography>
        </Container>
    );
}