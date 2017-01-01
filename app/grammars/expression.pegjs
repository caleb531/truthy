// Grammar for Truthy boolean expressions

Expression 'Boolean Expression'
  = WS* expression:OperationImplication WS* {
    return expression;
  }

OperationImplication 'Implication Operation'
  = left:OperationOR OperatorImplication right:OperationImplication {
    return !left || right;
  }
  / OperationOR

OperatorImplication 'Implication Operator'
  = WS* '->' WS*

OperationOR 'OR Operation'
  = left:OperationAND OperatorOR right:OperationOR {
    return left || right;
  }
  / OperationNOR
  / OperationXOR
  / OperationXNOR
  / OperationAND

OperatorOR 'OR Operator'
  = WS+ 'or'i WS+
  / WS* '|' WS*

OperationNOR 'NOR Operation'
  = left:OperationAND OperatorNOR right:OperationOR {
    return !(left || right);
  }

OperatorNOR 'NOR Operator'
  = WS+ 'nor'i WS+
  / WS* '!|' WS*

OperationXOR 'XOR Operation'
  = left:OperationAND OperatorXOR right:OperationOR {
    return (left || right) && (!left || !right);
  }

OperatorXOR 'XOR Operator'
  = WS+ 'xor'i WS+
  / WS* '^' WS*

OperationXNOR 'XNOR Operation'
  = left:OperationAND OperatorXNOR right:OperationOR {
    return !((left || right) && (!left || !right));
  }

OperatorXNOR 'XNOR Operator'
  = WS+ 'xnor'i WS+
  / WS* '!^' WS*

OperationAND 'AND Operation'
  = left:OperationNOT OperatorAND right:OperationAND {
    return left && right;
  }
  / OperationNAND
  / OperationNOT

OperatorAND 'AND Operator'
  = WS+ 'and'i WS+
  / WS* '&' WS*

OperationNAND 'NAND Operation'
  = left:OperationNOT OperatorNAND right:OperationAND {
    return !(left && right);
  }
  / OperationNOT

OperatorNAND 'NAND Operator'
  = WS+ 'nand'i WS+
  / WS* '!&' WS*

OperationNOT 'NOT Operation'
  = OperatorNOT operand:OperationNOT {
    return !operand;
  }
  / SubExpression

OperatorNOT 'NOT Operator'
  = 'not'i WS+
  / '!' WS*

SubExpression 'Sub-Expression'
  = Boolean / VariableName / '(' expression:Expression ')' {
    return expression;
  }

VariableName 'Variable Name'
  = name:[A-Za-z] {
    if (name in options.varValues) {
      return options.varValues[name];
    } else {
      error('Variable "' + name + '" is not defined.');
    }
  }

Boolean 'Boolean Value'
  = value:('true'i / 'false'i) {
    return (value.toLowerCase() === 'true');
  }

WS 'Whitespace Character'
  = [ \t\n]
