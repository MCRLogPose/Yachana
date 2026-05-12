import { BellRing, Link2, ShieldCheck, Trophy } from 'lucide-react';
import { useLanguage } from '../app/LanguageContext';

const profileHighlights = [
  {
    icon: Link2,
    title: {
      qu: 'Cuenta vinculay',
      es: 'Vincular cuenta',
    },
    description: {
      qu: 'Mana login kaptinpas qipaman Google utaq correo nisqawan huñunakuq perfil yapayta atisun.',
      es: 'Aunque hoy no haya login, aquí luego podrás vincular correo o una cuenta externa.',
    },
  },
  {
    icon: Trophy,
    title: {
      qu: 'Progreso qhaway',
      es: 'Ver progreso',
    },
    description: {
      qu: 'Yachaykuna, retos, insignias hinaspa rankokuna kaypi rikuchisqa kanqa.',
      es: 'Aquí se mostrará el avance en lecciones, retos, insignias y rangos.',
    },
  },
  {
    icon: BellRing,
    title: {
      qu: 'Notificaciones',
      es: 'Notificaciones',
    },
    description: {
      qu: 'Punchaw reto musuq kasqanmanta utaq leccion tukusqamanta willakuykunata chaskinki.',
      es: 'Recibirás avisos sobre nuevos retos, recordatorios o avances pendientes.',
    },
  },
];

export const ProfilePage = () => {
  const { locale } = useLanguage();

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-panel__copy">
          <span className="eyebrow">{locale === 'qu' ? 'Ñawpaq versión' : 'Primera versión'}</span>
          <h1>{locale === 'qu' ? 'Usuarioq perfilnin' : 'Perfil del usuario'}</h1>
          <p>
            {locale === 'qu'
              ? 'Kay seccionqa perfil, progreso hinaspa notificacionespaq wakichisqa kachkan. Cuenta mana vinculaspapas webta llamkachiyta atinki.'
              : 'Esta sección prepara el espacio para progreso, notificaciones y futura vinculación de cuentas. La web seguirá funcionando incluso sin vincular una cuenta.'}
          </p>
        </div>
      </section>

      <section className="card-grid card-grid--two">
        {profileHighlights.map(({ icon: Icon, title, description }) => (
          <article key={title.es} className="panel-card feature-card">
            <span className="feature-card__icon">
              <Icon size={24} />
            </span>
            <h2>{title[locale]}</h2>
            <p>{description[locale]}</p>
          </article>
        ))}

        <article className="panel-card profile-status-card">
          <div className="profile-status-card__header">
            <span className="feature-card__icon">
              <ShieldCheck size={24} />
            </span>
            <div>
              <h2>{locale === 'qu' ? 'Estado actual' : 'Estado actual'}</h2>
              <p>
                {locale === 'qu'
                  ? 'Anónimo rikurinki, ichaqa sistemaqa cuenta vinculacionpaq listo kachkan.'
                  : 'Actualmente navegas como visitante, pero el sistema queda listo para integrar una cuenta.'}
              </p>
            </div>
          </div>
          <div className="bullet-list">
            <div className="bullet-list__item">
              <span className="bullet-dot" />
              <span>{locale === 'qu' ? 'Perfil sin login' : 'Perfil sin login obligatorio'}</span>
            </div>
            <div className="bullet-list__item">
              <span className="bullet-dot" />
              <span>{locale === 'qu' ? 'Notificaciones qipapaq' : 'Espacio para notificaciones futuras'}</span>
            </div>
            <div className="bullet-list__item">
              <span className="bullet-dot" />
              <span>{locale === 'qu' ? 'Progreso rikuchiypaq panel' : 'Panel listo para mostrar progreso'}</span>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};
