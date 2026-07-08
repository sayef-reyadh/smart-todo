import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { UiButton, UiContainer, UiTitle } from '../../ui'
import { apiService } from '../../services/api'
import type { TaskResponse } from '../../types/api'

export function TaskDetailsPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const navigate = useNavigate()

  const [task, setTask] = useState<TaskResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'PENDING' as 'PENDING' | 'COMPLETED',
    due_date: '',
  })

  // Fetch task details
  useEffect(() => {
    if (!taskId) return

    ;(async () => {
      try {
        setLoading(true)
        const data = await apiService.getTaskById(taskId)
        setTask(data)
        setFormData({
          title: data.title,
          description: data.description || '',
          status: data.status,
          due_date: data.due_date || '',
        })
        setError(null)
      } catch (err) {
        console.error('Failed to fetch task:', err)
        setError('Failed to load task details')
      } finally {
        setLoading(false)
      }
    })()
  }, [taskId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    if (!task || !taskId) return

    try {
      const updatePayload = {
        title: formData.title,
        description: formData.description || null,
        status: formData.status,
        due_date: formData.due_date || null,
      }

      const updatedTask = await apiService.updateTask(taskId, updatePayload)
      setTask(updatedTask)
      setIsEditing(false)
      setError(null)
    } catch (err) {
      console.error('Failed to update task:', err)
      setError('Failed to save changes')
    }
  }

  const handleDelete = async () => {
    if (!task || !taskId) return

    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      await apiService.deleteTask(taskId)
      navigate('/')
    } catch (err) {
      console.error('Failed to delete task:', err)
      setError('Failed to delete task')
    }
  }

  if (loading) {
    return (
      <UiContainer>
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading task...</div>
      </UiContainer>
    )
  }

  if (error || !task) {
    return (
      <UiContainer>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
          {error || 'Task not found'}
        </div>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'block',
            margin: '1rem auto',
            padding: '0.5rem 1rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
          }}
        >
          Back to Tasks
        </button>
      </UiContainer>
    )
  }

  return (
    <UiContainer>
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            cursor: 'pointer',
            fontSize: '0.9rem',
            textDecoration: 'underline',
            padding: 0,
          }}
        >
          ← Back to Tasks
        </button>
      </div>

      <UiTitle>{isEditing ? 'Edit Task' : 'Task Details'}</UiTitle>

      {error && (
        <div
          style={{
            padding: '0.75rem',
            marginBottom: '1rem',
            background: '#fee2e2',
            color: '#991b1b',
            borderRadius: '0.375rem',
            fontSize: '0.9rem',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gap: '1rem', maxWidth: '600px' }}>
        {/* Title */}
        <div style={{ display: 'grid', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Title</label>
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
                fontSize: '1rem',
              }}
            />
          ) : (
            <p style={{ fontSize: '1.125rem', fontWeight: '500', margin: 0 }}>{task.title}</p>
          )}
        </div>

        {/* Description */}
        <div style={{ display: 'grid', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Description</label>
          {isEditing ? (
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
                fontSize: '0.95rem',
                minHeight: '5rem',
                fontFamily: 'inherit',
              }}
            />
          ) : (
            <p style={{ color: '#64748b', margin: 0, whiteSpace: 'pre-wrap' }}>
              {task.description || '(No description)'}
            </p>
          )}
        </div>

        {/* Status */}
        <div style={{ display: 'grid', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Status</label>
          {isEditing ? (
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
                fontSize: '0.95rem',
              }}
            >
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>
          ) : (
            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                backgroundColor: task.status === 'COMPLETED' ? '#d1fae5' : '#fef3c7',
                color: task.status === 'COMPLETED' ? '#065f46' : '#92400e',
                width: 'fit-content',
              }}
            >
              {task.status === 'COMPLETED' ? '✓ Completed' : 'Pending'}
            </span>
          )}
        </div>

        {/* Due Date */}
        <div style={{ display: 'grid', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Due Date</label>
          {isEditing ? (
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleInputChange}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
                fontSize: '0.95rem',
              }}
            />
          ) : (
            <p style={{ color: '#64748b', margin: 0 }}>
              {task.due_date ? new Date(task.due_date).toLocaleDateString() : '(No due date)'}
            </p>
          )}
        </div>

        {/* Metadata */}
        <div style={{ fontSize: '0.875rem', color: '#94a3b8', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
          <p style={{ margin: '0.25rem 0' }}>Created: {new Date(task.created_at).toLocaleString()}</p>
          <p style={{ margin: '0.25rem 0' }}>Updated: {new Date(task.updated_at).toLocaleString()}</p>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1rem',
            borderTop: '1px solid #e2e8f0',
            paddingTop: '1rem',
          }}
        >
          {!isEditing ? (
            <>
              <UiButton tone="primary" type="button" onClick={() => setIsEditing(true)}>
                Edit
              </UiButton>
              <UiButton tone="danger" type="button" onClick={handleDelete}>
                Delete
              </UiButton>
            </>
          ) : (
            <>
              <UiButton tone="primary" type="button" onClick={handleSave}>
                Save Changes
              </UiButton>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  if (task) {
                    setFormData({
                      title: task.title,
                      description: task.description || '',
                      status: task.status,
                      due_date: task.due_date || '',
                    })
                  }
                }}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #e2e8f0',
                  background: '#f1f5f9',
                  color: '#475569',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </UiContainer>
  )
}
