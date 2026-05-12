import { BookOpen, Bot, FlaskConical, Gamepad2, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../app/LanguageContext';
import { platformSections } from '../data/platformSections';

const sectionIcons = {
  '/laboratorio': FlaskConical,
  '/retos': Gamepad2,
  '/preguntas': Bot,
  '/lecciones': BookOpen,
  '/perfil': UserRound,
} as const;

export const WelcomePage = () => {
  const { locale } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="page-stack">
      <section className="welcome-hero">
        <div className="welcome-hero__content">
          <span className="eyebrow">Rimay Yachay</span>
          <h1>
            {locale === 'qu'
              ? 'Hamuy, programacionta runasimipi yachasun'
              : 'Bienvenida al sistema de aprendizaje en quechua'}
          </h1>
          <p>
            {locale === 'qu'
              ? "Kay ñawpaq p'anqapi sistema ukupi imakuna kananta rikunki. Sapanka seccionqa huk ruwayniyuqmi: laboratorio, retos, preguntas, lecciones hinaspa perfil."
              : 'Esta es la página de entrada del sistema. Aquí se presenta claramente cada espacio de la plataforma: laboratorio, retos y juegos, preguntas, lecciones y perfil.'}
          </p>
          <div className="welcome-hero__actions">
            <Link className="primary-button button-link" to="/laboratorio">
              {locale === 'qu' ? 'Laboratorioman yaykuy' : 'Entrar al laboratorio'}
            </Link>
            <Link className="secondary-button button-link" to="/lecciones">
              {locale === 'qu' ? 'Lecciones qhaway' : 'Ver lecciones'}
            </Link>
          </div>
        </div>

        <div className="welcome-stat-card">
          <strong>{locale === 'qu' ? 'Sistema nisqapa mapa' : 'Mapa del sistema'}</strong>
          <div className="welcome-stat-card__list">
            <span>{locale === 'qu' ? '1. Qallariy yuyay' : '1. Explorar'}</span>
            <span>{locale === 'qu' ? '2. Practicar laboratorio' : '2. Practicar'}</span>
            <span>{locale === 'qu' ? '3. Pukllaspa wiñay' : '3. Mejorar jugando'}</span>
            <span>{locale === 'qu' ? '4. Progreso qhaway' : '4. Revisar progreso'}</span>
          </div>
        </div>
      </section>

      <section className="card-grid card-grid--two">
        {platformSections.map((section) => {
          const Icon = sectionIcons[section.path];

          return (
            <article
              key={section.path}
              className="panel-card platform-card platform-card--interactive"
              onDoubleClick={() => navigate(section.path)}
            >
              <div className="platform-card__top">
                <span className="platform-card__eyebrow">{section.eyebrow}</span>
                <span className="feature-card__icon">
                  <Icon size={24} />
                </span>
              </div>
              <h2>{section.title[locale]}</h2>
              <p>{section.description[locale]}</p>
              <div className="bullet-list">
                {section.bullets.map((bullet) => (
                  <div key={bullet.es} className="bullet-list__item">
                    <span className="bullet-dot" />
                    <span>{bullet[locale]}</span>
                  </div>
                ))}
              </div>
              <small className="platform-card__hint">
                {locale === 'qu'
                  ? "Iskay kuti ñit'iy kayman yaykunaykipaq"
                  : 'Haz doble clic para entrar a esta sección'}
              </small>
            </article>
          );
        })}
      </section>
    </div>
  );
};
