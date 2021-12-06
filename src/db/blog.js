import {gql} from '@apollo/client';

export const getPosts = gql`query loadPosts($limit: Int!, $next: String!){
  loadPosts(limit: $limit, timeStamp:$next){
    postResult{
      id
      cover: imageUrl
      title
      author{
        authorName: callName
        avatar
      }
      meta {
        view: viewCount
        comment: commentCount
        share: shareCount
      }
      createdAt
    }
    nextPost
  }
}`

export const postById = (type) => gql`
  query postById($id: ID!){
    postById(id: $id){
      ${type}
    }
  }
`


export const getTagCat = gql`query{
  allTag{
    id
    title
  }
  allCategory{
    id
    title
  }
}`

export const addPost = gql`mutation addPost($title: String!, $metaTitle: String!, $summary: String!, $published: Int!, $content: String!, $imageUrl: String!){
  addPost(input:{title: $title, metaTitle: $metaTitle, summary: $summary, published: $published, content: $content, imageUrl: $imageUrl})
}`

export const updatePost = gql`mutation quickUpdatePost($type: ToEdit!, $id: ID!, $input: String!){
  quickUpdatePost(edit: $type, postId: $id, changeTo: $input)
}
`