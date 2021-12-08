import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { upperCase } from 'upper-case';
import { lowerCase } from 'lower-case';
import { useLazyQuery, useMutation } from '@apollo/client';
import { MIconButton } from '../../@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import checkMark from '@iconify/icons-eva/checkmark-circle-2-fill';
import closeCircle from '@iconify/icons-eva/close-circle-fill';
import { useNavigate } from 'react-router-dom';


import { Form, FormikProvider, useFormik } from 'formik';

import { postById, updatePost } from '../../../db';
import LoadingScreen from '../../LoadingScreen';
import { useSnackbar } from 'notistack';
import { QuillEditor } from '../../editor';
import { PATH_BLOG } from '../../../routes/paths';

const IconBundle = ({onClick, icon, color, ...other}) => {
    return (
        <MIconButton onClick={onClick} {...other}>
            <Icon icon={icon} color={color} />
        </MIconButton>
    )
}



export default function BlogEditPostForm(props) {
    const { id, type, title } = props.data;
    const navigate = useNavigate();
    const [ hideButton, sethideButton ] = useState(true);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [getData, { data, loading, error }] = useLazyQuery(postById(lowerCase(type)));
    const [editPost, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(updatePost);
    
    const handleChange = () => {
        hideButton && sethideButton(false);
    };

    
    
    const formik = useFormik({
        initialValues: {
            title: '',
            summary: '',
            content: ''
        },
        // validationSchema: ,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                await editPost({variables: {id: id, type: upperCase(type), 
                    input: values[type]
                }});
                if(updateData){enqueueSnackbar('Update Berhasil', {
                    variant: 'success',
                    action: (k) => (
                        <MIconButton size="small" onClick={() => closeSnackbar(k)}>
                            <Icon icon={closeFill} />
                        </MIconButton>
                    )
                });}
            } catch(e) {
                enqueueSnackbar('Update Gagal', {
                    variant: 'Error',
                    action: (k) => (
                        <MIconButton size="small" onClick={() => closeSnackbar(k)}>
                            <Icon icon={closeFill} />
                        </MIconButton>
                    )
                });
            }
        }
    })
    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
    
    useEffect(()=>{
        if(type === 'title') setFieldValue('title', title);
        if(['summary', 'content'].includes(type)) getData({variables:{id: id}});
    },[type])

    useEffect(()=>{
        if(data) setFieldValue(type, data.postById[type]);
        if(updateData) enqueueSnackbar('Update Berhasil', {
            preventDuplicate: true,
            variant: 'success',
            action: (k) => (
                <MIconButton size="small" onClick={() => closeSnackbar(k)}>
                    <Icon icon={closeFill} />
                </MIconButton>
            )
        });
    },[data, updateData])

    useEffect(()=>{
        
        error && enqueueSnackbar(error.message, {
            variant: 'Error',
            action: (k) => (
                <MIconButton size="small" onClick={() => closeSnackbar(k)}>
                    <Icon icon={closeFill} />
                </MIconButton>
            )
        });
    },[error])



    return !loading ? (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete='off' onSubmit={handleSubmit} onChange={handleChange}>
            {
                type === 'title' && (
                    <TextField 
                        fullWidth 
                        label='Title' 
                        // onChange={handleChange} 
                        // value={dataTitle}
                        {...getFieldProps('title')} 
                    />
                )
            }
            {
                type === 'summary' && 
                    (<TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={5}
                        label="Summary"
                        // onChange={handleChange}
                        // value={dataSummary}
                        {...getFieldProps('summary')}
                    />)
            }
            {   
                type === 'content' && 
                <QuillEditor 
                    id='edit-content'
                    value={values.content}
                    onChange={v => {setFieldValue('content',v); handleChange()}}
                />
            }
                <div hidden={hideButton}>
                    <IconBundle onClick={formik.submitForm} icon={checkMark} sx={{padding: '3px', marginTop: '10px'}} color='#06b106' />
                    <IconBundle onClick={()=>navigate(PATH_BLOG.root)} icon={closeCircle} sx={{padding: '3px', marginTop: '10px'}} color='#ff2121' />
                </div>
            </Form>
        </FormikProvider>
    ) : <LoadingScreen sx={{marginTop: '150px'}} />;
}
