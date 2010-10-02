function ishas_add_child(n,v){
  if(n == v) return true;
  if(n.left == v) return true;
  if(n.right == v) return true;
  if(n.left) {
    v = n.left.value;
    if(v == '+' || v == '-'){
      if(ishaschild(n.left, v)) return true;
    }
  }
  if(n.right) {
    v = n.right.value;
    if(v == '+' || v == '-'){
      if(ishaschild(n.right, v)) return true;
    } 
  }
  return false;
}

function get_add_sign(n,v){
  if(n.left) {  
    //left side always adds
    v = n.left.value;
    if(v == '+' || v == '-'){
      return get_add_sign(n.left, v);
    }      
  } else if(n.right){
    v = n.right.value;
    if(v == '+' || v == '-'){
      return get_add_sign(n.left, v);
    } else if(v == '-') {
      //right side of negative subtracts, flip sign
      return get_add_sign(n.right, v)*-1;
    }        
  }
  return 1;
}


///////////////////////////////////////////////
//move N to the right of the '=' sign E
// 
function right_to_left(E, N){

}

///////////////////////////////////////////////
//move N to the left of the '=' sign E
// 
function left_to_right(E, N){
  L = E.left;
  R = E.right;
  if(ishas_add_child(L, N)){  
    sign = get_add_sign(L,N)
    p = N.par;
    pp = p.par;
    //new parent
    R_new = new node();

    if(sign > 0){
      R_new.value = "-";
    } else {
      R_new.value = "+";
    }        
    R_new.right = N;
    R_new.right.par = R_new;
    R_new.left = R;
    R_new.left.par = R_new;
    
    E.right = R_new;
    E.right.par = E;
    
    //need to delete the old parent, merge in other child
    if(p.left == N){
      if(pp.right == p){
        pp.right = p.right;   
        pp.right.par = pp;
      } else {
        pp.left = p.right;
        pp.left.par = pp;
      }
    } else if(p.right == N){
      //todo double negatives etc
      if(p.value == "-"){
        p.left.value *= -1;
      }
      if(pp.right == p){
        pp.right = p.left;
        pp.right.par = pp;
      } else {
        pp.left = p.left;
        pp.left.par = pp;      
      }
    }
    
    delete p;
  }
  
}
///////////////////////////////////////////////
