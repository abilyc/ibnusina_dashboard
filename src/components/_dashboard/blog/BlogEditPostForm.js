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

// import { Navigate } from 'react-router-dom';
// import { PATH_BLOG } from '../../../routes/paths';

//Query
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
    // const [ dataTitle, setDataTitle ] = useState(title);
    // const [ dataType, setDataType ] = useState('');
    // const [ dataSummary, setDataSummary ] = useState('');
    // const [ dataContent, setDataContent ] = useState('');
    const [ hideButton, sethideButton ] = useState(true);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [getData, { data, loading }] = useLazyQuery(postById(lowerCase(type)));
    const [editPost, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(updatePost);
    
    // useEffect(()=>{
    //     if(['summary', 'content'].includes(type)) getData({variables:{id: id}});
    //     if(data){
    //         switch(type){
    //             case 'summary': 
    //                 setDataSummary(data.postById.summary === null ? '' : data.postById.summary);
    //                 break;
    //             case 'content':
    //                 setDataContent(data.postById.content === null ? '' : data.postById.content);
    //                 break;
    //             default:
    //                 break;
    //         }
    //     } 
    // },[data]);

    // const sCase = () => {
    //     switch (type) {
    //         case 'title':
    //             return dataTitle;
    //         case 'summary':
    //             return dataSummary;
    //         case 'content':
    //             return dataContent;
    //         default:
    //             break;
    //     }
    // };

    // const handleSave = async () => {
    //     await editPost({variables: {id: id, type: upperCase(type), 
    //         input: sCase()
    //     }});
    // };

    // useEffect(()=>{
    //     if(updateData){ 
    //         enqueueSnackbar('Update Berhasil', {
    //             variant: 'success',
    //             action: (k) => (
    //                 <MIconButton size="small" onClick={() => closeSnackbar(k)}>
    //                     <Icon icon={closeFill} />
    //                 </MIconButton>
    //             )
    //         });
    //     }
    // },[updateLoading, updateData]);

    
    // const handleSaveSummary = () => {editPost({variables: {id: id, summary: dataSummary}})};

    const handleChange = () => {
        hideButton && sethideButton(false);
    //     switch(type){
    //         case 'title':
    //             setDataTitle(e.target.value);
    //             break;
    //         case 'summary':
    //             setDataSummary(e.target.value);
    //             break;
    //         case 'content':
    //             setDataContent(e);
    //             break;
    //         default:
    //             break;

    //     }
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
                enqueueSnackbar('Update Berhasil', {
                    variant: 'success',
                    action: (k) => (
                        <MIconButton size="small" onClick={() => closeSnackbar(k)}>
                            <Icon icon={closeFill} />
                        </MIconButton>
                    )
                });
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
            variant: 'success',
            action: (k) => (
                <MIconButton size="small" onClick={() => closeSnackbar(k)}>
                    <Icon icon={closeFill} />
                </MIconButton>
            )
        });
    },[data, updateData])

    // useEffect(()=>{
    //     console.log(updateError);
    // },[updateError])



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
                    onChange={v => {setFieldValue('content',v)}}
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
