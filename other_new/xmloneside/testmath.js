//point to nodes on the tree
var targetm = [];
var targeta = [];
var target = [];

var destination;
var destinationa;
var destinationm;

var moving_nodes = [];

var touchcount = 0;

function save_next(root)
{
	var n = new node();
	n.value = root.value;
	n.par = root.par;
	n.inverted = root.inverted;
	n.index = root.index;
	
	for(var i=0; i<root.children.length; i++)
		n.children.push(save_next(root.children[i]));
		
	return n;
}

function save_prev(root)
{
	var node = save_next(root);
	var oldTree = new mathTree();
	oldTree.buildTreeFromNode(node);
	prevtrees.push(oldTree);
}

function findb(root, index)
//dfs to find the node whose index matches the one clicked
{
	if(root.index == index)
		return root;
	for(var i=0; i<root.children.length; i++)
	{
		var child = findb(root.children[i], index);
		if(child != null)
			return child;
	}
}

function finda(b)
{
	var a = b;
	while(a.par.par)
		a = a.par;
		
	return a;
}

function findm(b,a)
{
	var m;
	if(b != a && inverse[a.value] != undefined && arity[a.value] != 1 && assoc[a.value] == 0)
	{
		m = b;
		while(m.par != a)
			m = m.par;
	}
	else
		m = a;

	return m;
}

function down(t)
//Assigns target, targetm, and targeta
//Clicked is the block that has been targeted
{
	target[t] = findb(tree.root, t);
	targeta[t] = finda(target[t]);
	targetm[t] = findm(target[t], targeta[t]);
	
	if(targetm[t]==targeta[t] && targetm[t].children.length>arity[targetm[t].value] && inverse[targetm[t].value]!=undefined && place[targetm[t].value]==1)
		pre_splinter(clicked);
		
	moving_nodes = tree.printSubtree(targetm[t]);
	
	document.getElementById("log").innerHTML += ("clicked " + t + "->" + targetm[t].value + "<br/>");
	touchcount++;
}

function pre_splinter(clicked)
{
	var index = blocks.indexOf(clicked);
	if(assoc[targeta.value] == 0)
	{
		var n = new node;
		n.value = targeta.value;
		
		n.children.unshift(blocks[index+1].node);
		n.children[0].par = n;
		n.children.unshift(blocks[index-1].node);
		n.children[0].par = n;
		
		targeta.children.splice(targeta.children.indexOf(blocks[index-1].node),2,n);
		n.par = targeta;
		
		targetm = n;
	}
	
	else if(assoc[targeta.value] == 1 && targeta.children.indexOf(blocks[index-1].node) != targeta.chilren.length-1)
	{
		var n = new node();
		n.value = targeta.value;
		n.par = targeta;
		
		n.children = targeta.children.splice(0,targeta.children.length-1,n);
		for(var i=0; i<n.children.length; i++)
			n.children[i].par = n;
			
		targetm = n;
	}
	
	else if(assoc[targeta.value] == 2 && targeta.children.indexOf(blocks[index-1].node) != 0)
	{
		var n = new node();
		n.value = targeta.value;
		n.par = targeta;
		
		n.children = targeta.children.splice(1,targeta.children.length-1,n);
		for(var i=0; i<n.children.length; i++)
			n.children[i].par = n;
			
		targetm = n;
	}
}

function up(t, d)
//When a block is released, this function will determine
//what tree manipulations need to happen
//Will update the blocks array as necessary
{
	if(touchcount == 0)
	{
		document.getElementById("log").innerHTML += "Invalid up<br/>";
		return;
	}
		
	destination = findb(tree.root, d);
	destinationa = finda(destination);
	destinationm = findm(destination, destinationa);
	document.getElementById("log").innerHTML += ("placed "+t+"->"+target[t].value+" on "+d+"->"+destination.value+"<br/>");
	
	if(targeta[t] != destinationa)
	{
		save_prev(tree.root);
		traverse(t);
	}
	
	//if(touchcount > 1)
	//	merge();
	combine(t);
	//commute(t);
	
	target = [];
	targeta = [];
	targetm = [];
	touchcount = 0;
		
	tree.reassignIndices();
	tree.printTree();
	printtodoc();
}

function post_splinter()
//When the target node is an targeta, a node must be created above it
{
	var n = new node();
	n.value = defop;
	
	var index = targeta.par.children.indexOf(targeta);
	
	targeta.par.children[index] = n;
	n.par = targetm.par;

	n.children.push(new node());
	n.children[0].value = identity[defop];
	n.children[0].par = n;
	
	n.children.push(targetm);
	n.children[1].par = n;
	
	targeta = targetm.par;
}

function traverse(t)
//When an object is moved to the other side of an equals sign, this function is called
//Only updates the tree, not blocks
{

	if(target[t] == targeta[t] && arity[targetm[t].value] == 1 && inverse[targetm[t].value] != undefined)
	{
		//ex: cos(x) = y -> x = arccos(y)
		var index = targeta[t].par.children.indexOf(targeta[t]);
		var inverted = targetm[t].children[0].inverted;
		targetm[t].par.children[index] = targetm[t].children[0];
		targetm[t].children[0].par = targetm[t].par;
		
		for(var i=0; i<targetm[t].par.children.length; i++)
		{
			if(i == index)
			{
				targetm[t].par.children[i].inverted = 0;
				continue;
			}
			
			var n = new node();
			n.value = targetm[t].value;
			n.children.push(targetm[t].par.children[i])
			n.children[n.children.length-1].par = n;
			n.children[n.children.length-1].inverted = 1 - inverted;
			
			targetm[t].par.children[i] = n;
			n.par = targetm[t].par;
		}

		return;
	}
	
	else if(targetm[t] == targeta[t])
		post_splinter();
		
	var index = targeta[t].par.children.indexOf(targeta[t]);
	for(var i=0; i<targeta[t].par.children.length; i++)
	{
		if(i == index)
			continue;
		var n = new node();
		n.value = targeta[t].value;
		
		n.children.push(targeta[t].par.children[i]);
		n.children[0].par = n;
		
		n.children.push(subtree(targetm[t]));
		n.children[1].par = n;
		n.children[1].inverted = 1 - n.children[1].inverted;
		
		targeta[t].par.children[i] = n;
		n.par = targeta[t].par;
	}
	
	targeta[t].children.splice(targetm[t].par.children.indexOf(targetm[t]), 1);
	if(targeta[t].children[0].inverted)
	{
		var n = new node();
		n.value = identity[targeta[t].value];
		targeta[t].children.unshift(n);
		n.par = targeta[t];
	}
	if(targeta[t].children.length == 1)
	{
		targeta[t].par.children[index] = targeta[t].children[0];
		targeta[t].children[0].par = targeta[t].par;
		targeta[t] = targeta[t].children[0];
	}
		
	return;
}

function printtodoc()
{
    xmlstring = tree.printTree();
	xmlstring = escapeHTML(xmlstring);
	xmlstring = nl2br_js(xmlstring);
	document.getElementById("final").innerHTML = "Final:<br/\>" + xmlstring;
}

function merge()
{
	return 0;
}

function combine(t)
{
	if( !same_term(target[t], destination) || !(isNaN(targetm[t])||isNaN(destinationm)) )
		return;
		
	var commona;	//lowest common ancestor
	var looked = [];
	while(commona != tree.root)
	{
		looked.push(commona);
		commona = commona.par;
	}
	commona = destination;
	while(looked.indexOf(commona) == -1)
		commona = commona.par;
		
	if(!(target[t].par == commona || target[t].par.par == commona))
		return; 
	if(!(destination.par == commona || destination.par.par == commona))
		return;

	if(!isNaN(tartget[t].value) && !isNaN(destination.value))
	{
		if(assoc[commona.value] == 2)
			return;
	}
}

function commute()
{
	return 0;
}

function same_term(nodea, nodeb)
{
	if(nodea != nodeb)
		return false;
	for(var i=0; i<max(nodea.children.length, nodeb.children.length); i++)
		if(!same_term(nodea.children[i], nodeb.children[i]))
			return false;
	return true;
}
