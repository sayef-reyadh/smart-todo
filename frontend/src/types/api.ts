// Frontend types matching backend TaskResponse (partial)
export type TaskResponse = {
  id: string
  user_id: string
  title: string
  description?: string | null
  status: 'PENDING' | 'COMPLETED'
  due_date?: string | null
  created_at: string
  updated_at: string
}
