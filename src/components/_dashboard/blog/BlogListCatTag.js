import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { styled } from "@mui/styles";
import { useLazyQuery } from "@apollo/client";
import { getTagCat } from "../../../db";
import { capitalCase } from "capital-case";

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
    const [getCatTag, {data}] = useLazyQuery(getTagCat);
    const [catTag, setCatTag] = useState({});

    useEffect(()=>{
        getCatTag();
    },[]);
    
    useEffect(()=>{
        if(data) setCatTag(data);
    },[data]);

    return (
        <Grid container spacing={2}>
            {
                catTag[('all'+capitalCase(type))].map(v=>(
                    <Grid item xs={12} md={3} key={v.id}>
                        <CustomCard>
                            {v.title}
                        </CustomCard>
                    </Grid>
                ))

            }
        </Grid>
    );
}