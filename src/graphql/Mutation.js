import { gql } from "@apollo/client";

export const SIGN_UP=gql`
mutation Mutation($input: userInput) {
  signUp(input: $input) {
    status
    message
    user {
      id
      gender
      fullName
      email
      userType
      userName
      profilePicture
      mobile
    }
  }
}`


export const SIGN_IN=gql`
mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    token
    user {
      userName
      email
      mobile
      gender
      fullName
    }
  }
}
`