// Grammar for Truthy boolean expressions

Expression
  = WS* expression:OperationImplication WS* {
    return expression;
  }

OperationImplication
  = left:OperationOR OperatorImplication right:OperationImplication {
    return !left || right;
  }
  / OperationOR

OperatorImplication
  = WS* '->' WS*

OperationOR
  = left:OperationAND OperatorOR right:OperationOR {
    return left || right;
  }
  / OperationNOR
  / OperationXOR
  / OperationXNOR
  / OperationAND

OperatorOR
  = WS+ 'or'i WS+
  / WS* '|' WS*

OperationNOR
  = left:OperationAND OperatorNOR right:OperationOR {
    return !(left || right);
  }

OperatorNOR
  = WS+ 'nor'i WS+
  / WS* '!|' WS*

OperationXOR
  = left:OperationAND OperatorXOR right:OperationOR {
    return (left || right) && (!left || !right);
  }

OperatorXOR
  = WS+ 'xor'i WS+
  / WS* '^' WS*

OperationXNOR
  = left:OperationAND OperatorXNOR right:OperationOR {
    return !((left || right) && (!left || !right));
  }

OperatorXNOR
  = WS+ 'xnor'i WS+
  / WS* '!^' WS*

OperationAND
  = left:OperationNOT OperatorAND right:OperationAND {
    return left && right;
  }
  / OperationNAND
  / OperationNOT

OperatorAND
  = WS+ 'and'i WS+
  / WS* '&' WS*

OperationNAND
  = left:OperationNOT OperatorNAND right:OperationAND {
    return !(left && right);
  }
  / OperationNOT

OperatorNAND
  = WS+ 'nand'i WS+
  / WS* '!&' WS*

OperationNOT
  = OperatorNOT operand:OperationNOT {
    return !operand;
  }
  / SubExpression

OperatorNOT
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
