// material
import { Container } from '@mui/material';
// routes
import { PATH_BLOG, PATH_PAGE } from '../routes/paths';
// hooks
// import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { EditForm } from '../components/_dashboard/blog';

// ----------------------------------------------------------------------

export default function BlogEditPost() {
  const themeStretch = true;

  return (
    <Page title="Edit Post | IBNU SINA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit Posting"
          links={[
            { name: 'Dashboard', href: PATH_PAGE.root },
            { name: 'Blog', href: PATH_BLOG.root },
            { name: 'Edit Post' }
          ]}
        />

        <EditForm />
      </Container>
    </Page>
  );
}
