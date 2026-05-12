import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';

export const AppLayout = () => (
  <div className="app-layout">
    <div className="app-shell">
      <Sidebar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  </div>
);
