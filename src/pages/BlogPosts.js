import { orderBy } from 'lodash';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useCallback, useState } from 'react';
// material
import { Box, Grid, Button, Skeleton, Container, Stack } from '@mui/material';
// redux
// import { useDispatch, useSelector } from '../../redux/store';
// import { getPostsInitial, getMorePosts } from '../../redux/slices/blog';
// hooks
// import useSettings from '../../hooks/useSettings';
// routes
import { PATH_PAGE } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { BlogPostCard, BlogPostsSort } from '../components/_dashboard/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'terbaru', label: 'terbaru' },
  { value: 'terpopuler', label: 'terpopuler' },
  { value: 'terlama', label: 'terlama' }
];

const posts = [
  { 
    id: 'asd', cover: '', title: 'asd', view: 5, comment: 'asdasd', share: 2, author: 'Admin', createdAt: '12-12-2012' 
  },
  {
    id: 'asdww', cover: '', title: 'asd', view: 5, comment: 'asdasd', share: 2, author: 'Admin', createdAt: '12-12-2012' 
  },
]

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'terbaru') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'terlama') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'terpopuler') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};

const SkeletonLoad = (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {[...Array(4)].map((_, index) => (
      <Grid item xs={12} md={3} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }} />
        <Box sx={{ display: 'flex', mt: 1.5 }}>
          <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
          <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default function BlogPosts() {
  const  themeStretch  = false;
  // const dispatch = useDispatch();
  const [filters, setFilters] = useState('terbaru');
  // const { posts, hasMore, index, step } = useSelector((state) => state.blog);
  const sortedPosts = applySort(posts, filters);
  // const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);

  // useEffect(() => {
  //   dispatch(getPostsInitial(index, step));
  // }, [dispatch, index, step]);

  const handleChangeSort = (event) => {
    setFilters(event.target.value);
  };

  return (
    <Page title="Blog: Posts | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Blog"
          links={[
            { name: 'Dashboard', href: PATH_PAGE.root },
            { name: 'Blog', href: PATH_PAGE.blog}
          ]}
          action={
            <Button
              variant="contained"
              // component={RouterLink}
              // to={PATH_DASHBOARD.blog.newPost}
              startIcon={<Icon icon={plusFill} />}
            >
              New Post
            </Button>
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          {/* <BlogPostsSearch /> */}
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        <InfiniteScroll
          // next={onScroll}
          // hasMore={hasMore}
          loader={SkeletonLoad}
          dataLength={posts.length}
          style={{ overflow: 'inherit' }}
        >
          <Grid container spacing={3}>
            {sortedPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </Grid>
        </InfiniteScroll>
      </Container>
    </Page>
  );
}