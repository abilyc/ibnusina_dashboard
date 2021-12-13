// material
import { Container } from '@mui/material';
// routes
import { PATH_BLOG, PATH_PAGE } from '../routes/paths';
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { useLocation } from 'react-router-dom';
import { capitalCase } from 'capital-case';

// ----------------------------------------------------------------------

export default function BlogCatTag() {
  const themeStretch = true;

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

        {/* {type === 'Full' ? <BlogNewPostForm data={data} /> :
        <EditForm data={data} />} */}
      </Container>
    </Page>
  );
}
