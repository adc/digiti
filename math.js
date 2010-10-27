function delete_all(node)
{
	if(node.left)
		delete_all(node.left);
	if(node.right)
		delete_all(node.right);
	delete node;
}

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
}

function grab_left_sign(value)
{
	if(value == '+')
		return '-';
	if(value == '-')
		return '-';
	if(value == '*')
		return '/';
	if(value == '/')
		return '/';
}

function moved(value)
{
	if(value == '+' || value == '-')
		return 0;
	if(value == '*' || value == '/')
		return 1;
}

//If a group is moved from the right to the left side
function swap_left(target, to_change)
{
	var equals = tree.root;
	
	var newnode = new node();
	
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
		newnode.value = '-'
		to_change.left = new node();
		to_change.left.par = to_change;
		to_change.left.value = '0';
	}
	else if(to_change.left == target) {
		newnode.value = grab_left_sign(to_change.value);
		to_change.left = new node();
		to_change.left.value = moved(to_change.value);
		to_change.left.par = to_change;
	}
	else {
	    newnode.value = grab_opp_sign(to_change.value);
		to_change.right = new node();
		to_change.right.value = moved(to_change.value);
		to_change.right.par = to_change;
	}

	clean();
	
}

function swap_right(target, to_change)
{
	var equals = tree.root;
	
	var newnode = new node();
	
	newnode.left = equals.left;
	newnode.left.par = newnode;
	equals.left = newnode;
	newnode.par = equals;
		
	newnode.right = target;
	newnode.right.par = newnode;
	
	if(to_change.value == '=')	//If the parent node is the equals sign, then just make the left side 0
	{
		newnode.value = '-'
		to_change.right = new node();
		to_change.right.par = to_change;
		to_change.right.value = '0';
	}
	else if(to_change.left == target) {
		newnode.value = grab_left_sign(to_change.value);
		to_change.left = new node();
		to_change.left.value = moved(to_change.value);
		to_change.left.par = to_change;
	}
	else {
	    newnode.value = grab_opp_sign(to_change.value);
		to_change.right = new node();
		to_change.right.value = moved(to_change.value);
		to_change.right.par = to_change;
	}

	clean();
}

function linkupsibling(n)
{
  //link n's sibling to n's grandparent
  //thereby removing n and n's parent
  //link up node n's sibling to n's parent
  if(n.par.left == n)
    sibling = n.par.right;
  else
    sibling = n.par.left;
  
  parent = n.par;
  grandparent = parent.par;
  
  //link sibling with grandparent
  sibling.par = grandparent;
  if(grandparent.right == parent)
    grandparent.right = sibling;
  else
    grandparent.left = sibling;
}

function clean()
{
	var i = 0;
	var nodes = tree.printTree();
//var hack = 0;

	while(i != nodes.length)
	{
	  //alert(i);
		if(nodes[i].value == '0')
		{
		  parval = nodes[i].par.value;
		  
			if(parval == '+')
			{
  			linkupsibling(nodes[i]);
			} else if(parval == '-')
			{
				if(nodes[i].par.right == nodes[i])
    			linkupsibling(nodes[i]);
				else
				{
					i++;
					continue;
				}
			} else if(parval == '*')
			{
				var newn = nodes[i].par;
				newn.value = 0;
				delete_all(newn.left);
				delete_all(newn.right);

				newn.left = newn.right = null;
			} else {
			  i++;
			  continue;
			}
      //made a change, restart			
			nodes = tree.printTree();
			i = 0;
			continue;
		} else if(nodes[i].value == '1'){
		  parval = nodes[i].par.value;
		  //multiplicative identities involving 1
      if(parval == '*')
			{
		    linkupsibling(nodes[i]);
			} else if(parval == '/')
			{
		    linkupsibling(nodes[i]);			  
			} else {
			  i++;
			  continue;
			}

			nodes = tree.printTree();
			i = 0;
			continue;
			
		}
		i++;
	}
}
						
		


