rules = [ 

[ ['a','=','b'], ['b', '=', 'a'] ],
[ ['-a','=','b'], ['a', '=', '-b'] ],

[ ['a','+','b'], ['b', '+', 'a'] ],
[ ['a','+','0'], [null, 'a', null] ],
[ ['a','-','a'], [null, 0, null] ],
[ ['a','-','b'], ['a', '+', '-b'] ],
[ ['a','=','b'], ['a','-','b','=',0] ],
[ ['a','=','-b'], ['a','+','b','=',0] ],

]

treerules = [];

function QPop()
{
 if(Q.length == 0)
   return null;
 n = Q[0];
 Q = Q.slice(1);
 return n;
}

function build_models()
{
  for(var i=0; i<rules.length; i++)
  {
	first = infix_to_postfix(rules[i][0]);
	second = infix_to_postfix(rules[i][1]);
	
	var tree = new mathTree();
	var temp = [];
	tree.buildTree(first, first.length-1);
	temp.push(tree);
	tree.buildTree(second, second.length-1);
	temp.push(tree);
	
	treerules.push(temp);
  }
}

function getroot(node)
{
  var n = null;
  n = node;
  while(n.par)
    n = n.par;
  return n;
}
/*
 N-> Target node
 G-> Abstract Goal
*/
function bfs(N, G)
{
 Q = [N]

 while(Expr = QPop(Q)) {
   /*if(satisfies(getroot(Expr), G)){
     alert("sat");
     return Expr;
   } else {
     alert("0");
   }*/
    
   for(i = 0; i < rules.length; i++) {
     ret = transform(Expr, rules[i]);
     if(ret) 
      Q.push(ret); 
   }
 }
 
 return null;
}


/*
Check if Goal is satisfied in Tree
*/
function satisfies(Expr, Goal)
{
  var wildcard = false;
  if(!Goal)
    return false;
  if(!Expr){
    if(Goal.value == '*any*')
      return true;
    else
      return true;
  }
  
  left = Expr.left;
  right = Expr.right;
  
  if(Goal.value == '*any*'){
    wildcard = true;
    //if there is a child, make sure child can be matched
    
  } else {
    if(Goal.value != Expr.value) //mismatch
      return false;
  } 
  
  leftgoal = Goal.left;
  rightgoal = Goal.right;

  if(wildcard){
    if(!leftgoal)
      leftgoal = Goal;
    if(!rightgoal)
      rightgoal = Goal;
  }

  if(!satisfies(left, leftgoal))
    return false;

  if(!satisfies(right, rightgoal))
    return false;
  
  return true;
}

/*
Check if Rule can be applied to an Expr
*/

function transform(Node, Rule)
{
  if(Rule[0][Math.floor((Rule[0].length)/2)] == Node.value)
  {
	var n = new node();
  }
  return null;
}
