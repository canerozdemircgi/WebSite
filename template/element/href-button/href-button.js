"use strict";

class HrefButton extends HTMLAnchorElement
{
	constructor()
	{
		super();

		this.className = 'href-button';
	}
}
window.customElements.define('href-button', HrefButton, {extends: 'a'});