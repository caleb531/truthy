// Grammar for Truthy boolean expressions

Expression
  = WS* expression:operationImplication WS* {
    return expression;
  }

operationImplication
  = left:operationOR operatorImplication right:operationImplication {
    return !left || right;
  }
  / operationOR

operatorImplication
  = WS* '->' WS*

operationOR
  = left:operationAND operatorOR right:operationOR {
    return left || right;
  }
  / operationNOR
  / operationXOR
  / operationXNOR
  / operationAND

operatorOR
  = WS+ 'or'i WS+
  / WS* '|' WS*

operationNOR
  = left:operationAND operatorNOR right:operationOR {
    return !(left || right);
  }

operatorNOR
  = WS+ 'nor'i WS+
  / WS* '!|' WS*

operationXOR
  = left:operationAND operatorXOR right:operationOR {
    return (left || right) && (!left || !right);
  }

operatorXOR
  = WS+ 'xor'i WS+
  / WS* '^' WS*

operationXNOR
  = left:operationAND operatorXNOR right:operationOR {
    return !((left || right) && (!left || !right));
  }

operatorXNOR
  = WS+ 'xnor'i WS+
  / WS* '!^' WS*

operationAND
  = left:operationNOT operatorAND right:operationAND {
    return left && right;
  }
  / operationNAND
  / operationNOT

operatorAND
  = WS+ 'and'i WS+
  / WS* '&' WS*

operationNAND
  = left:operationNOT operatorNAND right:operationAND {
    return !(left && right);
  }
  / operationNOT

operatorNAND
  = WS+ 'nand'i WS+
  / WS* '!&' WS*

operationNOT
  = operatorNOT operand:operationNOT {
    return !operand;
  }
  / SubExpression

operatorNOT
  = 'not'i WS+
  / '!' WS*

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
