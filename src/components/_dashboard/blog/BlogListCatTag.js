import { useState } from "react";
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { styled } from "@mui/styles";

const CustomCard = styled(Card)({
    // width: '95%',
    padding: '10px 20px',
    position: 'relative',
    overflow: 'hidden'
})

ListCatTag.propType = {
    type: PropTypes.object.isRequired
}

export default function ListCatTag({type}){
    return (
        <Grid container spacing={2}>
            {
                [1,2,3,4,5].map((v,k)=>(
                        <Grid item xs={12} md={3} key={k}>
                            <CustomCard>
                                {type}
                            </CustomCard>
                        </Grid>
                ))
            }
        </Grid>
    );
}