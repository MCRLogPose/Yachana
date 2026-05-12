import { Bot, Mic, SendHorizontal } from 'lucide-react';
import { useLanguage } from '../app/LanguageContext';

export const QuestionsPage = () => {
  const { locale } = useLanguage();

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-panel__copy">
          <span className="eyebrow">{locale === 'qu' ? 'Chat futuro' : 'Chat futuro'}</span>
          <h1>{locale === 'qu' ? 'Tapukuy chat' : 'Chat de preguntas'}</h1>
          <p>
            {locale === 'qu'
              ? 'Kay espacioqa ChatGPT hina utaq Codex hina rikch\'akunanpaq wakichisqa. Kunanqa solo interfazmi, qipaman IAwan tinkuchisunchik.'
              : 'Esta vista está preparada para sentirse como una consulta tipo ChatGPT o Codex. Por ahora es solo la interfaz, lista para conectar una IA más adelante.'}
          </p>
        </div>
      </section>

      <section className="chat-shell">
        <aside className="chat-sidebar panel-card">
          <div className="section-heading">
            <h2>{locale === 'qu' ? 'Sugerencias' : 'Sugerencias'}</h2>
          </div>
          <div className="prompt-grid">
            <button className="prompt-card" type="button">
              {locale === 'qu' ? 'Imaynataq wakichiy llamk\'an?' : '¿Cómo funciona una variable?'}
            </button>
            <button className="prompt-card" type="button">
              {locale === 'qu' ? 'Kay pantayta explicaway' : 'Explícame este error'}
            </button>
            <button className="prompt-card" type="button">
              {locale === 'qu' ? 'Muyuwan ejemplo qaway' : 'Muéstrame un ejemplo con bucles'}
            </button>
          </div>
        </aside>

        <section className="chat-panel panel-card">
          <div className="chat-thread">
            <article className="chat-message chat-message--assistant">
              <span className="chat-avatar">
                <Bot size={18} />
              </span>
              <div>
                <strong>{locale === 'qu' ? 'Yachaq Yanapaq' : 'Asistente de aprendizaje'}</strong>
                <p>
                  {locale === 'qu'
                    ? 'Kay chatqa wakichisqa kachkan. Qipaman IAwan kutichiy, documentacionmanta tapuy hinaspa error explicacion yapasunchik.'
                    : 'Este chat ya está preparado. Más adelante aquí conectaremos respuestas IA, consulta de documentación y explicación de errores.'}
                </p>
              </div>
            </article>
          </div>

          <div className="chat-input">
            <button className="icon-button" type="button">
              <Mic size={18} />
            </button>
            <input
              disabled
              placeholder={
                locale === 'qu'
                  ? 'Kaypi qillqanki tapukuynikita...'
                  : 'Escribe aquí tu pregunta...'
              }
              type="text"
            />
            <button className="primary-button icon-button icon-button--send" type="button">
              <SendHorizontal size={18} />
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};
