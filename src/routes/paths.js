// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOT_BLOG = '/blog'
// ----------------------------------------------------------------------

export const PATH_PAGE = {
  root: '/',
  app: '/app',
  blog: '/blog',
  ct: '/ct'
};

export const PATH_BLOG = {
  root: ROOT_BLOG,
  newpost: path(ROOT_BLOG, '/newpost')
}



export const PATH_DOCS = '';
