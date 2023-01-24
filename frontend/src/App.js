import { useContext } from "react";
import { useEffect } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import "./App.css";
import { userContext } from "./context/UserContextProider";
import AllRoutes from "./routes/AllRoutes";
import socket from "./socket";

function App() {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const { setSocket } = useContext(userContext);
  useEffect(() => {
    socket.on("connect", function () {
      socket.emit("authentication", { token: cookies.access_token });
      socket.on("authenticated", function () {
        setSocket({ ...socket });
      });
      socket.emit("msg", "Hello");
    });
  }, []);
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
