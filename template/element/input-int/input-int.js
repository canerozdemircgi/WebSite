"use strict";

class InputInt extends HTMLElement
{
	static InputIntString(id, value, width_input, width_button)
	{
return `\
<button id='${id}_ButtonB' class='input-int-button-b' style='width: ${width_button};'>
	<svg class='input-int-img' width='12' height='12'>
		<use href='template/resource/button/Caret.svg#Caret - Left'></use>
	</svg>
</button>
<input id='${id}_Input' class='input-int-input' type='text' value='${value}' style='width: ${width_input};'>
<button id='${id}_ButtonN' class='input-int-button-n' style='width: ${width_button};'>
	<svg class='input-int-img' width='12' height='12'>
		<use href='template/resource/button/Caret.svg#Caret - Right'></use>
	</svg>
</button>`;
	}

	get id() { return this.getAttribute('id'); }
	set id(value) { this.setAttribute('id', value); }

	get value() { return parseInt(this.getAttribute('value')); }
	set value(value) { this.setAttribute('value', value); }

	get value_default() { return parseInt(this.getAttribute('value_default')); }
	set value_default(value) { this.setAttribute('value_default', value); }

	get value_min() { return parseInt(this.getAttribute('value_min')); }
	set value_min(value) { this.setAttribute('value_min', value); }

	get value_max() { return parseInt(this.getAttribute('value_max')); }
	set value_max(value) { this.setAttribute('value_max', value); }

	get width_input() { return this.getAttribute('width_input'); }
	set width_input(value) { this.setAttribute('width_input', value); }

	get width_button() { return this.getAttribute('width_button'); }
	set width_button(value) { this.setAttribute('width_button', value); }

	constructor()
	{
		super();

		this.SignalRefresh = () => {};
		this.insertAdjacentHTML('beforeend', InputInt.InputIntString(this.id, this.value, this.width_input, this.width_button));

		this.node_input = document.getElementById(`${this.id}_Input`);
		this.node_input.onchange = () => { this.value = this.node_input.value; };

		this.node_button_b = document.getElementById(`${this.id}_ButtonB`);
		this.node_button_b.onclick = () => { this.value -= 1; };

		this.node_button_n = document.getElementById(`${this.id}_ButtonN`);
		this.node_button_n.onclick = () => { this.value += 1; };

		this.observe = '1';
	}

	static get observedAttributes() { return ['value', 'value_min', 'value_max']; }
	attributeChangedCallback(attribute, value_old, value_new)
	{
		if ('1' !== this.observe)
			return;
		if (value_old === value_new)
			return;

		if ('value' === attribute)
		{
			if (isNaN(this.value))
			{
				this.value = this.value_default;
				return;
			}
			else if (this.value < this.value_min)
			{
				this.value = this.value_min;
				return;
			}
			else if (this.value > this.value_max)
			{
				this.value = this.value_max;
				return;
			}

			if (this.value === this.value_min)
			{
				this.node_button_b.disabled = true;
				this.node_button_n.disabled = false;
			}
			else if (this.value === this.value_max)
			{
				this.node_button_b.disabled = false;
				this.node_button_n.disabled = true;
			}
			else
			{
				this.node_button_b.disabled = false;
				this.node_button_n.disabled = false;
			}

			this.node_input.value = this.value;
			this.SignalRefresh();
		}
		else if ('value_min' === attribute)
		{
			if (this.value < this.value_min)
				this.value = this.value_min;
			else
				this.node_button_b.disabled = this.value === this.value_min;
		}
		else if ('value_max' === attribute)
		{
			if (this.value > this.value_max)
				this.value = this.value_max;
			else
				this.node_button_n.disabled = this.value === this.value_max;
		}
	}
}
window.customElements.define('input-int', InputInt);