import { CurrentIntegrationProvider } from "./components/CurrentIntegrationContext";
import Main from "./components/Main";

function App() {
  return <CurrentIntegrationProvider><Main /></CurrentIntegrationProvider>
}

export default App;
