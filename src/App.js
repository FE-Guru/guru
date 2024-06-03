import Header from "./components/Header";
import "./css/Reset.css";
import "./css/Common.css";
import { Route, Routes } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Header />
      <Provider>
        <Routes store={store}>
          <Route path="/"> elem</Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
