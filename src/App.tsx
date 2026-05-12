import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './app/LanguageContext';
import { AppLayout } from './layouts/AppLayout';
import { ChallengesPage } from './pages/ChallengesPage';
import { LabPage } from './pages/LabPage';
import { LessonsPage } from './pages/LessonsPage';
import { ProfilePage } from './pages/ProfilePage';
import { QuestionsPage } from './pages/QuestionsPage';
import { WelcomePage } from './pages/WelcomePage';

const App = () => (
  <LanguageProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="laboratorio" element={<LabPage />} />
          <Route path="retos" element={<ChallengesPage />} />
          <Route path="preguntas" element={<QuestionsPage />} />
          <Route path="lecciones" element={<LessonsPage />} />
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </LanguageProvider>
);

export default App;
