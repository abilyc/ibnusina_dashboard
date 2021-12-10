import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { MIconButton } from '../../@material-extend';
import LoadingScreen from '../../LoadingScreen';


// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// utils
// import fakeRequest from '../../../utils/fakeRequest';
//
import { QuillEditor } from '../../editor';
// import { UploadSingleFile } from '../../upload';
//
import BlogNewPostPreview from './BlogNewPostPreview';
import { addPost, fullUpdatePost, getTagCat, postById } from '../../../db';

// ----------------------------------------------------------------------


const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [createPost] = useMutation(addPost);
  const [updatePost] = useMutation(fullUpdatePost);
  const [categories, setCategory] = useState([]);
  const [Tags, setTag] = useState([]);
  
  const [getFull, {data: fullData, loading: loadingFullData, error: errorFullData }] = useLazyQuery(postById('title summary content imageUrl category{id title} tag{id title}'));
  
  
  
  const { data } = useQuery(getTagCat);
  useEffect(()=>{
    if(data && Tags !== data?.allTag){
      setTag(data.allTag);
      setCategory(data.allCategory)
    }
  }, [data, Tags])

  useEffect(()=>{
    if(errorFullData){
      enqueueSnackbar(errorFullData?.message, {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  },[errorFullData])
  
  // const handleOpenPreview = () => {
    //   setOpen(true);
    // };
    
    const handleClosePreview = () => {
      setOpen(false);
    };
    
    const NewBlogSchema = Yup.object().shape({
      title: Yup.string().required('Title is required'),
      summary: Yup.string().required('Description is required'),
      content: Yup.string().min(100).required('Content is required'),
      imageUrl: Yup.string().required('Cover is Required')
    });
  
  
  const formik = useFormik({
    initialValues: {
      title: '',
      summary: '',
      content: '',
      imageUrl: '',
      tag: ['sejarah'],
      tagId: ['1603b0d7-d025-4c9d-a90d-ac1aae214223'],
      publish: true,
      comments: true,
      metaTitle: '',
      metaDescription: '',
      category: ['hiburan'],
      categoryId: ['b074541c-fc09-41c4-a3a6-b62c1751c0a4']
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // console.log(values);
      const val = {
        ...values,
        published: (values.publish ? 2 : 1),
      };
      try {
        if(window.location.pathname === '/edit'){
          await updatePost({variables: {id: props.data.id, ...val}});
        }else{
          await createPost({variables: val});
          resetForm();
        }
        // handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar('Berhasil', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      } catch (error) {
        setSubmitting(false);
        // console.log(error);
        enqueueSnackbar(error.toString(), {variant: 'error'});
      }
    }
  });
  
  useEffect(()=>{
    if(props?.data){
      const { id } = props.data;
      getFull({variables: {id: id}});
    };
  },[props]);

  
  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
  
  useEffect(()=>{
    if(fullData?.postById){
      const {title, summary, content, imageUrl} = fullData?.postById;
      const getTagCat = (variant, key) => fullData.postById[variant].map(v=>v[key]);
      setFieldValue('title', title);
      setFieldValue('summary', summary);
      setFieldValue('content', content);
      setFieldValue('imageUrl', imageUrl);
      setFieldValue('tag', getTagCat('tag', 'titile'));
      setFieldValue('category', getTagCat('category', 'titile'));
      setFieldValue('tagId', getTagCat('tag', 'id'));
      setFieldValue('categoryId', getTagCat('category', 'id'));
    }
  },[fullData]);

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     if (file) {
  //       setFieldValue('cover', {
  //         ...file,
  //         preview: URL.createObjectURL(file)
  //       });
  //     }
  //   },
  //   [setFieldValue]
  // );

  return loadingFullData ? <LoadingScreen sx={{marginTop: '150px'}} /> : (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Post Title"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  {/* <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Description"
                    {...getFieldProps('summary')}
                    error={Boolean(touched.summary && errors.summary)}
                    helperText={touched.summary && errors.summary}
                  /> */}

                  <div>
                    <LabelStyle>Content</LabelStyle>
                    <QuillEditor
                      id="post-content"
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && (
                      <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                        {touched.content && errors.content}
                      </FormHelperText>
                    )}
                  </div>

                  <div>
                    <TextField
                      fullWidth
                      minRows={3}
                      maxRows={5}
                      label="Cover Image URL"
                      {...getFieldProps('imageUrl')}
                      error={Boolean(touched.imageUrl && errors.imageUrl)}
                      helperText={touched.imageUrl && errors.imageUrl}
                    />
                    {/* <LabelStyle>Cover Link</LabelStyle> */}
                    {/* <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values.cover}
                      onDrop={handleDrop}
                      error={Boolean(touched.cover && errors.cover)}
                    /> */}
                    {/* {touched.cover && errors.cover && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.cover && errors.cover}
                      </FormHelperText>
                    )} */}
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <FormControlLabel
                      control={<Switch {...getFieldProps('publish')} checked={values.publish} />}
                      label="Publish"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />

                    <FormControlLabel
                      control={<Switch {...getFieldProps('comments')} checked={values.comments} />}
                      label="Enable comments"
                      labelPlacement="start"
                      sx={{ mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />
                  </div>

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tag}
                    onChange={(event, newValue) => {
                      const nVal = newValue.map((v)=>Tags.find((o)=> v === o.title).id);
                      setFieldValue('tag', newValue);
                      setFieldValue('tagId', nVal);              
                    }}
                    options={Tags.map((option) => option.title)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option?.id} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Tags" />}
                  />

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.category}
                    onChange={(event, newValue) => {
                      const nVal = newValue.map((v)=>categories.find((o)=> v === o.title).id);
                      setFieldValue('category', newValue);
                      setFieldValue('categoryId', nVal);
                    }}
                    options={categories.map((option) => option.title)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Categories" />}
                  />

                  {/* <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Tags" />}
                  /> */}

                  {/* <TextField fullWidth label="Meta title" {...getFieldProps('metaTitle')} /> */}

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Description"
                    {...getFieldProps('summary')}
                    error={Boolean(touched.summary && errors.summary)}
                    helperText={touched.summary && errors.summary}
                  />

                  {/* <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('metaKeywords', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Meta keywords" />}
                  /> */}
                </Stack>
              </Card>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  variant="outlined"
                  size="large"
                  // onClick={handleOpenPreview}
                  sx={{ mr: 1.5 }}
                >
                  Preview
                </Button>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Post
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>

      <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} />
    </>
  );
}
