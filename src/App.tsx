import { useState, useEffect } from 'react'
import DesignShowcase from './DesignShowcase'
import PasswordProtect from './PasswordProtect'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // セッションストレージから認証状態を確認
    const authenticated = sessionStorage.getItem('windcrew-authenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
  }

  if (loading) {
    return null // または簡単なローディング画面
  }

  if (!isAuthenticated) {
    return <PasswordProtect onSuccess={handleAuthSuccess} />
  }

  return (
    <div className="App">
      <DesignShowcase />
    </div>
  )
}

export default App