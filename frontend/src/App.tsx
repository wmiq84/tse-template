import { ThemeProvider } from "@tritonse/tse-constellation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Home } from "src/pages";
import "src/globals.css";

import { TaskDetail } from "./pages/TaskDetail";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
