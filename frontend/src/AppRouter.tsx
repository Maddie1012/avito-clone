import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FormPage from "./pages/FormPage";
import ListPage from "./pages/ListPage";
import ItemPage from "./pages/ItemPage";


export default function AppRouter() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
        </Routes>
      </BrowserRouter>
  );
}
