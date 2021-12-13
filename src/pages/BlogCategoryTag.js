// material
import { useEffect, useState } from 'react';
import { Container, Stack } from '@mui/material';
// routes
import { PATH_BLOG, PATH_PAGE } from '../routes/paths';
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// import { useLocation } from 'react-router-dom';
// import { capitalCase } from 'capital-case';
import { BlogPostsSort } from '../components/_dashboard/blog';
import ListCatTag from '../components/_dashboard/blog/BlogListCatTag';


// ----------------------------------------------------------------------
const SORT_OPTIONS = [
  {label: 'Category', value: 'category'},
  {label: 'Tag', value: 'tag'}
]

export default function BlogCatTag() {
  const themeStretch = true;
  const [filters, setFilters] = useState('category');

  const handleChangeSort = (e) => setFilters(e.target.value);
  

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
            { name: 'Blog', href: PATH_BLOG.root },
            { name: 'Category & Tag' }
          ]}
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        <ListCatTag type={filters}/>
      </Container>
    </Page>
  );
}
