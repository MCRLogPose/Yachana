import * as ohm from 'ohm-js';
import type {
  AssignmentNode,
  BinaryExpressionNode,
  BooleanLiteralNode,
  ExpressionNode,
  ExpressionStatementNode,
  IdentifierNode,
  IfStatementNode,
  NumericLiteralNode,
  PrintStatementNode,
  ProgramNode,
  RepeatStatementNode,
  StatementNode,
  StringLiteralNode,
  UnaryExpressionNode,
  VarDeclarationNode,
} from './ast';

const grammar = ohm.grammar(String.raw`
QuechuaLogica {
  Program        = spacing Statement*
  Statement      = VarDeclaration
                 | Assignment
                 | PrintStatement
                 | IfStatement
                 | RepeatStatement
                 | ExpressionStatement

  VarDeclaration = "wakichiy" __ identifier _ "=" _ Expression _ ";"
  Assignment     = identifier _ "=" _ Expression _ ";"
  PrintStatement = "rimay" __ Expression _ ";"
  IfStatement    = "sichus" _ "(" _ Expression _ ")" _ Block _ ElseClause?
  ElseClause     = "mana_chayqa" _ Block
  RepeatStatement = "muyu" __ Expression __ "kuti" _ Block
  ExpressionStatement = Expression _ ";"
  Block          = "{" spacing Statement* _ "}"

  Expression     = LogicOr
  LogicOr        = LogicOr _ "||" _ LogicAnd  -- binary
                 | LogicAnd
  LogicAnd       = LogicAnd _ "&&" _ Equality -- binary
                 | Equality
  Equality       = Equality _ EqualityOp _ Comparison -- binary
                 | Comparison
  Comparison     = Comparison _ ComparisonOp _ Addition -- binary
                 | Addition
  Addition       = Addition _ AddOp _ Multiplication -- binary
                 | Multiplication
  Multiplication = Multiplication _ MulOp _ Unary -- binary
                 | Unary
  Unary          = UnaryOp _ Unary -- unary
                 | Primary
  Primary        = number
                 | string
                 | boolean
                 | identifier
                 | Parenthesized
  Parenthesized  = "(" _ Expression _ ")"

  AddOp          = "+" | "-"
  MulOp          = "*" | "/"
  EqualityOp     = "==" | "!="
  ComparisonOp   = ">=" | "<=" | ">" | "<"
  UnaryOp        = "-" | "!"

  identifier     = identStart identPart*
  identStart     = letter | "_"
  identPart      = alnum | "_"

  number         = digit+ ("." digit+)?
  string         = "\"" stringChar* "\""
  stringChar     = escapedChar
                 | normalChar
  escapedChar    = "\\" any
  normalChar     = ~"\"" any
  boolean        = "chiqaq" | "llulla"

  spacing        = (space | comment)*
  comment        = "#" (~"\n" any)*
  _              = spacing
  __             = spacingNoNewline
  spacingNoNewline = (" " | "\t" | comment)*
}
`);

const semantics = grammar.createSemantics();

semantics.addOperation<unknown>('ast', {
  Program(_spacing, statements) {
    return {
      type: 'Program',
      body: statements.children.map((statement) => statement.ast() as StatementNode),
    } satisfies ProgramNode;
  },
  Statement(statement) {
    return statement.ast();
  },
  VarDeclaration(_kw, _gap, identifier, _s1, _eq, _s2, expression, _s3, _semi) {
    return {
      type: 'VarDeclaration',
      identifier: identifier.sourceString,
      value: expression.ast() as ExpressionNode,
    } satisfies VarDeclarationNode;
  },
  Assignment(identifier, _s1, _eq, _s2, expression, _s3, _semi) {
    return {
      type: 'Assignment',
      identifier: identifier.sourceString,
      value: expression.ast() as ExpressionNode,
    } satisfies AssignmentNode;
  },
  PrintStatement(_kw, _gap, expression, _s1, _semi) {
    return {
      type: 'PrintStatement',
      expression: expression.ast() as ExpressionNode,
    } satisfies PrintStatementNode;
  },
  IfStatement(_kw, _s1, _open, _s2, test, _s3, _close, _s4, block, _s5, alternate) {
    const elseNode = alternate.children[0];
    return {
      type: 'IfStatement',
      test: test.ast() as ExpressionNode,
      consequent: block.ast() as StatementNode[],
      alternate: elseNode ? (elseNode.ast() as StatementNode[]) : undefined,
    } satisfies IfStatementNode;
  },
  ElseClause(_kw, _space, block) {
    return block.ast();
  },
  RepeatStatement(_kw, _gap, count, _gap2, _times, _space, block) {
    return {
      type: 'RepeatStatement',
      count: count.ast() as ExpressionNode,
      body: block.ast() as StatementNode[],
    } satisfies RepeatStatementNode;
  },
  ExpressionStatement(expression, _s1, _semi) {
    return {
      type: 'ExpressionStatement',
      expression: expression.ast() as ExpressionNode,
    } satisfies ExpressionStatementNode;
  },
  Block(_open, _spacing, statements, _s1, _close) {
    return statements.children.map((statement) => statement.ast() as StatementNode);
  },
  LogicOr_binary(left, _s1, operator, _s2, right) {
    return createBinaryNode(operator.sourceString as BinaryExpressionNode['operator'], left.ast(), right.ast());
  },
  LogicAnd_binary(left, _s1, operator, _s2, right) {
    return createBinaryNode(operator.sourceString as BinaryExpressionNode['operator'], left.ast(), right.ast());
  },
  Equality_binary(left, _s1, operator, _s2, right) {
    return createBinaryNode(operator.sourceString as BinaryExpressionNode['operator'], left.ast(), right.ast());
  },
  Comparison_binary(left, _s1, operator, _s2, right) {
    return createBinaryNode(operator.sourceString as BinaryExpressionNode['operator'], left.ast(), right.ast());
  },
  Addition_binary(left, _s1, operator, _s2, right) {
    return createBinaryNode(operator.sourceString as BinaryExpressionNode['operator'], left.ast(), right.ast());
  },
  Multiplication_binary(left, _s1, operator, _s2, right) {
    return createBinaryNode(operator.sourceString as BinaryExpressionNode['operator'], left.ast(), right.ast());
  },
  Unary_unary(operator, _space, operand) {
    return {
      type: 'UnaryExpression',
      operator: operator.sourceString as UnaryExpressionNode['operator'],
      operand: operand.ast() as ExpressionNode,
    } satisfies UnaryExpressionNode;
  },
  Parenthesized(_open, _s1, expression, _s2, _close) {
    return expression.ast();
  },
  identifier(_first, _rest) {
    return {
      type: 'Identifier',
      name: this.sourceString,
    } satisfies IdentifierNode;
  },
  number(_whole, _dotAndFraction, _none) {
    return {
      type: 'NumericLiteral',
      value: Number(this.sourceString),
    } satisfies NumericLiteralNode;
  },
  string(_open, chars, _close) {
    const value = chars.children
      .map((char) => {
        const raw = char.sourceString;
        if (raw.startsWith('\\')) {
          return raw.slice(1);
        }
        return raw;
      })
      .join('');

    return {
      type: 'StringLiteral',
      value,
    } satisfies StringLiteralNode;
  },
  boolean(_value) {
    return {
      type: 'BooleanLiteral',
      value: this.sourceString === 'chiqaq',
    } satisfies BooleanLiteralNode;
  },
});

function createBinaryNode(
  operator: BinaryExpressionNode['operator'],
  left: unknown,
  right: unknown,
): BinaryExpressionNode {
  return {
    type: 'BinaryExpression',
    operator,
    left: left as ExpressionNode,
    right: right as ExpressionNode,
  };
}

export function parseProgram(source: string): ProgramNode {
  const match = grammar.match(source);
  if (match.failed()) {
    throw new Error(match.message);
  }

  return semantics(match).ast() as ProgramNode;
}
