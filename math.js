operators = ['^', '*', '/', '+', '-', '='];

//When a group moves across the equals, flip its sign
function grab_opp_sign(value)
{
	if(value == '+')
		return '-';
	if(value == '-')
		return '+';
	if(value == '*')
		return '/';
	if(value == '/')
		return '*';
	if(value == '=')
		return '-';
}

<<<<<<< HEAD
//If a group is moved from the right to the left side
function swap_left(target, to_change)
{
	var equals = tree.root;
	
	var newnode = new node();
	newnode.value = grab_opp_sign(to_change.value);
	
	//Makes a new node and attaches it to the right side
	newnode.left = equals.right;
	newnode.left.par = newnode;
	equals.right = newnode;
	newnode.par = equals;
	
	//Associates the term being moved with the new node
	newnode.right = target;
	newnode.right.par = newnode;
	
	//Finishes the left side
	if(to_change.value == '=')	//If the parent node is the equals sign, then just make the left side 0
	{
		//delete to_change.left;
		to_change.left = new node();
		to_change.left.par = to_change;
		to_change.left.value = '0';
	}
	else if(to_change.left == target) {
		to_change.right.par = to_change.par;
		if(to_change.par.left == to_change)
			to_change.par.left = to_change.right;
		else
			to_change.par.right = to_change.right;
		delete to_change;
	}
	else {
		to_change.left.par = to_change.par;
		if(to_change.par.left == to_change)
			to_change.par.left = to_change.left;
		else
			to_change.par.right = to_change.left;
		delete to_change;
	}
	
}

function swap_right(target, to_change)
{
	var equals = tree.root;
	
	var newnode = new node();
	newnode.value = grab_opp_sign(to_change.value);
	
	newnode.left = equals.left;
	newnode.left.par = newnode;
	equals.left = newnode;
	newnode.par = equals;
		
	newnode.right = target;
	newnode.right.par = newnode;
	
	if(to_change.value == '=')
	{
		delete to_change.right;
		to_change.right = new node();
		to_change.right.par = to_change;
		to_change.right.value = '0';
	}
	else if(to_change.left == target) {
		to_change.right.par = to_change.par;
		if(to_change.par.left == to_change)
			to_change.par.left = to_change.right;
		else
			to_change.par.right = to_change.right;
		delete to_change;
	}
	else {
		to_change.left.par = to_change.par;
		if(to_change.par.left == to_change)
			to_change.par.left = to_change.left;
		else
			to_change.par.right = to_change.left;
		delete to_change;
	}
=======
function get_parent_sign(E,N)
{ 
  var val;
  if(operators.indexOf(N.value) != -1) return 0;
  if(operators.indexOf(E.value) != -1 && (E.value != "+" && E.value != "-" && E.value != "=")) return 0;
  
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
  if(ps == 0) return;
  grandparent = N.par.par;

  //merge N's sibling
  sibling = N.par.left;
  if(sibling == N)
    sibling = N.par.right;

  if(N.par.value == "-" && N == N.par.left){
    //just replace with 0
    N.par.left = new node();
    N.par.left.value = "0";
    N.par.left.par = N.par;
  }
  else if(grandparent && grandparent.left == N.par){
    grandparent.left = sibling;
    grandparent.left.par = grandparent;
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
  
  //before attaching check if it is of the form 0+X or X+0
  //0+X identity
  if(newbranch.value=="+"){
    if(newbranch.right.value == "0"){
      newbranch = newbranch.left;
    } else if(newbranch.left.value == "0"){
      newbranch = newbranch.right;
    }
  }
  //and finally attach  
  if(left_to_right) {
    E.right = newbranch;
    E.right.par = E;
  } else {
    E.left = newbranch;
    E.left.par = E;
  }  
>>>>>>> c64c821ba0d7b83a2f7516af7120ce9221a0cd22
}



