import "./App.css";
import GamePage from "./pages/game";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<GamePage />} path="/:gameId" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
