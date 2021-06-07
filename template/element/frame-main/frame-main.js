"use strict";

class FrameMain extends HTMLElement
{
	constructor() { super(); }

	CreateElement()
	{
		if (window.menu_last.loader === undefined)
		{
			this.parentElement.style.display = 'none';
			return;
		}
		this.parentElement.style.display = 'grid';

		const path_frame = 'generic' === window.menu_last.loader ? `htm/${window.menu_last.path}/${window.menu_last.text}` : `htm/${window.menu_last.loader}`;
		Promise.all
		([
			fetch(`${path_frame}.css`).then(response => response.ok ? response.text() : null),
			fetch(`${path_frame}.htm`).then(response => response.ok ? response.text() : null),
			fetch(`${path_frame}.js`).then(response => response.ok ? response.text() : null)
		]).then(([css_frame, htm_frame, js_frame]) =>
		{
			if (null !== css_frame)
				this.parentElement.insertAdjacentHTML('beforeend', `<style>${css_frame}</style>`);

			if (null !== htm_frame)
				this.parentElement.insertAdjacentHTML('beforeend', htm_frame);

			if (null !== js_frame)
			{
				const script = document.createElement('script');
				script.insertAdjacentHTML('beforeend', `{${js_frame}}`);
				this.parentElement.appendChild(script);
			}
		});
	}

	RefreshElement()
	{
		while (3 < this.parentElement.childNodes.length)
			this.parentElement.lastChild.remove();
		this.CreateElement();
	}
}
window.customElements.define('frame-main', FrameMain);