import "./App.css";
import SocketProvider from "./context/socket";
import AlertProvider from "./context/alert";
import Root from "./routes/root";
import Room from "./routes/room";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Common } from "./components/Layout/Common";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "room/:roomId",
    element: <Room />,
  },
]);

function App() {
  return (
    <SocketProvider>
      <AlertProvider>
        <Common>
          <RouterProvider router={router} />
        </Common>
      </AlertProvider>
    </SocketProvider>
  );
}

export default App;
