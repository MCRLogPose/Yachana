export type ProgramNode = {
  type: 'Program';
  body: StatementNode[];
};

export type StatementNode =
  | VarDeclarationNode
  | AssignmentNode
  | PrintStatementNode
  | IfStatementNode
  | RepeatStatementNode
  | ExpressionStatementNode;

export type VarDeclarationNode = {
  type: 'VarDeclaration';
  identifier: string;
  value: ExpressionNode;
};

export type AssignmentNode = {
  type: 'Assignment';
  identifier: string;
  value: ExpressionNode;
};

export type PrintStatementNode = {
  type: 'PrintStatement';
  expression: ExpressionNode;
};

export type IfStatementNode = {
  type: 'IfStatement';
  test: ExpressionNode;
  consequent: StatementNode[];
  alternate?: StatementNode[];
};

export type RepeatStatementNode = {
  type: 'RepeatStatement';
  count: ExpressionNode;
  body: StatementNode[];
};

export type ExpressionStatementNode = {
  type: 'ExpressionStatement';
  expression: ExpressionNode;
};

export type ExpressionNode =
  | NumericLiteralNode
  | StringLiteralNode
  | BooleanLiteralNode
  | IdentifierNode
  | UnaryExpressionNode
  | BinaryExpressionNode;

export type NumericLiteralNode = {
  type: 'NumericLiteral';
  value: number;
};

export type StringLiteralNode = {
  type: 'StringLiteral';
  value: string;
};

export type BooleanLiteralNode = {
  type: 'BooleanLiteral';
  value: boolean;
};

export type IdentifierNode = {
  type: 'Identifier';
  name: string;
};

export type UnaryExpressionNode = {
  type: 'UnaryExpression';
  operator: '-' | '!';
  operand: ExpressionNode;
};

export type BinaryExpressionNode = {
  type: 'BinaryExpression';
  operator:
    | '+'
    | '-'
    | '*'
    | '/'
    | '=='
    | '!='
    | '>'
    | '>='
    | '<'
    | '<='
    | '&&'
    | '||';
  left: ExpressionNode;
  right: ExpressionNode;
};
