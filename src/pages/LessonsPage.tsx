import { useState } from 'react';
import { BookMarked, ChevronRight, NotebookPen } from 'lucide-react';
import { useLanguage } from '../app/LanguageContext';
import { courseSections } from '../data/courseContent';

export const LessonsPage = () => {
  const { locale } = useLanguage();
  const [activeSectionId, setActiveSectionId] = useState(courseSections[0].id);
  const activeSection = courseSections.find((section) => section.id === activeSectionId) ?? courseSections[0];

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-panel__copy">
          <span className="eyebrow">{locale === 'qu' ? 'Curso guiado' : 'Curso guiado'}</span>
          <h1>{locale === 'qu' ? 'Lecciones teoricas' : 'Lecciones teóricas'}</h1>
          <p>
            {locale === 'qu'
              ? "Kaypi conceptos basicos nisqakuna sut'ita yachachisqa kachkan, laboratorio manaraq yaykunapaq."
              : 'Aquí se presenta la teoría de forma clara antes o después de practicar en el laboratorio.'}
          </p>
        </div>
      </section>

      <section className="lessons-shell">
        <aside className="panel-card lessons-outline">
          <div className="section-heading">
            <h2>{locale === 'qu' ? 'Modulokuna' : 'Módulos'}</h2>
          </div>
          <div className="lessons-outline__list lessons-scroll">
            {courseSections.map((section) => (
              <button
                key={section.id}
                className={`lessons-outline__item ${section.id === activeSection.id ? 'active' : ''}`}
                onClick={() => setActiveSectionId(section.id)}
                type="button"
              >
                <span className="lessons-outline__module">{section.module[locale]}</span>
                <strong>{section.title[locale]}</strong>
                <p className="lessons-outline__summary">{section.summary[locale]}</p>
              </button>
            ))}
          </div>
        </aside>

        <article className="panel-card lessons-detail">
          <div className="lessons-detail__scroll lessons-scroll">
            <div className="lessons-detail__header">
              <div className="lessons-detail__badge">
                <NotebookPen size={20} />
                <span>{activeSection.module[locale]}</span>
              </div>
              <span className="feature-card__icon">
                <BookMarked size={22} />
              </span>
            </div>

            <h2>{activeSection.title[locale]}</h2>
            <p>{activeSection.summary[locale]}</p>

            <div className="lessons-detail__subtopics">
              {activeSection.subtopics.map((subtopic) => (
                <div key={subtopic.es} className="lessons-detail__topic-chip">
                  <ChevronRight size={14} />
                  {subtopic[locale]}
                </div>
              ))}
            </div>

            <div className="bullet-list">
              {activeSection.points.map((point) => (
                <div key={point.es} className="bullet-list__item">
                  <span className="bullet-dot" />
                  <span>{point[locale]}</span>
                </div>
              ))}
            </div>

            <div className="lesson-detail-sections">
              {activeSection.details.map((detail) => (
                <section key={detail.heading.es} className="lesson-detail-section">
                  <h3>{detail.heading[locale]}</h3>
                  {detail.body.map((paragraph) => (
                    <p key={paragraph.es}>{paragraph[locale]}</p>
                  ))}
                </section>
              ))}
            </div>

            <div className="lesson-examples">
              {activeSection.examples.map((example) => (
                <article key={example.title.es} className="lesson-example-card">
                  <h3>{example.title[locale]}</h3>
                  <pre className="small-panel">{example.code}</pre>
                  <p>{example.result[locale]}</p>
                </article>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};
