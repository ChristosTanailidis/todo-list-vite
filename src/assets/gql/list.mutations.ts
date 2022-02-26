import gql from 'graphql-tag'

export const createList = gql`
  mutation createList($createListData: ListInputData!){
    create: createList(data: $createListData){
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

export const editList = gql`
  mutation editList($editListData: ListInputData!, $id: String!){
    edit: editList(data: $editListData, id: $id){
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

export const deleteList = gql`
  mutation deleteList($deleteListId: String!){
    delete: deleteList(id: $deleteListId)
  }
`