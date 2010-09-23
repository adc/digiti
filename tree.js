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
	this.printTree = function() {print_infix(this.root)};
}

var infix = [];
function print_infix(root)
{
	if(root.left != "NULL")
		print(root.left);
	if(root.right != "NULL")
		print(root.right);
	infix.push(root.value);
}

//root -> node
//arr -> array of nodes
//curr -> idx
function add(root, arr, curr)
{
	root.value = arr[curr].value;

	root.right = new node();
	if(operators.indexOf(arr[curr-1].value) != -1)
		curr = add(root.right, curr-1);
	else
		root.right.value = arr[--curr].value;
	root.right.par = root;

	root.left = new node();
	if(operators.indexOf(arr[curr-1].value) != -1)
		curr = add(root.left, curr-1);
	else
		root.left.value = arr[--curr].value;
	root.left.par = root;

	return curr;
}


