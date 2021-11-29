import {gql} from '@apollo/client';

export const getPosts = gql`query {
  loadPosts(limit:5){
    postResult{
      id
      cover: imageUrl
      title
      slug
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
    
  }
}
`