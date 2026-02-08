import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../supabase'

export default function AuthUI() {
  return (
    <div style={{ width: 400, margin: 'auto', marginTop: 80 }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'github']}
        theme="dark"
      />
    </div>
  )
}
