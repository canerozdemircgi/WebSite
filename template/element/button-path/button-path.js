"use strict";

class ButtonPath extends HTMLElement
{
	static ButtonPathString(text, path)
	{
return `\
<a class='button-path' href='${GetHrefWithParameters(window.location.href, {path}, HrefParameterMode.stratch)}' onclick='NavigatePage(this.href); return false'>
	${text}
	<div class='button-path-image'>
		<svg width='12' height='12'>
			<use href='template/resource/button/Caret.svg#Caret - Left'></use>
		</svg>
		<svg width='2' height='2'></svg>
		<svg width='12' height='12'>
			<use href='template/resource/button/Caret.svg#Caret - Right'></use>
		</svg>
	</div>
</a>`;
	}

	constructor()
	{
		super();

		this.parentElement.insertAdjacentHTML('beforeend', '<label-half>Current Page Path</label-half>');
	}

	CreateElement()
	{
		let element = window.menu_tree;
		for (let i = 0; i < window.menu_tree_indexes.length; ++i)
		{
			element = element.children[window.menu_tree_indexes[i]];
			this.parentElement.insertAdjacentHTML('beforeend', ButtonPath.ButtonPathString(element.text, element.path));
		}

		if (undefined !== element.parameters)
		{
			const href_with_parameters = GetHrefWithParameters(window.location.href, element.parameters, HrefParameterMode.append);
			if (window.location.href !== href_with_parameters)
				history.replaceState(String(RefreshPage), '', href_with_parameters);
		}
	}

	RefreshElement()
	{
		while (2 < this.parentElement.childElementCount)
			this.parentElement.lastChild.remove();
		this.CreateElement();
	}
}
window.customElements.define('button-path', ButtonPath);