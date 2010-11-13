rules = [ 

[ ['a','=','b'], ['b', '=', 'a'] ],
[ ['-a','=','b'], ['a', '=', '-b'] ],

[ ['a','+','b'], ['b', '+', 'a'] ],
[ ['a','+','0'], [null, 'a', null] ],
[ ['a','-','a'], [null, 0, null] ],
[ ['a','-','b'], ['a', '+', '-b'] ],
[ ['a','=','b'], ['a','-','b','=',0]],
[ ['a','=','-b'], ['a','+','b','=',0]],

]

function QPop()
{
 if(Q.length == 0)
   return null;
 n = Q[0];
 Q = Q.slice(1);
 return n;
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
   if(satisfies(getroot(Expr), G)){
     alert("sat");
     return Expr;
   }
    
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

  //if Goal is null, fail to match if Expr is not NULL
  if(!Goal){
    if(!Expr)
      return true;
    return false;
  }
      
  //if Expr is null, only match if goal is wildcard with 
  // no leaves
  if(!Expr){
    if(Goal.value == '*any*'){
      return (!Goal.left && !Goal.right);
    }
  }

  //if current goal is a wildcard
  if(Goal.value == '*any*')
  {
      if(Goal.left || Goal.right){
        /////errr not sure if the following is right
        
        //try to match children first
        if(Goal.left)
        {
          //advance goal left
          if(satisfies(Expr, Goal.left))
            return true;
        }

        if(Goal.right)
        {
          //advance goal right
          if(satisfies(Expr, Goal.right))
            return true;
        }        

        //if they didn't match, recurse and make sure left/right
        //can be matched by the wildcard
  
        //do not advance goal
        if(!satisfies(Expr.left, Goal))
          return false;
        if(!satisfies(Expr.right, Goal))
          return false;
        
        //left right were matched, success
        return true;
      } else {
        //goal has no children, wildcard versus expression
        if(!satisfies(Expr.left, Goal))
          return false;
        if(!satisfies(Expr.right, Goal))
          return false;
        //success. goal has no children, everything satisfied.
        return true;
      }
  } else {
    if(Goal.value == Expr.value){
      //they matched, ensure children match.
      //advance goal and expr left
      if(!satisfies(Expr.left, Goal.left))
        return false;
        
      //advance goal and expr right
      if(!satisfies(Expr.right, Goal.right))
        return false;
      return true;
    }
  }
}

/*
Check if Rule can be applied to an Expr
*/

function transform(Node, Rule)
{
  return null;
}
