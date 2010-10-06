
///////////////////////////////////////////////
//move N to the right of the '=' sign E
// 
function right_to_left(E, N){

}

function get_parent_sign(E,N)
{ 
  var val;
  if(E == N) {
    return 1;
  }
  if(E.right){
    val = get_parent_sign(E.right, N);
    if(E.value == "-"){
      val *= -1;
    }
    if(val) return val;
  }
  if(E.left){
    val = get_parent_sign(E.left, N);
    if(val) return val;
  }
  
  return 0;
}

///////////////////////////////////////////////
//move N to the left of the '=' sign E
// 
function doswap(E, N, left_to_right){
  ps = get_parent_sign(E,N);
  grandparent = N.par.par;

  //merge N's sibling
  sibling = N.par.left;
  if(sibling == N)
    sibling = N.par.right;

  if(grandparent && grandparent.left == N.par){
    grandparent.left = sibling;
    grandparent.right.par = grandparent;
  } else if(grandparent && grandparent.right == N.par){
    grandparent.right = sibling;
    grandparent.right.par = grandparent;
  } else {
    //node hopping across is a child of the assignment operator
    x = new node();
    x.value = "0";
    x.right = N.right;
    if(x.right) x.right.par = x;
    x.left = N.left;
    if(x.left) x.right.par = x;
    N.left = null;
    N.right = null;
    
    if(E.right == N){
      E.right = x;
    } else if(E.left == N){
      E.left = x;
    }
  }

  //create and attach new branch
  newbranch = new node();
  newbranch.value = ps > 0 ? "-" : "+"; //flip sign
  if(left_to_right){
    R = E.right;    
  } else {
    R = E.left;
  }
  
  newbranch.left = R;
  newbranch.left.par = newbranch;
  newbranch.right = N;
  newbranch.right.par = newbranch;
  if(left_to_right) {
    E.right = newbranch;
    E.right.par = E;
  } else {
    E.left = newbranch;
    E.left.par = E;
  }  
}
///////////////////////////////////////////////



