"use strict";

class ButtonMenu extends HTMLElement
{
	static GetButtonMenuContextById(id)
	{
		return document.getElementById(`${id}_ButtonMenuContext`);
	}

	static ButtonMenu0String(id, text, width, height)
	{
return `\
<div class='button-menu' style='width: ${width}; height: ${height};'>
	<button class='button-menu-0'>
		${text}
		<svg class='button-menu-image' width='12' height='12'>
			<use href='template/resource/button/Caret.svg#Caret - Bottom'></use>
		</svg>
	</button>
	<div id='${id}_ButtonMenuContext' class='button-menu-0-context'>
	</div>
</div>`;
	}

	static ButtonMenu1String(id, text, width, height)
	{
return `\
<div class='button-menu' style='width: ${width}; height: ${height};'>
	<button class='button-menu-1'>
		${text}
		<svg class='button-menu-image' width='12' height='12'>
			<use href='template/resource/button/Caret.svg#Caret - Right'></use>
		</svg>
	</button>
	<div id='${id}_ButtonMenuContext' class='button-menu-1-context'>
	</div>
</div>`;
	}

	static ButtonMenu1AString(text, path, width, height)
	{
return `\
<div class='button-menu' style='width: ${width}; height: ${height};'>
	<a class='button-menu-1' href='${GetHrefWithParameters(window.location.href, {path}, HrefParameterMode.stratch)}' onclick='NavigatePage(this.href); document.activeElement.blur(); return false'>
		${text}
		<svg class='button-menu-image' width='16' height='16'>
			<use href='template/resource/button/Caret.svg#Caret - All'></use>
		</svg>
	</a>
</div>`;
	}

	static ButtonMenu1BString(text, path, width, height)
	{
return `\
<div class='button-menu' style='width: ${width}; height: ${height};'>
	<a class='button-menu-1' href='${GetHrefWithParameters(window.location.href, {path}, HrefParameterMode.stratch)}' onclick='NavigatePage(this.href); document.activeElement.blur(); return false'>
		${text}
	</a>
</div>`;
	}

	get element_width() { return this.getAttribute('element_width'); }
	set element_width(value) { this.setAttribute('element_width', value); }

	get element_height() { return this.getAttribute('element_height'); }
	set element_height(value) { this.setAttribute('element_height', value); }

	constructor() { super(); }

	CreateElement()
	{
		for (let i = 0; i < window.menu_tree.children[0].children.length; ++i)
		{
			this.parentElement.insertAdjacentHTML('beforeend', ButtonMenu.ButtonMenu0String(window.menu_tree.children[0].children[i].id, window.menu_tree.children[0].children[i].text, this.element_width, this.element_height));
			ButtonMenu.GetButtonMenuContextById(window.menu_tree.children[0].children[i].id).insertAdjacentHTML('beforeend', ButtonMenu.ButtonMenu1AString(window.menu_tree.children[0].children[i].text, window.menu_tree.children[0].children[i].path, this.element_width, this.element_height));
			this.ButtonMenu1Recursive(ButtonMenu.GetButtonMenuContextById(window.menu_tree.children[0].children[i].id), window.menu_tree.children[0].children[i].children);
		}
	}

	ButtonMenu1Recursive(parentElement, menu_tree_children)
	{
		for (let i = 0; i < menu_tree_children.length; ++i)
		{
			if (0 === menu_tree_children[i].children.length)
				parentElement.insertAdjacentHTML('beforeend', ButtonMenu.ButtonMenu1BString(menu_tree_children[i].text, menu_tree_children[i].path, this.element_width, this.element_height));
			else if (0 < menu_tree_children[i].children.length)
			{
				parentElement.insertAdjacentHTML('beforeend', ButtonMenu.ButtonMenu1String(menu_tree_children[i].id, menu_tree_children[i].text, this.element_width, this.element_height));
				ButtonMenu.GetButtonMenuContextById(menu_tree_children[i].id).insertAdjacentHTML('beforeend', ButtonMenu.ButtonMenu1AString(menu_tree_children[i].text, menu_tree_children[i].path, this.element_width, this.element_height));
				this.ButtonMenu1Recursive(ButtonMenu.GetButtonMenuContextById(menu_tree_children[i].id), menu_tree_children[i].children);
			}
		}
	}
}
window.customElements.define('button-menu', ButtonMenu);