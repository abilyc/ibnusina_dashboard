import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Card, Box, Grid, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { useLazyQuery } from "@apollo/client";
import { getTagCat } from "../../../db";
import { capitalCase } from "capital-case";
import { MIconButton } from "../../@material-extend";
import { Icon } from "@iconify/react";
import deleteFilled from '@iconify/icons-ant-design/delete-filled';
import editFilled from '@iconify/icons-ant-design/edit-filled';

const CustomCard = styled(Card)({
    // width: '95%',
    padding: '10px 20px',
    position: 'relative',
    overflow: 'hidden',
    '& svg:first-of-type': {
        marginRight: '10px'
    },
    '& svg:hover>path': {
        fill: '#fda92d'
    }
})

ListCatTag.propType = {
    type: PropTypes.object.isRequired
}

export default function ListCatTag({type}){
    const [getCatTag, {data, loading}] = useLazyQuery(getTagCat);
    const [catTag, setCatTag] = useState({});

    useEffect(()=>{
        getCatTag();
    },[]);
    
    useEffect(()=>{
        if(data) setCatTag(data);
    },[data]);

    return !loading ? (
        <Grid container spacing={2}>
            {
                catTag[('all'+capitalCase(type))]?.map(v=>(
                    <Grid item xs={12} md={3} key={v.id}>
                        <CustomCard>
                            <Box sx={{display: 'flex', alignItems: 'center'}} >
                                <Typography fontWeight='bold' sx={{flexGrow: 1}}>{v.title}</Typography>
                                <Icon fontSize={13} icon={editFilled} color='#5b636a' />
                                <Icon fontSize={13} icon={deleteFilled} color='#5b636a' />
                            </Box>
                        </CustomCard>
                    </Grid>
                ))

            }
        </Grid>
    ) : (
        <Grid container spacing={2}>
            {[...Array(4)].map((_, index) => (
                <Grid item xs={12} md={3} key={index}>
                  <Skeleton variant="rectangular" width="100%" sx={{ height: 45, borderRadius: 2 }} />
                </Grid>
              ))}
        </Grid>
    );
}