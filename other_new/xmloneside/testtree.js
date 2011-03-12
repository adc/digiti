var tree;
var prevtrees = [];

function node()
{
	this.value = null;
	this.children = [];
	this.par = null;
	this.inverted = 0;
	this.index;
}

function mathTree()
{
	this.root = new node();
	this.buildTree = function(arr) {add(this.root, arr, arr.length-1, 0); assignIndices(this.root, 0) };
	this.buildTreeFromNode = function(node) {this.root = node};
	this.printTree = function() {return printtree(this.root, 0)};
	this.printSubtree = function(node) {return moving(node)};
	this.reassignIndices = function() {assignIndices(this.root, 0)};
}

function add(root, arr, curr, lev)
{
	if(curr < 0)
		return;
	var level = lev;	
	
	if(curr+1 < arr.length && isNaN(arr[curr+1]) && inverses[arr[curr+1]] != undefined)
		root.inverted = 1 - root.inverted;
	root.value = arr[curr--];
	if(inverses[root.value] != undefined)
		root.value = inverses[root.value];
	
	if(precedence[root.value] == undefined)
		return curr;
	
	var i=1;
	while(i<=arity[root.value])
	{
		if(arr[curr] == ")")
		{
			lev++;
			curr--;
		}
		else if(arr[curr] == "(")
		{
			lev--;
			curr--;
		}
		else if(arr[curr] == ',')
			curr--;
		else if(arr[curr]==root.value && assoc[root.value]==0 && lev==level)
		{
			i-=(arity[root.value]-1);
			curr--;
		}
			
		else
		{
			root.children.unshift(new node());
			curr=add(root.children[0], arr, curr, lev);
			root.children[0].par = root;
		
			i++;
		}
	}
	return curr;
}

function printtree(node, l)
//Returns an array of blocks with inverted operators
{
	var xmlfeed = "";
	
	if(node.par && precedence[node.value] <= precedence[node.par.value])
		xmlfeed = xmlfeed.concat("<parentheses value=\"(\" />\n");
		
	if(precedence[node.value] == undefined)
		return "<parameter type=\"" + node.value + "\" index=\"" + node.index + "\"/>\n";
	
	var opp = false;
	for(var i=l; i<l+arity[node.value]; i++)
		if(node.children[i].inverted)
			opp = true;
	
	if(!opp)
		xmlfeed = xmlfeed.concat("<operator type=\"" + node.value + "\" index=\"" + node.index + "\">\n");
	else
		xmlfeed = xmlfeed.concat("<operator type=\"" + inverse[node.value] + "\" index=\"" + node.index + "\">\n");
	
	for(var i=l; i<l+arity[node.value]-1; i++)	
		xmlfeed = xmlfeed.concat(printtree(node.children[i], 0));
	if(l + arity[node.value] == node.children.length)
		xmlfeed = xmlfeed.concat(printtree(node.children[node.children.length-1], 0));
	else
		xmlfeed = xmlfeed.concat(printtree(node, l+1));
	xmlfeed = xmlfeed.concat("</operator>\n");
	
	if(node.par && precedence[node.value] <= precedence[node.par.value])
		xmlfeed = xmlfeed.concat("<parentheses value=\")\" />\n");
	
	return xmlfeed;
}

function subtree(root)
{
	var n = new node();
	n.value = root.value;
	n.inverted = root.inverted;
	
	for(var i=0; i<root.children.length; i++)
	{
		n.children.push(subtree(root.children[i]));
		n.children[n.children.length-1].par = n;
	}
	
	return n;
}

function assignIndices(root, num)
{
	root.index = num++;
	for(var i=0; i<root.children.length; i++)
		num = assignIndices(root.children[i], num);
	return num;
}

function moving(root)
{
	var arr = [];
	arr.push(root.index);
	for(var i=0; i<root.children.length; i++)
		arr = arr.concat(moving(root.children[i]));
	return arr;
}
