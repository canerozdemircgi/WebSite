"use strict";

class FieldsetElliptic extends HTMLFieldSetElement
{
	static FieldsetEllipticString(legend)
	{
return `\
<legend class='fieldset-elliptic-legend'>${legend}</legend>`;
	}

	get legend() { return this.getAttribute('legend'); }
	set legend(value) { this.setAttribute('legend', value); }

	constructor()
	{
		super();

		this.className = 'fieldset-elliptic';
	}

	static get observedAttributes() { return ['legend']; }
	attributeChangedCallback(attribute, value_old, value_new)
	{
		if (value_old === value_new)
			return;

		if ('legend' === attribute)
			this.insertAdjacentHTML('afterbegin', FieldsetElliptic.FieldsetEllipticString(value_new));
	}
}
window.customElements.define('fieldset-elliptic', FieldsetElliptic, {extends: 'fieldset'});