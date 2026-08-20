import { useState, useEffect } from 'react'

// TODO: Replace with real API call once backend notifications endpoint is ready.
// Expected shape: GET /notifications/unread-count -> { count: number }
export function useNotifications() {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    // TODO: Replace with real API call
    // const fetchCount = async () => {
    //   const response = await fetch('/api/notifications/unread-count')
    //   const data = await response.json()
    //   setCount(data.count)
    // }
    // fetchCount()

    // Mock data - remove when API is ready
    setCount(3)
  }, [])

  return { count }
}