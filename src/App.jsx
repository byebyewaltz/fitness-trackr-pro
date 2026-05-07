import { Routes, Route } from "react-router";

import Layout from "./layout/Layout";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetail from "./activities/ActivityDetail";
import RoutinesPage from "./activities/RoutinesPage";
import RoutineDetail from "./activities/RoutineDetail";
import Error404 from "./Error404.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ActivitiesPage />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        <Route path="/routines" element={<RoutinesPage />} />
        <Route path="/routines/:id" element={<RoutineDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
