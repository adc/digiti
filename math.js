
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
}



