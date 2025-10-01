import React from "react";
import Homepage from "./pages/Homepage";
import DepositoryPage from "./pages/DepositoryPage";
import ReceptoryPage from "./pages/ReceptoryPage";
import NewEntriesPage from "./pages/NewEntriesPage";
import LaboratoryPage from "./pages/LaboratoryPage";
import Showcase from "./pages/showcase";
import Showcase2 from "./pages/Showcase2";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./components/PrivateRoute";
import RetrievalFormPage from "./pages/RetrievalFormPage";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/Homepage"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      />
      <Route
        path="/انبار"
        element={
          <PrivateRoute>
            <DepositoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/پذیرش"
        element={
          <PrivateRoute>
            <ReceptoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ورودی_جدید"
        element={
          <PrivateRoute>
            <NewEntriesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/مرکز_آزمون"
        element={
          <PrivateRoute>
            <LaboratoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/retrieval_form"
        element={
          <PrivateRoute>
            <RetrievalFormPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
