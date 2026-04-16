import { useEffect, useMemo, useState } from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import { lessons } from './data/lessons';
import { QUECHUA_LANGUAGE_ID, defaultProgram, quechuaKeywords } from './language/keywords';
import { executeSource } from './language/runtime';

type PanelTab = 'output' | 'tokens' | 'ast' | 'memory';

type RunState = {
  output: string[];
  tokens: unknown[];
  ast: unknown;
  environment: Record<string, string | number | boolean>;
  error?: string;
};

const guideItems = [
  { title: 'Crear variables', snippet: 'wakichiy nombre = "Kusi";' },
  { title: 'Mostrar mensajes', snippet: 'rimay "Allillanchu";' },
  { title: 'Decidir', snippet: 'sichus (edad >= 7) { rimay "Listo"; }' },
  { title: 'Repetir', snippet: 'muyu 3 kuti { rimay "Tinkuy"; }' },
];

const initialState: RunState = {
  output: [],
  tokens: [],
  ast: null,
  environment: {},
};

export default function App() {
  const [selectedLessonId, setSelectedLessonId] = useState(lessons[0].id);
  const [source, setSource] = useState(defaultProgram);
  const [activeTab, setActiveTab] = useState<PanelTab>('output');
  const [runState, setRunState] = useState<RunState>(initialState);

  const selectedLesson = useMemo(
    () => lessons.find((lesson) => lesson.id === selectedLessonId) ?? lessons[0],
    [selectedLessonId],
  );

  useEffect(() => {
    setSource(selectedLesson.code);
    setRunState(initialState);
  }, [selectedLesson]);

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
    } catch (error) {
      setRunState({
        output: [],
        tokens: [],
        ast: null,
        environment: {},
        error: error instanceof Error ? error.message : 'Error desconocido.',
      });
      setActiveTab('output');
    }
  };

  const resetLesson = () => {
    setSource(selectedLesson.code);
    setRunState(initialState);
  };

  return (
    <div className="app-shell">
      <aside className="lesson-panel">
        <div className="brand-card">
          <p className="eyebrow">Rimay Yachay</p>
          <h1>Programación en quechua para niños</h1>
          <p>
            Un primer laboratorio para aprender lógica de programación con palabras cercanas,
            ejemplos visuales y un intérprete hecho en TypeScript.
          </p>
        </div>

        <section className="section-card">
          <h2>Lecciones</h2>
          <div className="lesson-list">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                className={`lesson-item ${lesson.id === selectedLesson.id ? 'selected' : ''}`}
                onClick={() => setSelectedLessonId(lesson.id)}
                type="button"
              >
                <strong>{lesson.title}</strong>
                <span>{lesson.objective}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section-card">
          <h2>Guía rápida</h2>
          <div className="guide-grid">
            {guideItems.map((item) => (
              <article key={item.title} className="guide-item">
                <h3>{item.title}</h3>
                <code>{item.snippet}</code>
              </article>
            ))}
          </div>
        </section>
      </aside>

      <main className="workspace">
        <section className="hero-card">
          <div>
            <p className="eyebrow">Lección activa</p>
            <h2>{selectedLesson.title}</h2>
            <p>{selectedLesson.objective}</p>
            <small>{selectedLesson.tip}</small>
          </div>
          <div className="hero-actions">
            <button className="primary-button" onClick={runCode} type="button">
              Ejecutar
            </button>
            <button className="secondary-button" onClick={resetLesson} type="button">
              Restaurar ejemplo
            </button>
          </div>
        </section>

        <section className="editor-card">
          <div className="card-header">
            <h2>Editor RimayScript</h2>
            <span>Lexer + parser con Ohm + intérprete propio</span>
          </div>
          <Editor
            height="420px"
            defaultLanguage={QUECHUA_LANGUAGE_ID}
            language={QUECHUA_LANGUAGE_ID}
            value={source}
            onChange={(value) => setSource(value ?? '')}
            beforeMount={configureMonaco}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              roundedSelection: true,
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              padding: { top: 18 },
            }}
            theme="vs-light"
          />
        </section>

        <section className="results-grid">
          <article className="section-card tall-card">
            <div className="card-header">
              <h2>Resultados</h2>
              <div className="tab-row">
                {(['output', 'tokens', 'ast', 'memory'] as PanelTab[]).map((tab) => (
                  <button
                    key={tab}
                    className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                    type="button"
                  >
                    {renderTabLabel(tab)}
                  </button>
                ))}
              </div>
            </div>
            {runState.error ? (
              <pre className="panel error-panel">{runState.error}</pre>
            ) : (
              <pre className="panel">
                {activeTab === 'output' && formatOutput(runState.output)}
                {activeTab === 'tokens' && JSON.stringify(runState.tokens, null, 2)}
                {activeTab === 'ast' && JSON.stringify(runState.ast, null, 2)}
                {activeTab === 'memory' && JSON.stringify(runState.environment, null, 2)}
              </pre>
            )}
          </article>

          <article className="section-card">
            <h2>Meta de la lección</h2>
            <p>Salida esperada:</p>
            <pre className="small-panel">{selectedLesson.expectedOutput.join('\n')}</pre>
            {selectedLesson.expectedEnvironment ? (
              <>
                <p>Variables esperadas:</p>
                <pre className="small-panel">
                  {JSON.stringify(selectedLesson.expectedEnvironment, null, 2)}
                </pre>
              </>
            ) : null}
          </article>
        </section>
      </main>
    </div>
  );
}

function configureMonaco(monaco: Monaco) {
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
      { token: 'keyword', foreground: '9d4edd', fontStyle: 'bold' },
      { token: 'number', foreground: 'f77f00' },
      { token: 'string', foreground: '2a9d8f' },
      { token: 'comment', foreground: '94a3b8' },
      { token: 'operator', foreground: 'd62828' },
    ],
    colors: {
      'editor.background': '#fffaf0',
    },
  });

  monaco.editor.setTheme('rimay-sunrise');
}

function renderTabLabel(tab: PanelTab) {
  switch (tab) {
    case 'output':
      return 'Salida';
    case 'tokens':
      return 'Tokens';
    case 'ast':
      return 'AST';
    case 'memory':
      return 'Memoria';
  }
}

function formatOutput(lines: string[]) {
  return lines.length > 0 ? lines.join('\n') : 'Ejecuta el programa para ver resultados.';
}
