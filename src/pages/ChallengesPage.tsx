import { Crown, Flag, Gamepad2, Puzzle, Shield, Sparkles, Star, Trophy } from 'lucide-react';
import { useLanguage } from '../app/LanguageContext';

const challengeTracks = [
  {
    icon: Flag,
    title: {
      qu: 'Misiones punchaw',
      es: 'Misiones del día',
    },
    description: {
      qu: 'Sapa punchaw huk reto uchuy: saluday, yupay, utaq kichasqa problema allinchay.',
      es: 'Un reto corto diario para practicar saludos, conteo o pequeños problemas lógicos.',
    },
  },
  {
    icon: Puzzle,
    title: {
      qu: 'Rompecodigo',
      es: 'Rompecódigo',
    },
    description: {
      qu: 'Pedazospi qillqasqa codigo allin ordenman churay.',
      es: 'Ordena fragmentos de código para formar una solución correcta.',
    },
  },
  {
    icon: Trophy,
    title: {
      qu: 'Atipanakuq niveles',
      es: 'Niveles y ligas',
    },
    description: {
      qu: "Ruraykunata tukuptiyki nivelniyki wiñan hinaspa insigniakuna hap'inki.",
      es: 'Completa actividades para subir de nivel y ganar insignias.',
    },
  },
  {
    icon: Star,
    title: {
      qu: 'Yachaykunaq mapa',
      es: 'Mapa de progreso',
    },
    description: {
      qu: 'Retokunaqa mapa hina riqsichisqa kanman, maypi kaqta yachanaykipaq.',
      es: 'Los retos podrían mostrarse como un mapa visual para ver tu avance.',
    },
  },
];

const rankCards = [
  {
    icon: Shield,
    tone: 'bronze',
    stars: 12,
    title: { qu: 'Bronce', es: 'Bronce' },
    description: {
      qu: 'Qallariqkunaq rango. Rimay, wakichiy hinaspa secuencias.',
      es: 'Rango inicial para dominar mensajes, variables y secuencias.',
    },
  },
  {
    icon: Star,
    tone: 'gold',
    stars: 28,
    title: { qu: 'Quri', es: 'Oro' },
    description: {
      qu: 'Sichus, akllay hinaspa pantay allinchaypi kallpachasqa.',
      es: 'Pensado para decisiones, comparaciones y corrección de errores.',
    },
  },
  {
    icon: Crown,
    tone: 'crystal',
    stars: 48,
    title: { qu: 'Kristal', es: 'Cristal' },
    description: {
      qu: 'Muyukuna, patrones hinaspa mini-juegos de logica.',
      es: 'Etapa avanzada para bucles, patrones y mini juegos lógicos.',
    },
  },
];

export const ChallengesPage = () => {
  const { locale } = useLanguage();

  return (
    <div className="page-stack">
      <section className="hero-panel challenge-hero">
        <div className="hero-panel__copy">
          <span className="eyebrow">{locale === 'qu' ? 'Concepto inicial' : 'Concepto inicial'}</span>
          <h1>{locale === 'qu' ? 'Retokuna hinaspa pukllaykuna' : 'Retos y juegos'}</h1>
          <p>
            {locale === 'qu'
              ? 'Kay seccionqa aprendizaje basado en juego hina kanman: misiones, niveles, insignias hinaspa colaboracion.'
              : 'Esta sección puede crecer como una experiencia de aprendizaje basada en juego: misiones, niveles, insignias y colaboración.'}
          </p>
        </div>
        <div className="challenge-scoreboard">
          <div className="challenge-scoreboard__main">
            <Gamepad2 size={22} />
            <strong>{locale === 'qu' ? 'Pukllay modo' : 'Modo juego'}</strong>
          </div>
          <div className="challenge-scoreboard__stats">
            <span>1280 XP</span>
            <span>37 {locale === 'qu' ? 'quyllurkuna' : 'estrellas'}</span>
            <span>{locale === 'qu' ? 'Rango Oro' : 'Rango Oro'}</span>
          </div>
        </div>
      </section>

      <section className="challenge-ranks">
        {rankCards.map(({ icon: Icon, title, description, stars, tone }) => (
          <article key={title.es} className={`rank-card rank-card--${tone}`}>
            <span className="rank-card__icon">
              <Icon size={24} />
            </span>
            <div className="rank-card__stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <Sparkles key={`${title.es}-${index}`} size={14} />
              ))}
            </div>
            <h2>{title[locale]}</h2>
            <strong>{stars} {locale === 'qu' ? 'quyllurkuna' : 'estrellas'}</strong>
            <p>{description[locale]}</p>
          </article>
        ))}
      </section>

      <section className="card-grid card-grid--two challenge-track-grid">
        {challengeTracks.map(({ icon: Icon, title, description }) => (
          <article key={title.es} className="panel-card feature-card feature-card--playful">
            <span className="feature-card__icon feature-card__icon--playful">
              <Icon size={24} />
            </span>
            <h2>{title[locale]}</h2>
            <p>{description[locale]}</p>
          </article>
        ))}
      </section>

      <section className="panel-card concept-card challenge-path">
        <div className="section-heading">
          <h2>{locale === 'qu' ? 'Sugerencia de estructura' : 'Sugerencia de estructura'}</h2>
        </div>
        <div className="concept-list">
          <div>
            <strong>{locale === 'qu' ? 'Nivel 1' : 'Nivel 1'}</strong>
            <p>{locale === 'qu' ? 'Secuencias, rimay, wakichiy.' : 'Secuencias, mensajes y variables.'}</p>
          </div>
          <div>
            <strong>{locale === 'qu' ? 'Nivel 2' : 'Nivel 2'}</strong>
            <p>{locale === 'qu' ? 'Sichus, comparaciones, decisiones.' : 'Condiciones, comparaciones y decisiones.'}</p>
          </div>
          <div>
            <strong>{locale === 'qu' ? 'Nivel 3' : 'Nivel 3'}</strong>
            <p>{locale === 'qu' ? 'Muyukuna, patrones y mini juegos.' : 'Bucles, patrones y minijuegos.'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
