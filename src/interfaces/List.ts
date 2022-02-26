import Task from "./Task";

export default interface List{
  id: string
  slug: string
  title: string
  type: string
  capacity: number
  tasks: Task[] // dunno if this is used
  owner: string
}