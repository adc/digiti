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

function clean()
{
	var i = 0;
	var nodes = tree.printTree();
	while(i != nodes.length)
	{
		if(nodes[i].value == '0' && nodes[i].par.value != '=')
		{
			if(nodes[i].par.value == '+')
			{
				if(nodes[i].par.left == nodes[i])
				{
					nodes[i].par.right.par = nodes[i].par.par;
					if(nodes[i].par.par.left = nodes[i].par)
						nodes[i].par.par.left = nodes[i].par.right;
					else
						nodes[i].par.par.left = nodes[i].par.right;
				}
				else
				{
					nodes[i].par.left.par = nodes[i].par.par;
					if(nodes[i].par.par.left = nodes[i].par)
						nodes[i].par.par.left = nodes[i].par.left;
					else
						nodes[i].par.par.left = nodes[i].par.left;
				}
			}

			if(nodes[i].par.value == '-')
			{
				if(nodes[i].par.right == nodes[i])
				{
					nodes[i].par.left.par = nodes[i].par.par;
					if(nodes[i].par.par.left = nodes[i].par)
						nodes[i].par.par.left = nodes[i].par.left;
					else
						nodes[i].par.par.left = nodes[i].par.left;
				}
				else
				{
					i++;
					continue;
				}
			}

			if(nodes[i].par.value == '*')
			{
				var newn = nodes[i].par;
				newn.value = 0;
				delete_all(newn.left);
				delete_all(newn.right);

				newn.left = newn.right = null;
			}
				

			nodes = tree.printTree();
			i = 0;
			continue;
		}
		i++;
	}
}
						
		



