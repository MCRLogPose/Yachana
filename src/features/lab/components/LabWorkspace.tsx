import { useEffect, useMemo, useState } from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import { lessons } from '../../../data/lessons';
import { QUECHUA_LANGUAGE_ID, defaultProgram, quechuaKeywords } from '../../../language/keywords';
import { executeSource } from '../../../language/runtime';
import { useLanguage } from '../../../app/LanguageContext';

type PanelTab = 'output' | 'tokens' | 'ast' | 'memory';

type RunState = {
  output: string[];
  tokens: unknown[];
  ast: unknown;
  environment: Record<string, string | number | boolean>;
  error?: string;
};

const guideItems = [
  {
    title: { qu: 'Wakichiy ruwana', es: 'Crear variables' },
    snippet: 'wakichiy nombre = "Kusi";',
  },
  {
    title: { qu: 'Rimay qhawachiy', es: 'Mostrar mensajes' },
    snippet: 'rimay "Allillanchu";',
  },
  {
    title: { qu: 'Sichus akllay', es: 'Decidir' },
    snippet: 'sichus (edad >= 7) { rimay "Listo"; }',
  },
  {
    title: { qu: 'Muyu kutichiy', es: 'Repetir' },
    snippet: 'muyu 3 kuti { rimay "Tinkuy"; }',
  },
];

const initialState: RunState = {
  output: [],
  tokens: [],
  ast: null,
  environment: {},
};

export const LabWorkspace = () => {
  const { locale } = useLanguage();
  const [selectedLessonId, setSelectedLessonId] = useState(lessons[0].id);
  const [source, setSource] = useState(defaultProgram);
  const [activeTab, setActiveTab] = useState<PanelTab>('output');
  const [runState, setRunState] = useState<RunState>(initialState);
  const [executionToast, setExecutionToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const selectedLesson = useMemo(
    () => lessons.find((lesson) => lesson.id === selectedLessonId) ?? lessons[0],
    [selectedLessonId],
  );

  useEffect(() => {
    setSource(selectedLesson.code);
    setRunState(initialState);
  }, [selectedLesson]);

  useEffect(() => {
    if (!executionToast) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setExecutionToast(null);
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [executionToast]);

  const runCode = () => {
    try {
      const result = executeSource(source);
      setRunState({
        output: result.output,
        tokens: result.tokens,
        ast: result.ast,
        environment: result.environment,
      });
      setActiveTab('output');
      setExecutionToast({
        type: 'success',
        message: locale === 'qu' ? 'Allinmi purirqa' : 'Ejecución exitosa',
      });
    } catch (error) {
      setRunState({
        output: [],
        tokens: [],
        ast: null,
        environment: {},
        error: error instanceof Error ? error.message : locale === 'qu' ? 'Mana reqsisqa pantay.' : 'Error desconocido.',
      });
      setActiveTab('output');
      setExecutionToast({
        type: 'error',
        message: locale === 'qu' ? 'Pantasqawan tukurqa' : 'La ejecución falló',
      });
    }
  };

  const resetLesson = () => {
    setSource(selectedLesson.code);
    setRunState(initialState);
  };

  return (
    <div className="page-stack">
      {executionToast ? (
        <div className={`execution-toast execution-toast--${executionToast.type}`}>
          {executionToast.type === 'success' ? <CheckCircle2 size={18} /> : <CircleAlert size={18} />}
          <span>{executionToast.message}</span>
        </div>
      ) : null}

      <section className="hero-panel">
        <div className="hero-panel__copy">
          <span className="eyebrow">{locale === 'qu' ? 'Laboratorio activo' : 'Laboratorio activo'}</span>
          <h1>{locale === 'qu' ? 'RimayScript laboratorio' : 'Laboratorio RimayScript'}</h1>
          <p>
            {locale === 'qu'
              ? "Kaypi qillqay, pruebay hinaspa consola ukupi imayna llamk'asqanta qhawariy."
              : 'Aquí puedes escribir código, probarlo y observar cómo se comporta dentro de la consola y la depuración.'}
          </p>
        </div>
        <div className="hero-panel__actions">
          <button className="primary-button" onClick={runCode} type="button">
            {locale === 'qu' ? 'Purichiy' : 'Ejecutar'}
          </button>
          <button className="secondary-button" onClick={resetLesson} type="button">
            {locale === 'qu' ? 'Kutichiy ejemplo' : 'Restaurar ejemplo'}
          </button>
        </div>
      </section>

      <section className="lab-grid">
        <aside className="panel-card lab-sidebar">
          <div className="section-heading">
            <h2>{locale === 'qu' ? 'Yachaykuna' : 'Lecciones'}</h2>
            <span>{locale === 'qu' ? 'Akllay' : 'Selecciona'}</span>
          </div>
          <div className="lesson-list">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                className={`lesson-item ${lesson.id === selectedLesson.id ? 'selected' : ''}`}
                onClick={() => setSelectedLessonId(lesson.id)}
                type="button"
              >
                <span className="lesson-index">0{index + 1}</span>
                <strong>{lesson.title[locale]}</strong>
                <span>{lesson.objective[locale]}</span>
              </button>
            ))}
          </div>

          <div className="guide-list">
            <div className="section-heading">
              <h2>{locale === 'qu' ? 'Utqay yanapaq' : 'Guía rápida'}</h2>
              <span>{locale === 'qu' ? 'Qallariy' : 'Empieza aquí'}</span>
            </div>
            {guideItems.map((item) => (
              <article key={item.snippet} className="guide-item">
                <h3>{item.title[locale]}</h3>
                <code>{item.snippet}</code>
              </article>
            ))}
          </div>
        </aside>

        <div className="lab-main">
          <section className="editor-card">
            <div className="card-header">
              <div>
                <h2>{locale === 'qu' ? 'Qillqana' : 'Editor'}</h2>
                <span>
                  {locale === 'qu'
                    ? 'Qillqayta ruray hinaspa utqayta pruebay'
                    : 'Escribe tu código y pruébalo al instante'}
                </span>
              </div>
              <div className="editor-chip-group">
                <span className="editor-chip">RimayScript</span>
                <span className="editor-chip">Monaco</span>
                <span className="editor-chip">Debug</span>
              </div>
            </div>
            <Editor
              height="440px"
              defaultLanguage={QUECHUA_LANGUAGE_ID}
              language={QUECHUA_LANGUAGE_ID}
              value={source}
              onChange={(value) => setSource(value ?? '')}
              beforeMount={configureMonaco}
              options={{
                fontSize: 18,
                minimap: { enabled: false },
                roundedSelection: true,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 18, bottom: 18 },
                lineNumbersMinChars: 3,
              }}
              theme="rimay-sunrise"
            />
          </section>

          <section className="results-grid">
            <article className="panel-card console-card">
              <div className="card-header">
                <div>
                  <h2>{locale === 'qu' ? 'Consola hinaspa depuracion' : 'Consola y depuración'}</h2>
                  <span>
                    {locale === 'qu'
                      ? 'Programa nisqaykiq ruwasqanta kaypi rikunki'
                      : 'Aquí ves lo que hace tu programa'}
                  </span>
                </div>
                <div className="tab-row">
                  {(['output', 'tokens', 'ast', 'memory'] as PanelTab[]).map((tab) => (
                    <button
                      key={tab}
                      className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                      type="button"
                    >
                      {renderTabLabel(tab, locale)}
                    </button>
                  ))}
                </div>
              </div>
              {runState.error ? (
                <pre className="panel error-panel">{runState.error}</pre>
              ) : (
                <pre className="panel console-panel">
                  {activeTab === 'output' &&
                    formatOutput(
                      runState.output,
                      locale === 'qu'
                        ? 'Programa purichiy, chaymanta rikunki imataq ruwasqa kasqanta.'
                        : 'Ejecuta el programa para ver los resultados.',
                    )}
                  {activeTab === 'tokens' && JSON.stringify(runState.tokens, null, 2)}
                  {activeTab === 'ast' && JSON.stringify(runState.ast, null, 2)}
                  {activeTab === 'memory' && JSON.stringify(runState.environment, null, 2)}
                </pre>
              )}
            </article>

            <article className="panel-card info-stack">
              <div>
                <h2>{locale === 'qu' ? 'Meta' : 'Meta'}</h2>
                <p className="muted-text">{selectedLesson.tip[locale]}</p>
              </div>
              <div>
                <p>{locale === 'qu' ? 'Suyasqa lluqsimuy' : 'Salida esperada'}</p>
                <pre className="small-panel">{selectedLesson.expectedOutput.join('\n')}</pre>
              </div>
              {selectedLesson.expectedEnvironment ? (
                <div>
                  <p>{locale === 'qu' ? 'Wakichiykuna' : 'Variables esperadas'}</p>
                  <pre className="small-panel">
                    {JSON.stringify(selectedLesson.expectedEnvironment, null, 2)}
                  </pre>
                </div>
              ) : null}
            </article>
          </section>
        </div>
      </section>
    </div>
  );
};

const configureMonaco = (monaco: Monaco) => {
  monaco.languages.register({ id: QUECHUA_LANGUAGE_ID });
  monaco.languages.setMonarchTokensProvider(QUECHUA_LANGUAGE_ID, {
    keywords: [...quechuaKeywords],
    operators: ['=', '+', '-', '*', '/', '==', '!=', '>=', '<=', '&&', '||', '>', '<'],
    tokenizer: {
      root: [
        [/[a-zA-Z_][\w]*/, { cases: { '@keywords': 'keyword', '@default': 'identifier' } }],
        [/\d+(\.\d+)?/, 'number'],
        [/".*?"/, 'string'],
        [/[{}();]/, 'delimiter'],
        [/[=><!~?:&|+\-*\/]+/, 'operator'],
        [/#.*$/, 'comment'],
      ],
    },
  });

  monaco.editor.defineTheme('rimay-sunrise', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: 'b42318', fontStyle: 'bold' },
      { token: 'number', foreground: 'ca6702' },
      { token: 'string', foreground: '0f766e' },
      { token: 'comment', foreground: '6b7280' },
      { token: 'operator', foreground: '005f73' },
    ],
    colors: {
      'editor.background': '#fffdf8',
      'editorLineNumber.foreground': '#c08457',
      'editorLineNumber.activeForeground': '#7c2d12',
      'editorCursor.foreground': '#b45309',
      'editor.selectionBackground': '#fde68a66',
      'editor.inactiveSelectionBackground': '#fde68a44',
    },
  });
};

const renderTabLabel = (tab: PanelTab, locale: 'qu' | 'es') => {
  const labels = {
    qu: {
      output: 'Lluqsimuy',
      tokens: 'Tokens',
      ast: "Sach'a",
      memory: 'Yuyay',
    },
    es: {
      output: 'Salida',
      tokens: 'Tokens',
      ast: 'AST',
      memory: 'Memoria',
    },
  } as const;

  return labels[locale][tab];
};

const formatOutput = (lines: string[], emptyMessage: string) =>
  lines.length > 0 ? lines.join('\n') : emptyMessage;
