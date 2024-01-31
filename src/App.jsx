import appLogo from './assets/app-logo.png'
import AppRoutes from './routes/AppRoutes'
import CustomTheme from './theme/CustomTheme'

function App() {

  return (
    <CustomTheme>
      <AppRoutes/>
    </CustomTheme>
  )
}

export default App
