"use strict";

class GridFlexible extends HTMLElement
{
	get element_width() { return this.getAttribute('element_width'); }
	set element_width(value) { this.setAttribute('element_width', value); }

	get element_height() { return this.getAttribute('element_height'); }
	set element_height(value) { this.setAttribute('element_height', value); }

	get element_gap() { return this.getAttribute('element_gap'); }
	set element_gap(value) { this.setAttribute('element_gap', value); }

	constructor()
	{
		super();

		this.style.gridTemplateColumns = `repeat(auto-fit, ${this.element_width})`;
		this.style.gridAutoRows = this.element_height;
		this.style.gridGap = this.element_gap;
	}
}
window.customElements.define('grid-flexible', GridFlexible);