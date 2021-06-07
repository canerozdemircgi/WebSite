"use strict";

class HeaderDouble extends HTMLElement
{
	static HeaderDoubleString(text1, text2)
	{
return `\
<a href='${GetHrefWithParameters(window.location.href, {path: window.menu_tree.children[0].path}, HrefParameterMode.stratch)}' onclick='NavigatePage(this.href); return false'>
	<div class='header-double-1'>${text1}</div>
	<div class='header-double-2'>${text2}</div>
</a>`;
	}

	get text1() { return this.getAttribute('text1'); }
	set text1(value) { this.setAttribute('text1', value); }

	get text2() { return this.getAttribute('text2'); }
	set text2(value) { this.setAttribute('text2', value); }

	constructor() { super(); }

	CreateElement()
	{
		this.insertAdjacentHTML('beforeend', HeaderDouble.HeaderDoubleString(this.text1, this.text2));
	}

	CreateAnimation()
	{
		this.classList.add('header-double-light');
		setInterval(this.RefreshAnimation.bind(this), 250);
	}

	RefreshAnimation()
	{
		if (0.25 < Math.random())
			this.classList.add('header-double-light');
		else
			this.classList.remove('header-double-light');
	}
}
window.customElements.define('header-double', HeaderDouble);