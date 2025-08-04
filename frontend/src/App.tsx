import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import {
  Home,
  Login,
  Register,
  Projects,
  Project,
  NotFound,
  Leaderboard,
} from './pages';

const App = () => {
  return (
    <div className="min-h-screen">
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
