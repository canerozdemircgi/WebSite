"use strict";

fetch(`htm/${window.menu_last.path}/_file-tree.json`).then(response => response.json()).then(response =>
{
	(async () => {
		if (undefined !== response.generic)
		{
			await Promise.all
			([
				fetch(`htm/${window.menu_last.path}/${window.menu_last.text}.css`).then(response => response.ok ? response.text() : null),
				fetch(`htm/${window.menu_last.path}/${window.menu_last.text}.htm`).then(response => response.ok ? response.text() : null),
				fetch(`htm/${window.menu_last.path}/${window.menu_last.text}.js`).then(response => response.ok ? response.text() : null)
			]).then(([css_frame, htm_frame, js_frame]) =>
			{
				if (null !== css_frame)
					window.frame_main_main.parentElement.insertAdjacentHTML('beforeend', `<style>${css_frame}</style>`);

				if (null !== htm_frame)
					window.frame_main_main.parentElement.insertAdjacentHTML('beforeend', htm_frame);

				if (null !== js_frame)
				{
					const script = document.createElement('script');
					script.insertAdjacentHTML('beforeend', `{${js_frame}}`);
					window.frame_main_main.parentElement.appendChild(script);
				}
			});
		}

		if (undefined !== response.downloads)
		{
			await Promise.all(response.downloads.map(download => fetch(`htm/${window.menu_last.path}/Downloads/${download.description}`).then(response => response.ok ? response.text() : null))).then(download_descriptions =>
			{
				const result = [];
				if (undefined !== response.generic)
					result.push(`<br class='br00'>`);

				result.push(`<div class='selectable'>`);
				for (let i = 0;;)
				{
					result.push(`<a is='href-text' href='${response.downloads[i].url}' color_light='var(--link-color)'>${response.downloads[i].label}</a><br class='br05'>`);

					if (null !== download_descriptions[i])
						result.push(`${download_descriptions[i]}<br class='br05'>`);

					if (++i < response.downloads.length)
						result.push(`<br class='br05'>`);
					else
						break;
				}
				result.push('</div>');

				window.frame_main_main.parentElement.insertAdjacentHTML('beforeend', result.join(''));
			});
		}

		if (undefined !== response.videos)
		{
			await Promise.all
			([
				Promise.all(response.videos.map(video => fetch(`htm/${window.menu_last.path}/Videos/${video.title}-UP.htm`).then(response => response.ok ? response.text() : null))),
				Promise.all(response.videos.map(video => fetch(`htm/${window.menu_last.path}/Videos/${video.title}-DW.htm`).then(response => response.ok ? response.text() : null)))
			]).then(([video_descriptions_up, video_descriptions_dw]) =>
			{
				let video_pager, video_offset, video_limit;
				if (10 < response.videos.length)
				{
					window.frame_main_main.parentElement.insertAdjacentHTML('beforeend', `<br class='br00'><limiter-page_items id='video_pager' items_max='${response.videos.length}' element_height='40px' param='video'></limiter-page_items><br class='br00'><separator-natty horizontal circle></separator-natty><br class='br00'>`);

					video_pager = document.getElementById('video_pager');
					video_offset = video_pager.offset;
					video_limit = video_pager.limit;
				}
				else
				{
					video_offset = 0;
					video_limit = response.videos.length;
				}

				const result = [];
				if ((undefined !== response.generic || undefined !== response.downloads) && 10 >= response.videos.length)
					result.push(`<br class='br00'>`);

				result.push(`<div id='video_div' class='selectable'>`);
				for (let i = video_offset;;)
				{
					if (null !== video_descriptions_up[i])
						result.push(`<span class='description-up'>${video_descriptions_up[i]}</span>`);
					result.push(`<video-youtube id='${response.videos[i].id}'></video-youtube>`);
					if (null !== video_descriptions_dw[i])
						result.push(`<span class='description-dw'>${video_descriptions_dw[i]}</span>`);

					if (++i < video_limit)
						result.push(`<br class='br20'><separator-natty horizontal circle></separator-natty><br class='br20'>`);
					else
						break;
				}
				result.push('</div>');

				window.frame_main_main.parentElement.insertAdjacentHTML('beforeend', result.join(''));

				if (10 < response.videos.length)
				{
					const video_div = document.getElementById('video_div');
					video_pager.SignalRefresh = () =>
					{
						document.getElementById('video_pager').SignalRefresh_();
					};
					video_pager.SignalRefresh_ = () =>
					{
						while (0 < video_div.childNodes.length)
							video_div.lastChild.remove();

						video_pager.RefreshElement();
						video_offset = video_pager.offset;
						video_limit = video_pager.limit;

						const result = [];
						for (let i = video_offset;;)
						{
							if (null !== video_descriptions_up[i])
								result.push(`<span class='description-up'>${video_descriptions_up[i]}</span>`);
							result.push(`<video-youtube id='${response.videos[i].id}'></video-youtube>`);
							if (null !== video_descriptions_dw[i])
								result.push(`<span class='description-dw'>${video_descriptions_dw[i]}</span>`);

							if (++i < video_limit)
								result.push(`<br class='br20'><separator-natty horizontal circle></separator-natty><br class='br20'>`);
							else
								break;
						}
						video_div.insertAdjacentHTML('beforeend', result.join(''));
					};
				}
			});
		}

		if (undefined !== response.images)
		{
			await Promise.all
			([
				Promise.all(response.images.map(image => fetch(`htm/${window.menu_last.path}/Images/${image}-UP.htm`).then(response => response.ok ? response.text() : null))),
				Promise.all(response.images.map(image => fetch(`htm/${window.menu_last.path}/Images/${image}-DW.htm`).then(response => response.ok ? response.text() : null)))
			]).then(([image_descriptions_up, image_descriptions_dw]) =>
			{
				let image_pager, image_offset, image_limit;
				if (10 < response.images.length)
				{
					window.frame_main_main.parentElement.insertAdjacentHTML('beforeend', `<br class='br00'><limiter-page_items id='image_pager' items_max='${response.images.length}' element_height='40px' param='image'></limiter-page_items><br class='br00'><separator-natty horizontal circle></separator-natty><br class='br00'>`);

					image_pager = document.getElementById('image_pager');
					image_offset = image_pager.offset;
					image_limit = image_pager.limit;
				}
				else
				{
					image_offset = 0;
					image_limit = response.images.length;
				}

				const result = [];
				if ((undefined !== response.generic || undefined !== response.downloads || undefined !== response.videos) && 10 >= response.images.length)
					result.push(`<br class='br00'>`);

				result.push(`<div id='image_div' class='selectable'>`);
				for (let i = image_offset;;)
				{
					if (null !== image_descriptions_up[i])
						result.push(`<span class='description-up'>${image_descriptions_up[i]}</span>`);
					const href = `htm/${window.menu_last.path}/Images/${response.images[i]}`;
					const href_redirect = GetHrefWithRedirect(href);
					result.push(`<a href='${href_redirect}'><img alt='!!!!!!!!!!' src='${href}'></a>`);
					if (null !== image_descriptions_dw[i])
						result.push(`<span class='description-dw'>${image_descriptions_dw[i]}</span>`);

					if (++i < image_limit)
						result.push(`<br class='br20'><separator-natty horizontal circle></separator-natty><br class='br20'>`);
					else
						break;
				}
				result.push('</div>');

				window.frame_main_main.parentElement.insertAdjacentHTML('beforeend', result.join(''));

				if (10 < response.images.length)
				{
					const image_div = document.getElementById('image_div');
					image_pager.SignalRefresh = () =>
					{
						document.getElementById('image_pager').SignalRefresh_();
					};
					image_pager.SignalRefresh_ = () =>
					{
						while (0 < image_div.childNodes.length)
							image_div.lastChild.remove();

						image_pager.RefreshElement();
						image_offset = image_pager.offset;
						image_limit = image_pager.limit;

						const result = [];
						for (let i = image_offset;;)
						{
							if (null !== image_descriptions_up[i])
								result.push(`<span class='description-up'>${image_descriptions_up[i]}</span>`);
							const href = `htm/${window.menu_last.path}/Images/${response.images[i]}`;
							const href_redirect = GetHrefWithRedirect(href);
							result.push(`<a href='${href_redirect}'><img alt='!!!!!!!!!!' src='${href}'></a>`);
							if (null !== image_descriptions_dw[i])
								result.push(`<span class='description-dw'>${image_descriptions_dw[i]}</span>`);

							if (++i < image_limit)
								result.push(`<br class='br20'><separator-natty horizontal circle></separator-natty><br class='br20'>`);
							else
								break;
						}
						image_div.insertAdjacentHTML('beforeend', result.join(''));
					};
				}
			});
		}
	})();
});