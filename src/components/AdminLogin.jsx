import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, LogIn } from 'lucide-react'

const ADMIN_EMAIL = 'lunarantics@gmail.com'
const ADMIN_PASSWORD = 'luna123'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    setLoading(true)
    try {
      if (
        email === ADMIN_EMAIL.trim().toLowerCase() &&
        password === ADMIN_PASSWORD
      ) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('lunar_admin_authed', 'true')
        }
        navigate('/admin')
      } else {
        setError('Invalid email or password.')
      }
    } catch (err) {
      setError('Unexpected error during login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="max-w-md w-full px-4">
        <Card className="shadow-lg">
          <CardContent className="p-6 lg:p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold heading-serif text-primary mb-2">
                Lunar Admin
              </h1>
              <p className="text-sm text-medium-contrast">
                Sign in to manage content, deals, and contacts.
              </p>
            </div>

            {error && (
              <div className="mb-4 flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="form-label">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input mt-2"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="password" className="form-label">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input mt-2"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="btn-primary w-full flex items-center justify-center mt-2"
                disabled={loading}
              >
                <LogIn className="h-4 w-4 mr-2" />
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>

              <p className="text-xs text-center text-light-contrast mt-2">
                For now this login simply gates access to the admin; Supabase
                auth will be optional and can be added later.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminLogin


