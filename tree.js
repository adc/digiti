operators = ['=', '*', '/', '+', '-'];

function node()
{
	this.left = null;
	this.right = null;
	this.par = null;
	this.value = null;
}

function mathTree()
{
	this.root = new node();
	this.buildTree = function(arr, place) { add(this.root, arr, place)};
}

function add(root, arr, curr)
{
	root.value = arr[curr];

	root.right = new node();
	if(operators.indexOf(arr[curr-1]) != -1)
		curr = add(root.right, curr-1);
	else
		root.right.value = arr[--curr];
	root.right.par = root;

	root.left = new node();
	if(operators.indexOf(arr[curr-1]) != -1)
		curr = add(root.left, curr-1);
	else
		root.left.value = arr[--curr];
	root.left.par = root;

	return curr;
}


