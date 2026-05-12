import { useState } from 'react';
import {
  BookOpen,
  Bot,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Gamepad2,
  Home,
  UserRound,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../app/LanguageContext';
import { navigationItems } from '../../data/navigation';

const navIcons = {
  '/': Home,
  '/laboratorio': FlaskConical,
  '/retos': Gamepad2,
  '/preguntas': Bot,
  '/lecciones': BookOpen,
  '/perfil': UserRound,
} as const;

export const Sidebar = () => {
  const { locale, setLocale } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__top">
        <div className="sidebar__brand">
          <span className="sidebar__logo">RY</span>
          {!isCollapsed ? (
            <div className="sidebar__brand-copy">
              <strong>Rimay Yachay</strong>
              <small>{locale === 'qu' ? 'Yachay sistema' : 'Sistema de aprendizaje'}</small>
            </div>
          ) : null}
        </div>

        <button
          className="sidebar__collapse"
          onClick={() => setIsCollapsed((current) => !current)}
          type="button"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {!isCollapsed ? (
        <div className="sidebar__language">
          <div className="language-switcher" aria-label={locale === 'qu' ? 'Simi akllay' : 'Idioma'}>
            <button
              className={`language-pill ${locale === 'qu' ? 'active' : ''}`}
              onClick={() => setLocale('qu')}
              type="button"
            >
              Runasimi
            </button>
            <button
              className={`language-pill ${locale === 'es' ? 'active' : ''}`}
              onClick={() => setLocale('es')}
              type="button"
            >
              Castellano
            </button>
          </div>
        </div>
      ) : (
        <button
          className="sidebar__mini-language"
          onClick={() => setLocale(locale === 'qu' ? 'es' : 'qu')}
          type="button"
        >
          {locale === 'qu' ? 'QU' : 'ES'}
        </button>
      )}

      <nav className="sidebar__nav">
        {navigationItems.map((item) => {
          const Icon = navIcons[item.path];

          return (
            <NavLink
              key={item.path}
              className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}
              title={item.label[locale]}
              to={item.path}
            >
              <span className="sidebar__icon">
                <Icon size={20} />
              </span>
              {!isCollapsed ? (
                <span className="sidebar__text">
                  <strong>{item.label[locale]}</strong>
                  <small>{item.shortDescription[locale]}</small>
                </span>
              ) : null}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
