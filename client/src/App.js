import "./App.css";
import SocketProvider from "./context/socket";
import { Layout } from "./components/Layout";

function App() {
  return (
    <SocketProvider>
      <Layout />
    </SocketProvider>
  );
}

export default App;
