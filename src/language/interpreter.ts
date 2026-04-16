import type {
  BinaryExpressionNode,
  ExpressionNode,
  ProgramNode,
  StatementNode,
  UnaryExpressionNode,
} from './ast';

export type RuntimeValue = number | string | boolean;

export type ExecutionResult = {
  output: string[];
  environment: Record<string, RuntimeValue>;
};

class Environment {
  private values = new Map<string, RuntimeValue>();

  define(name: string, value: RuntimeValue) {
    this.values.set(name, value);
  }

  assign(name: string, value: RuntimeValue) {
    if (!this.values.has(name)) {
      throw new Error(`La variable "${name}" todavía no fue creada con "wakichiy".`);
    }
    this.values.set(name, value);
  }

  get(name: string): RuntimeValue {
    if (!this.values.has(name)) {
      throw new Error(`No conozco la variable "${name}".`);
    }
    return this.values.get(name)!;
  }

  snapshot() {
    return Object.fromEntries(this.values.entries());
  }
}

export function runProgram(program: ProgramNode): ExecutionResult {
  const environment = new Environment();
  const output: string[] = [];

  for (const statement of program.body) {
    executeStatement(statement, environment, output);
  }

  return {
    output,
    environment: environment.snapshot(),
  };
}

function executeStatement(statement: StatementNode, environment: Environment, output: string[]) {
  switch (statement.type) {
    case 'VarDeclaration':
      environment.define(statement.identifier, evaluateExpression(statement.value, environment));
      return;
    case 'Assignment':
      environment.assign(statement.identifier, evaluateExpression(statement.value, environment));
      return;
    case 'PrintStatement':
      output.push(String(evaluateExpression(statement.expression, environment)));
      return;
    case 'IfStatement':
      if (isTruthy(evaluateExpression(statement.test, environment))) {
        statement.consequent.forEach((child) => executeStatement(child, environment, output));
      } else if (statement.alternate) {
        statement.alternate.forEach((child) => executeStatement(child, environment, output));
      }
      return;
    case 'RepeatStatement': {
      const count = evaluateExpression(statement.count, environment);
      if (typeof count !== 'number' || !Number.isInteger(count) || count < 0) {
        throw new Error('El comando "muyu" necesita un número entero positivo.');
      }

      for (let index = 0; index < count; index += 1) {
        statement.body.forEach((child) => executeStatement(child, environment, output));
      }
      return;
    }
    case 'ExpressionStatement':
      evaluateExpression(statement.expression, environment);
      return;
  }
}

function evaluateExpression(expression: ExpressionNode, environment: Environment): RuntimeValue {
  switch (expression.type) {
    case 'NumericLiteral':
    case 'StringLiteral':
    case 'BooleanLiteral':
      return expression.value;
    case 'Identifier':
      return environment.get(expression.name);
    case 'UnaryExpression':
      return evaluateUnaryExpression(expression, environment);
    case 'BinaryExpression':
      return evaluateBinaryExpression(expression, environment);
  }
}

function evaluateUnaryExpression(expression: UnaryExpressionNode, environment: Environment): RuntimeValue {
  const operand = evaluateExpression(expression.operand, environment);

  switch (expression.operator) {
    case '-':
      if (typeof operand !== 'number') {
        throw new Error('Solo puedes usar "-" delante de números.');
      }
      return -operand;
    case '!':
      return !isTruthy(operand);
  }
}

function evaluateBinaryExpression(expression: BinaryExpressionNode, environment: Environment): RuntimeValue {
  const left = evaluateExpression(expression.left, environment);
  const right = evaluateExpression(expression.right, environment);

  switch (expression.operator) {
    case '+':
      if (typeof left === 'string' || typeof right === 'string') {
        return `${left}${right}`;
      }
      return expectNumber(left) + expectNumber(right);
    case '-':
      return expectNumber(left) - expectNumber(right);
    case '*':
      return expectNumber(left) * expectNumber(right);
    case '/':
      return expectNumber(left) / expectNumber(right);
    case '==':
      return left === right;
    case '!=':
      return left !== right;
    case '>':
      return expectNumber(left) > expectNumber(right);
    case '>=':
      return expectNumber(left) >= expectNumber(right);
    case '<':
      return expectNumber(left) < expectNumber(right);
    case '<=':
      return expectNumber(left) <= expectNumber(right);
    case '&&':
      return isTruthy(left) && isTruthy(right);
    case '||':
      return isTruthy(left) || isTruthy(right);
  }
}

function expectNumber(value: RuntimeValue): number {
  if (typeof value !== 'number') {
    throw new Error('Esta operación solo funciona con números.');
  }
  return value;
}

function isTruthy(value: RuntimeValue): boolean {
  return Boolean(value);
}
