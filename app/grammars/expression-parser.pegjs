// Grammar for Truthy expressions

expr
  = ws* expr:implication ws* {
    return expr;
  }

implication
  = left:xor ws+ '->' ws+ right:implication {
    return !left || right;
  }
  / xor

xor
  = left:xnor ws+ 'xor' ws+ right:xor {
    return (left || right) && (!left || !right);
  }
  / xnor

xnor
  = left:or ws+ 'xnor' ws+ right:xnor {
    return !(left || right) && (!left || !right);
  }
  / or

or
  = left:nor ws+ 'or' ws+ right:or {
    return left || right;
  }
  / nor

nor
  = left:and ws+ 'nor' ws+ right:nor {
    return !(left || right);
  }
  / and

and
  = left:nand ws+ 'and' ws+ right:and {
    return left && right;
  }
  / nand

nand
  = left:not ws+ 'nand' ws+ right:nand {
    return !(left && right);
  }
  / not

not
  = 'not' ws+ operand:not {
    return !operand;
  }
  / subexpr

subexpr =
  boolean / varname / '(' expr:expr ')' {
    return expr;
  }

varname
  = name:[A-Za-z] {
    if (name in options.varValues) {
      return options.varValues[name];
    } else {
      error('Variable "' + name + '" is not defined.');
    }
  }

boolean
  = value:('true' / 'false') {
    return (value === 'true');
  }

ws
  = ' '
