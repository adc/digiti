function isalnum(input){
  if(input.match(/^[a-zA-Z0-9]+$/)){
    return true;
  } else {
    return false;
  }
}
//TODO: parentheses, functions, exponents, unary operators
//dijkstra'Z shunting-yard,
// haad ik maar en tijdmachine
//infix to postfix converter
function infix_to_postfix(input)
{
  postfix = [];
  opstack = [];
  
  for(var idx = 0; idx < input.length; idx++){
    //reading a number
    var token = ""
    if(isalnum(input[idx]))
    {
      while(idx < input.length && isalnum(input[idx])){
        token += input[idx++];
      }      
      postfix.push(token);
    }

    op = operators.indexOf(input[idx]);
    if(op != -1) {
      while(1) {
        prev = opstack[opstack.length-1];
        if(!prev){
          opstack.push(operators[op]);
          break;
        } else {
          //note: < vs <= here makes a difference
          //for things like 3+3*4+2. 
          //the result will be technically equivalent
          //but not of the preferred form for tree transformations
          if (op < operators.indexOf(prev)) {
            opstack.push(operators[op]);
            break;
          } else {
            postfix.push(opstack.pop());
          }
        }
      }
    }
  }

  while(opstack.length > 0) {
    postfix.push(opstack.pop());
  }

  return postfix; 
}

var tree;
function postfix_to_tree(input)
{
  nodestack = [];
  tree = new mathTree();
  
  tree.buildTree(nodestack, nodestack.length-1);
}


function p_to_i(input, output)
{
  output.innerHTML = input;
}
