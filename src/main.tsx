import "./styles/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "@routes/root";
import AuthorsPage from "@routes/authorsPage";
import { AuthorPage } from "@routes/authorPage";
import AuthorsView from "@components/authors/AuthorsView";
import BooksPage from "@routes/booksPage";
import BookPage from "@routes/bookPage";
import BooksView from "@components/book/BooksView";
import SigninPage from "@routes/siginPage";
import SignupPage from "@routes/signupPage";
import Home from "@routes/home";
import FavoritesPage from "@routes/favoritesPage";
import TagsPage from "@routes/tagsPage";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Root />}>
          <Route
            index
            element={<Home />}
          />

          <Route
            path="/signin"
            element={<SigninPage />}
          />
          <Route
            path="/signup"
            element={<SignupPage />}
          />
          <Route
            path="favorites"
            element={<FavoritesPage />}
          />
          <Route
            path="books"
            element={<BooksPage />}>
            <Route
              index
              element={<BooksView />}
            />
            <Route
              path=":book_id"
              element={<BookPage />}
            />
          </Route>
          <Route
            path="tags"
            element={<TagsPage />}
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
