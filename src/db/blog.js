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