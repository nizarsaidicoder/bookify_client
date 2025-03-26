import "./styles/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Books from "@routes/booksPage";
import Root from "@routes/root";
import AuthorsPage from "@routes/authorsPage";
import AuthorPage from "@routes/authorPage";
import AuthorsView from "@components/author/AuthorsView";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Root />}>
          <Route
            path="books"
            element={<Books />}
          />
          <Route
            path="authors"
            element={<AuthorsPage />}>
            <Route
              index
              element={<AuthorsView />}
            />
            <Route
              path=":author_id"
              element={<AuthorPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
