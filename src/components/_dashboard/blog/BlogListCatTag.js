import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Card, Box, Grid, Skeleton, Typography, DialogTitle, DialogActions, DialogContent, TextField } from "@mui/material";
import { styled } from "@mui/styles";
import { useLazyQuery, useMutation } from "@apollo/client";
import { deleteCategory, deleteTag, editCatTag, getTagCat } from "../../../db";
import { capitalCase } from "capital-case";
import { MIconButton } from "../../@material-extend";
import { Icon } from "@iconify/react";
import deleteFilled from '@iconify/icons-ant-design/delete-filled';
import editFilled from '@iconify/icons-ant-design/edit-filled';
import { DialogAnimate } from "../../animate";
import checkMark from '@iconify/icons-eva/checkmark-circle-2-fill';
import closeCircle from '@iconify/icons-eva/close-circle-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSnackbar } from "notistack";

const CustomCard = styled(Card)({
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

const IconBundle = ({onClick, icon, color, ...other}) => {
    return (
        <MIconButton onClick={onClick} {...other}>
            <Icon icon={icon} color={color} />
        </MIconButton>
    )
}

ListCatTag.propType = {
    type: PropTypes.object.isRequired
}

export default function ListCatTag({type}){
    const [getCatTag, {data, loading}] = useLazyQuery(getTagCat, {notifyOnNetworkStatusChange: true});
    const [del, {data: dataDel, loading: loadingDel, error: errorDel}] = useMutation(type !== 'tag' ? deleteCategory : deleteTag);
    const [edit, {data: dataEdit, loading: loadingEdit, error: errorEdit}] = useMutation(editCatTag(type));
    const [newTitle, setNewTitle] = useState('');
    const [catTag, setCatTag] = useState({});
    const [dialog, setDialog] = useState({
        title: '',
        action: '',
        showButton: false,
        msg: null,
        open: false
    });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    useEffect(()=>{
        getCatTag();
    },[]);
    
    useEffect(()=>{
        if(data) setCatTag(data);
    },[data]);

    const handleClick = (type, data = null) => {
        const template = {
            title: '',
            action: '',
            showButton: true,
            msg: null,
            open: false
        };

        switch (type) {
            case 'cancel':
                setDialog({
                    ...template,
                    open: false
                });
                break;
            case 'save':
                if(dialog.msg.action === 'delete') del({variables: {id: dialog.msg.id}});
                if(dialog.msg.action === 'edit') edit({variables: {id: dialog.msg.id, title: newTitle}});
                break;
            case 'delete':
                setDialog({
                    ...template,
                    msg: {id: data.id, title: data.title, action: data.action},
                    open: true
                });
                break;
            default:
                setDialog({
                    ...template,
                    title: type,
                    msg: {id: data.id, title: data.title, action: data.action},
                    open: true
                })
                setNewTitle(data.title);
                break;
        }
    };

    useEffect(()=>{
        setDialog(prev=>({
            ...prev,
            showButton: false,
            msg: {
                title: 'Mohon tunggu',
                id: prev?.msg?.id,
                action: prev?.msg?.action 
            },
        }));
    },[loadingDel, loadingEdit])

    useEffect(()=>{
        if(dataDel || dataEdit){
            const modified = `all${capitalCase(type)}`;
            
            enqueueSnackbar(`${capitalCase(type)} Berhasil`, {
                variant: 'success',
                action: (key) => (
                  <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                    <Icon icon={closeFill} />
                  </MIconButton>
                )
            });
            setDialog(prev=>({
                ...prev,
                open: false
            }));
            if(dialog.msg.action === 'delete'){
                setCatTag(prev => ({
                    ...prev,
                    [`${modified}`]: prev[modified].filter(v=>v.id!==dialog.msg.id)
                }));
            }else{
                setCatTag(prev => ({
                    ...prev,
                    [`${modified}`]: prev[modified].map(v=>({...v, title: v.id===dialog.msg.id ? newTitle : v.title}))
                }))
            }
        }
    },[dataDel, dataEdit]);

    return !loading ? (
        <Grid container spacing={2}>
            {
                catTag[`all${capitalCase(type)}`]?.map(v=>(
                    <Grid item xs={12} md={3} key={v.id}>
                        <CustomCard>
                            <Box sx={{display: 'flex', alignItems: 'center'}} >
                                <Typography fontWeight='bold' sx={{flexGrow: 1}}>{v.title}</Typography>
                                <Icon fontSize={13} icon={editFilled} color='#5b636a' onClick={()=>handleClick('edit', {id: v.id, title: v.title, action: 'edit'})} />
                                <Icon fontSize={13} icon={deleteFilled} color='#5b636a' onClick={()=>handleClick('delete', {id: v.id, title: v.title, action: 'delete'})} />
                            </Box>
                        </CustomCard>
                    </Grid>
                ))
            }
            <DialogAnimate open={dialog.open}>
                <DialogTitle>
                    {capitalCase(`${dialog?.title} ${type}`)}
                </DialogTitle>
                    <DialogContent sx={{paddingTop: '30px !important'}}>
                        {
                            dialog?.msg?.action === 'edit' ?
                            <TextField
                                fullWidth
                                minRows={3}
                                maxRows={5}
                                label="Title"
                                onChange={(e)=>setNewTitle(e.target.value)}
                                value={newTitle}
                            /> :
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                {dialog?.msg?.title}
                            </Box>
                            
                        }
                        </DialogContent>
                <DialogActions>
                    {
                        dialog.showButton && ( 
                            <>
                                <IconBundle onClick={()=>handleClick('save')} icon={checkMark} color='#06b106'/>
                                <IconBundle onClick={()=>handleClick('cancel')} icon={closeCircle} color='#ff2121'/>
                            </>
                        )
                    }
                </DialogActions>
            </DialogAnimate>
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