import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import AuthUI from './components/Auth'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) return <p>Loading...</p>

  if (!user) {
    return <AuthUI />
  }

  return (
    <div style={{ padding: 40 }}>
      <h3>Welcome {user.email}</h3>

      <button onClick={() => supabase.auth.signOut()}>
        Logout
      </button>
    </div>
  )
}

export default App
