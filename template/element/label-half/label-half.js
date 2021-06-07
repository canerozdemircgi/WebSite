"use strict";

class LabelHalf extends HTMLElement
{
	constructor()
	{
		super();

		this.className = 'selectable';
		this.insertAdjacentHTML('beforeend', `<div class='label-half-tail'>=</div>`);
	}
}
window.customElements.define('label-half', LabelHalf);