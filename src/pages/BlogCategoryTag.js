// material
import { useEffect, useState } from 'react';
import { Container, Stack, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
// routes
import { PATH_BLOG, PATH_PAGE } from '../routes/paths';
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { BlogPostsSort } from '../components/_dashboard/blog';
import ListCatTag from '../components/_dashboard/blog/BlogListCatTag';
import { DialogAnimate } from '../components/animate';
import { capitalCase } from 'capital-case';
import { MIconButton } from '../components/@material-extend';
import { Icon } from '@iconify/react';
import checkMark from '@iconify/icons-eva/checkmark-circle-2-fill';
import closeCircle from '@iconify/icons-eva/close-circle-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { useMutation } from '@apollo/client';
import { addCatTag, getTagCat } from '../db';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------
const SORT_OPTIONS = [
  {label: 'Category', value: 'category'},
  {label: 'Tag', value: 'tag'}
]

const IconBundle = ({onClick, icon, color, ...other}) => {
  return (
      <MIconButton onClick={onClick} {...other}>
          <Icon icon={icon} color={color} />
      </MIconButton>
  )
}

export default function BlogCatTag() {
  const themeStretch = true;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [filters, setFilters] = useState('category');
  const [newTitle, setNewTitle] = useState('');
  const [newCatTag, {data, error, loading}] = useMutation(addCatTag(filters));
  const [dialog, setDialog] = useState({
    showButton: true,
    open: false
  })
  const handleChangeSort = e => setFilters(e.target.value);

  const handleClick = type => {
    switch (type) {
      case 'cancel':
        setDialog(prev=>({...prev, open: false}));
        break;
      case 'save':
        newCatTag({variables:{title: newTitle}, refetchQueries: getTagCat}).catch(error => console.log(error));
      default:
        setDialog(prev=>({...prev, open: true}));
        break;
    }
    setNewTitle('');
  };

  useEffect(()=>{
    if(data){
      setDialog(prev=>({...prev,open:false}))
      enqueueSnackbar(data[(`add${capitalCase(filters)}`)], {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }

    if(loading){
      setDialog(prev=>({...prev,showButton: false}))
    }else{
      setDialog(prev=>({...prev,showButton: true}))
    }

    if(error){
      enqueueSnackbar(error.message, {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  },[data, loading, error])
  

  // useEffect(()=>{
  //   console.log(filters);
  // },[filters])

  return (
    <Page title={`Category & Tag | IBNU SINA`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Category & Tag'
          links={[
            { name: 'Dashboard', href: PATH_PAGE.root },
            { name: 'Blog', href: PATH_BLOG.posts },
            { name: 'Category & Tag' }
          ]}
          action={
            <Button
              variant="contained"
              onClick={()=>handleClick()}
              startIcon={<Icon icon={plusFill} />}
            >
              New {capitalCase(filters)}
            </Button>
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        <ListCatTag type={filters}/>
        <DialogAnimate open={dialog.open}>
                <DialogTitle>
                    {capitalCase(`${filters} baru`)}
                </DialogTitle>
                <DialogContent sx={{paddingTop: '30px !important'}}>
                  {
                    loading ? 'Mohon Tunggu' :
                    <TextField
                      fullWidth
                      minRows={3}
                      maxRows={5}
                      label="Title"
                      onChange={(e)=>setNewTitle(e.target.value)}
                      value={newTitle}
                    />
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
      </Container>
    </Page>
  );
}
