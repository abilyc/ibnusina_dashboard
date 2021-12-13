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
};

export const PATH_BLOG = {
  root: ROOT_BLOG,
  newpost: path(ROOT_BLOG, '/new'),
  posts: path(ROOT_BLOG, '/posts'),
  edit: path(ROOT_BLOG, '/edit'),
  ct: path(ROOT_BLOG, '/ct'),
}



export const PATH_DOCS = '';
