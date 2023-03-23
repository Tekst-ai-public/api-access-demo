import { AuthProvider } from "./contexts/AuthContext";
import Main from "./components/Main";

function App() {
  return <AuthProvider><Main /></AuthProvider>
}

export default App;
