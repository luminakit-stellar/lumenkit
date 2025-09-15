import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }
  
  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="main">
        <div className="hero">
          <div className="hero-logo-container">
            <img 
              src={isDarkMode ? "/logo-black.svg" : "/logo-white.svg"} 
              alt="LUMENKit" 
              className="hero-logo"
            />
          </div>
          
          <div className="hero-text">
            <p className="subtitle">
              O primeiro kit de wallet para Stellar com auditoria por IA.
            </p>
            <p className="description">
              Entenda exatamente o que está assinando, sempre.
            </p>
          </div>

          <button className="cta-button">
            COMEÇAR AGORA
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 LUMENKit. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default App
