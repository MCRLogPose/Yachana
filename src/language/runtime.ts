import type { ProgramNode } from './ast';
import { runProgram } from './interpreter';
import { tokenize } from './lexer';
import { parseProgram } from './parser';

export type PlaygroundResult = {
  tokens: ReturnType<typeof tokenize>;
  ast: ProgramNode;
  output: string[];
  environment: Record<string, string | number | boolean>;
};

export function executeSource(source: string): PlaygroundResult {
  const tokens = tokenize(source);
  const ast = parseProgram(source);
  const result = runProgram(ast);

  return {
    tokens,
    ast,
    output: result.output,
    environment: result.environment,
  };
}
