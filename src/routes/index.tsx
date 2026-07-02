import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import HomePage from "../pages/HomePage";
import TaskFormPage from "../pages/TaskFormPage";
import TaskDetailPage from "../pages/TaskDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/task/:id" element={<TaskDetailPage />} />
          <Route path="/task/add" element={<TaskFormPage />} />
          <Route path="/task/edit/:id" element={<TaskFormPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}