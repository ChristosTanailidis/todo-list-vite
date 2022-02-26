import gql from 'graphql-tag'

export const getLists = gql`
  query getLists{
    lists: getLists {
      id
      slug
      title
      type
      capacity
      tasks {
        id
        name
        type
        done
      }
      owner {
        id
        name
        email
      }
    }
  }
`

export const getList = gql`
  mutation getList($getListId: String!){
    list: getList(id: $getListId) {
      id
      slug
      title
      type
      capacity
      tasks {
        id
        name
        type
        done
      }
      owner {
        id
        name
        email
      }
    }
  }
`

export const getCompletedLists = gql`
  query getCompletedLists{
    completedLists: getCompletedLists{
      id
      slug
      title
      type
      capacity
      tasks {
        id
        name
        type
        done
      }
      owner {
        id
        name
        email
      }
    }
  }
`