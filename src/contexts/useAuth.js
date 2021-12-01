import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink
} from '@apollo/client'
import { useContext, createContext } from 'react'
// import {
//   ApolloProvider,
//   ApolloClient,
//   InMemoryCache,
//   gql
// } from '@apollo/client'
import { Navigate } from 'react-router';
// import { LOGIN } from '../query/login';
import useLocalStorage from '../hooks/useLocalStorage';

// Debug error
const errorLink = onError(({graphQLErrors, networkError})=>{
  if(graphQLErrors) console.log('graphQLerror', graphQLErrors)
  if(networkError) console.log('networkError', networkError)
})

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [value, setValue] = useLocalStorage('login');

  const isSignedIn = () => {
    if(value && value.token) return true; else return false;
  }

  const getAuthHeaders = () => {
    if (!value?.token) return null
    return {
      "Authorization": `${value.token}`,
    }
  }

  const createApolloClient = () => {

  const httpLink = new HttpLink({
      uri: `https://tctshv3433.execute-api.us-east-1.amazonaws.com/test/graphql`,
      // uri: `https://3t2zg4dxxl.execute-api.us-east-1.amazonaws.com/dev/graphql`,
      headers: getAuthHeaders(),
    })

    const link = ApolloLink.from([errorLink, httpLink]);

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-first',
        },
      },
    })
  }

  //   return new ApolloClient({
  //     uri: `https://tctshv3433.execute-api.us-east-1.amazonaws.com/test/graphql`,
  //     cache: new InMemoryCache(),
      // defaultOptions: {
      //   watchQuery: {
      //     fetchPolicy: 'cache-first',
      //   },
      // },
  //     headers: getAuthHeaders(),
  //   })
  // }

  const signIn = async ({ username, password }) => {
    
    const client = createApolloClient()
    const LoginQuery = gql`
        query getLogin($username: String!, $password: String!){
        getLogin(username:$username,password:$password){
            token
            myData {
                id
                callName
                role
                avatar
            }
        }
    }`

    const result = await client.query({
      query: LoginQuery,
      variables: { username, password },
    })

    const loginData = result?.data?.getLogin;

    if (loginData) {
      setValue(loginData)
    }
    

    return loginData.token ? true : false
  }

  const signOut = () => {
    setValue(null)
    Navigate('/login')
  }

  return {
    // setAuthToken,
    myData: value?.myData,
    setValue,
    isSignedIn,
    signIn,
    signOut,
    createApolloClient,
  }
}