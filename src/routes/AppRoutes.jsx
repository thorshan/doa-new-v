import { Route, Routes } from "react-router-dom";
import Home from "../ui/views/Home";
import ComingSoon from "../ui/views/ComingSoon";
import Login from "../ui/auth/Login";
import Register from "../ui/auth/Register";
import TermsOfService from "../ui/legals/TermsOfService";
import PrivacyPolicy from "../ui/legals/PrivacyPolicy";
import Dashboard from "../ui/views/Dashboard";
import Profile from "../ui/views/user/Profile";
import Exams from "../ui/views/exams/Exams";
import ProtectedRoute from "./ProtectedRoute";
import EditProfile from "../ui/views/user/EditProfile";
import AvatarPicker from "../ui/views/user/AvatarPicker";
import MockExams from "../ui/views/exams/MockExams";
import MockExamScreen from "../ui/views/exams/MockExamScreen";
import Course from "../ui/views/courses/Course";
import ChapterDetails from "../ui/views/courses/ChapterDetails";
import SpeakingPage from "../ui/views/courses/Speaking";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      <Route path="/:id/profile" element={<Profile />} />
      <Route path="/:id/profile/edit" element={<EditProfile />} />
      <Route path="/:id/profile/avatars" element={<AvatarPicker />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={null} />{" "}
        <Route path="exams">
          <Route index element={<Exams />}></Route>
          <Route path="mock" element={<MockExams />}></Route>
          <Route path=":id" element={<MockExamScreen />}></Route>
        </Route>
        <Route path="courses">
          <Route index element={<Course />} />
          <Route path="chapters">
            <Route path=":id">
              <Route index element={<ChapterDetails />} />
              <Route path="speaking" element={<SpeakingPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
