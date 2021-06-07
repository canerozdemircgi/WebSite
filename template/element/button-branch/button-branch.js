"use strict";

class ButtonBranch extends HTMLElement
{
	static ButtonBranchString(text, path)
	{
return `\
<a class='button-branch' href='${GetHrefWithParameters(window.location.href, {path}, HrefParameterMode.stratch)}' onclick='NavigatePage(this.href); return false'>
	${text}
	<div class='button-branch-image'>
		<svg class='button-branch-image-top' width='18' height='18'>
			<use href='template/resource/button/Caret.svg#Caret - Top'></use>
		</svg>
		<svg class='button-branch-image-bottom' width='18' height='18'>
			<use href='template/resource/button/Caret.svg#Caret - Bottom'></use>
		</svg>
		<svg class='button-branch-image-left' width='18' height='18'>
			<use href='template/resource/button/Caret.svg#Caret - Left'></use>
		</svg>
		<svg class='button-branch-image-right' width='18' height='18'>
			<use href='template/resource/button/Caret.svg#Caret - Right'></use>
		</svg>
	</div>
</a>`;
	}

	constructor() { super(); }

	CreateElement()
	{
		if (0 === window.menu_last.children.length)
			this.parentElement.style.display = 'none';
		else
		{
			this.parentElement.style.display = 'grid';

			const result = [];
			for (let i = 0; i < window.menu_last.children.length; ++i)
				result.push(ButtonBranch.ButtonBranchString(window.menu_last.children[i].text, window.menu_last.children[i].path));
			this.parentElement.insertAdjacentHTML('beforeend', result.join(''));
		}
	}

	RefreshElement()
	{
		while (1 < this.parentElement.childElementCount)
			this.parentElement.lastChild.remove();
		this.CreateElement();
	}
}
window.customElements.define('button-branch', ButtonBranch);