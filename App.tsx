
import React from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CheckInFlow from './pages/CheckInFlow';
import SOSPage from './pages/SOSPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import EmotionDiaryPage from './pages/EmotionDiaryPage';
import GuidedBreathingPage from './pages/GuidedBreathingPage';
import AchievementsPage from './pages/AchievementsPage';
import ReflectionGuidesPage from './pages/ReflectionGuidesPage';
import ToolsPage from './pages/ToolsPage';
import StopTechniquePage from './pages/StopTechniquePage';
import UrgeSurfingPage from './pages/UrgeSurfingPage';
import GroundingPage from './pages/GroundingPage';
import HungerMappingPage from './pages/HungerMappingPage';
import MindfulEatingPage from './pages/MindfulEatingPage';
import BodyScanPage from './pages/BodyScanPage';
import GentleStretchesPage from './pages/GentleStretchesPage';
import SomaticGratitudePage from './pages/SomaticGratitudePage';
import HistoryPage from './pages/HistoryPage';
import Navbar from './components/Navbar';

const AppContent: React.FC = () => {
  const location = useLocation();
  const showNavbar = !['/', '/check-in', '/sos', '/emotion-diary', '/breathing', '/achievements', '/reflection-guides', '/stop-technique', '/urge-surfing', '/grounding', '/hunger-mapping', '/mindful-eating', '/body-scan', '/stretches', '/gratitude', '/history', '/edit-profile'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-black dark:text-white selection:bg-primary selection:text-background-dark transition-colors duration-500">
      <div className="max-w-md mx-auto relative bg-background-light dark:bg-background-dark min-h-screen shadow-2xl flex flex-col transition-colors duration-500">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/check-in" element={<CheckInFlow />} />
          <Route path="/sos" element={<SOSPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/emotion-diary" element={<EmotionDiaryPage />} />
          <Route path="/breathing" element={<GuidedBreathingPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/reflection-guides" element={<ReflectionGuidesPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/stop-technique" element={<StopTechniquePage />} />
          <Route path="/urge-surfing" element={<UrgeSurfingPage />} />
          <Route path="/grounding" element={<GroundingPage />} />
          <Route path="/hunger-mapping" element={<HungerMappingPage />} />
          <Route path="/mindful-eating" element={<MindfulEatingPage />} />
          <Route path="/body-scan" element={<BodyScanPage />} />
          <Route path="/stretches" element={<GentleStretchesPage />} />
          <Route path="/gratitude" element={<SomaticGratitudePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
        {showNavbar && <Navbar />}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
