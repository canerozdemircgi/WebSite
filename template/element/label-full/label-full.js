"use strict";

class LabelFull extends HTMLElement
{
	static LabelFullString(id, label, value)
	{
return `\
<div>${label}</div>
<div id='${id}_Value' class='label-full-right'>${value}</div>`;
	}

	get id() { return this.getAttribute('id'); }
	set id(value) { this.setAttribute('id', value); }

	get label() { return this.getAttribute('label'); }
	set label(value) { this.setAttribute('label', value); }

	get value() { return this.getAttribute('value'); }
	set value(value) { this.setAttribute('value', value); }

	constructor()
	{
		super();

		this.className = 'selectable';
		this.insertAdjacentHTML('beforeend', LabelFull.LabelFullString(this.id, this.label, this.value));

		this.node_value = document.getElementById(`${this.id}_Value`);

		this.observe = '1';
	}

	static get observedAttributes() { return ['value']; }
	attributeChangedCallback(attribute, value_old, value_new)
	{
		if ('1' !== this.observe)
			return;
		if (value_old === value_new)
			return;

		if ('value' === attribute)
			this.node_value.textContent = value_new;
	}
}
window.customElements.define('label-full', LabelFull);