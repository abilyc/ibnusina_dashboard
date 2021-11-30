// material
import { Container } from '@mui/material';
// routes
import { PATH_BLOG, PATH_PAGE } from '../routes/paths';
// hooks
// import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { BlogNewPostForm } from '../components/_dashboard/blog';

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const themeStretch = true;

  return (
    <Page title="Blog: New Post | IBNU SINA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Buat Posting"
          links={[
            { name: 'Dashboard', href: PATH_PAGE.root },
            { name: 'Blog', href: PATH_BLOG.root },
            { name: 'New Post' }
          ]}
        />

        <BlogNewPostForm />
      </Container>
    </Page>
  );
}
