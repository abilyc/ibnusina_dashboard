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


// import { Navigate } from 'react-router-dom';
// import { PATH_BLOG } from '../../../routes/paths';

//Query
import { postById, updatePost } from '../../../db';
import LoadingScreen from '../../LoadingScreen';
import { useSnackbar } from 'notistack';

const IconBundle = ({onClick, icon, color, ...other}) => {
    return (
        <MIconButton onClick={onClick} {...other}>
            <Icon icon={icon} color={color} />
        </MIconButton>
    )
}



export default function BlogEditPostForm(props) {
    const { id, type, title } = props.data;
    const [ dataTitle, setDataTitle ] = useState(title);
    const [ dataSummary, setDataSummary ] = useState('');
    const [ dataContent, setDataContent ] = useState('');
    const [ showButton, setshowButton ] = useState(true);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [getData, { data, loading }] = useLazyQuery(postById(lowerCase(type)));
    const [editPost, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(updatePost);

    
    useEffect(()=>{
        if(type === 'summary' || type === 'content') getData({variables:{id: id}});
        if(data){
            switch(type){
                case 'summary': 
                    setDataSummary(data.postById.summary === null ? '' : data.postById.summary);
                break;
                case 'content':
                    setDataContent(data.postById.content === null ? '' : data.postById.content);
                break;
                default:
                    break;
            }
        } 
    },[data]);

    useEffect(()=>{
        updateData && 
            enqueueSnackbar(updateData.quickUpdatePost, {
                variant: 'success',
                action: (k) => (
                    <MIconButton size="small" onClick={() => closeSnackbar(k)}>
                        <Icon icon={closeFill} />
                    </MIconButton>
                )
            });
        updateError && console.log(updateError);
    },[updateLoading])
    
    const handleSave = async () => {
        // try{
            await editPost({variables: {id: id, type: upperCase(type), input: dataTitle}});
            // enqueueSnackbar(updateData, {
            //     variant: 'success',
            //     action: (key) => (
            //       <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            //         <Icon icon={closeFill} />
            //       </MIconButton>
            //     )
            //   });
        // }catch(e){
        //     enqueueSnackbar(e.message, {
        //         variant: 'error',
        //         action: (key) => (
        //           <MIconButton size="small" onClick={() => closeSnackbar(key)}>
        //             <Icon icon={closeFill} />
        //           </MIconButton>
        //         )
        //     });
        // }
    };
    // const handleSaveSummary = () => {editPost({variables: {id: id, summary: dataSummary}})};

    const handleChangeTitle = (e) => {
        setDataTitle(e.target.value)
        setshowButton(false);
    };
    const handleChangeSummary = (e) => {setDataSummary(e.target.value)}; 

    return !loading ? (
        <>
            {
                type === 'title' && (
                    <>
                        <TextField fullWidth label='Title' onChange={handleChangeTitle} value={dataTitle} />
                        <div hidden={showButton}>
                            <IconBundle onClick={handleSave} icon={checkMark} sx={{padding: '3px', marginTop: '10px'}} color='#06b106' />
                            <IconBundle onClick={()=>setshowButton(true)} icon={closeCircle} sx={{padding: '3px', marginTop: '10px'}} color='#ff2121' />
                        </div>
                        
                    </>
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
                        onChange={(e)=>{handleChangeSummary(e)}}
                        value={dataSummary}
                    />)
            }
        </>
    ) : <LoadingScreen />;
}
