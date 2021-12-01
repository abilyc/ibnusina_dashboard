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