// Grammar for Truthy boolean expressions

Expression
  = WS* expression:Implication WS* {
    return expression;
  }

Implication
  = left:OR WS* '->' WS* right:Implication {
    return !left || right;
  }
  / OR

OR
  = left:AND WS+ 'or'i WS+ right:OR {
    return left || right;
  }
  / NOR
  / XOR
  / XNOR
  / AND

NOR
  = left:AND WS+ 'nor'i WS+ right:OR {
    return !(left || right);
  }

XOR
  = left:AND WS+ 'xor'i WS+ right:OR {
    return (left || right) && (!left || !right);
  }

XNOR
  = left:AND WS+ 'xnor'i WS+ right:OR {
    return !((left || right) && (!left || !right));
  }

AND
  = left:NOT WS+ 'and'i WS+ right:AND {
    return left && right;
  }
  / NAND
  / NOT

NAND
  = left:NOT WS+ 'nand'i WS+ right:AND {
    return !(left && right);
  }
  / NOT

NOT
  = 'not'i WS+ operand:NOT {
    return !operand;
  }
  / SubExpression

SubExpression =
  Boolean / VariableName / '(' expression:Expression ')' {
    return expression;
  }

VariableName
  = name:[A-Za-z] {
    if (name in options.varValues) {
      return options.varValues[name];
    } else {
      error('Variable "' + name + '" is not defined.');
    }
  }

Boolean
  = value:('true'i / 'false'i) {
    return (value.toLowerCase() === 'true');
  }

// Whitespace characters (i.e. space, tab, newline)
WS
  = [ \t\n]
