import {gql} from '@apollo/client';
import { capitalCase } from 'capital-case';

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

export const fullUpdatePost = gql`mutation updatePost($id: ID!, $title: String!, $summary: String!, $published: Int!, $content: String!, $imageUrl: String!, $categoryId: [ID], $tagId: [ID]){
  updatePost(postId: $id, input: {
    title: $title
    summary: $summary
    published: $published
    content: $content
    imageUrl: $imageUrl
    categoryId: $categoryId
    tagId: $tagId
  })
}
`

export const deletePost = gql`mutation deletePost($id: ID!){
  deletePost(postId: $id)
}
`

export const deleteTag = gql`mutation deleteTag($id: ID!){
  deleteTag(id: $id)
}
`

export const deleteCategory = gql`mutation deleteCategory($id: ID!){
  deleteCategory(id: $id)
}
`

export const addCatTag = type => gql`mutation add${capitalCase(type)}($title: String){
  add${capitalCase(type)}(title: $title)
}
`

export const editCatTag = type => gql`mutation update${capitalCase(type)}($id: ID!, $title: String!){
  update${capitalCase(type)}(id: $id, newTitle: $title)
}
`