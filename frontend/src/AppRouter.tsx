  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import FormPage from "./pages/FormPage";
  import ListPage from "./pages/ListPage";
  import ItemPage from "./pages/ItemPage";


  export default function AppRouter() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/item/:id" element={<ItemPage />} />
          </Routes>
        </BrowserRouter>
    );
  }
