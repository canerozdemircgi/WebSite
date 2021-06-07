"use strict";

window.button_path_main = document.getElementById('button_path_main');
window.title_top_main = document.getElementById('title_top_main');
window.button_branch_main = document.getElementById('button_branch_main');
window.frame_main_main = document.getElementById('frame_main_main');

fetch('htm/menu-tree.json').then(response => response.json()).then(response =>
{
	window.menu_tree = response;

	CreatePage();
});