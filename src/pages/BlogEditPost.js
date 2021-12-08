// material
import { Container } from '@mui/material';
// routes
import { PATH_BLOG, PATH_PAGE } from '../routes/paths';
// hooks
// import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { BlogNewPostForm, EditForm } from '../components/_dashboard/blog';
import { useLocation } from 'react-router-dom';
import { capitalCase } from 'capital-case';

// ----------------------------------------------------------------------

export default function BlogEditPost() {
  const themeStretch = true;
  const type = capitalCase(useLocation().state.type);
  const data = useLocation().state;

  return (
    <Page title={`Edit Post ${type} | IBNU SINA`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={`Edit ${type}`}
          links={[
            { name: 'Dashboard', href: PATH_PAGE.root },
            { name: 'Blog', href: PATH_BLOG.root },
            { name: 'Edit' }
          ]}
        />

        {type === 'Full' ? <BlogNewPostForm data={data} /> :
        <EditForm data={data} />}
      </Container>
    </Page>
  );
}
