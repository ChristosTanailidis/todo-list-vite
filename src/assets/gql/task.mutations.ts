import gql from 'graphql-tag'

export const createTask = gql`
  mutation createTask($createTaskData: TaskInputData!){
    create: createTask(data: $createTaskData){
      id
      name
      type
      done
      list {
        id
        slug
        title
        type
        capacity
      }
    }
  }
`

export const editTask = gql`
  mutation editTask($editTaskData: TaskInputData!, $id: String!){
    edit: editTask(data: $editTaskData, id: $id){
      id
      name
      type
      done
      list {
        id
        slug
        title
        type
        capacity
      }
    }
  }
`

export const deleteTask = gql`
  mutation deleteTask($deleteTaskId: String!){
    delete: deleteTask(id: $deleteTaskId)
  }
`