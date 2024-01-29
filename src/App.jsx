import appLogo from './assets/app-logo.png'

function App() {

  return (
    <div style={{height: "100vh", display: "flex", alignItems: "center"}}>
      <center style={{width: "100vw"}}>
        <img src={appLogo} className="logo" alt="Vite logo" />
      </center>
    </div>
  )
}

export default App
