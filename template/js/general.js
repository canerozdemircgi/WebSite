"use strict";

const HrefParameterMode =
{
	stratch: 0,
	override: 1,
	append: 2
};
const GetHrefWithParameters = (href, parameters, href_parameter_mode) =>
{
	const url = new URL(href.replace(/\+/g, '%2B'));
	if (HrefParameterMode.stratch === href_parameter_mode)
		url.search = '';
	const url_search = new URLSearchParams(url.search);

	if (HrefParameterMode.stratch === href_parameter_mode || HrefParameterMode.override === href_parameter_mode)
	{
		const parameters_keys = Object.keys(parameters);
		for (let i = 0; i < parameters_keys.length; ++i)
			url_search.set(parameters_keys[i], parameters[parameters_keys[i]]);
	}
	else if (HrefParameterMode.append === href_parameter_mode)
	{
		const parameters_keys = Object.keys(parameters);
		for (let i = 0; i < parameters_keys.length; ++i)
		{
			if (null === url_search.get(parameters_keys[i]))
				url_search.set(parameters_keys[i], parameters[parameters_keys[i]]);
		}
	}

	url.search = url_search.toString();
	return decodeURIComponent(url.toString().replace(/\+/g, '%20'));
};

const GetHrefWithRedirect = href =>
{
	if (href.includes('path='))
		return href;
	else
		return `${window.location.origin}/redirect.html?address=${href}`;
};

const GetHrefWithJava = href => `${window.location.origin}/Java/${href}`;

const NavigatePage = (href, Refresh = RefreshPage) =>
{
	history.pushState(String(Refresh), '', href);
	Refresh();

	WriteJournal();
};
window.addEventListener('popstate', event =>
{
	if (null === event.state || '' === event.state)
		RefreshPage();
	else
	{
		const Refresh = eval(event.state);
		Refresh();
	}

	WriteJournal();
});
window.onpageshow = event =>
{
	if (event.persisted)
		WriteJournal();
};

const CreatePage = () =>
{
	const header_double_main = document.getElementById('header_double_main');

	header_double_main.CreateElement();
	document.getElementById('button_menu_main').CreateElement();

	window.menu_tree_indexes = ReturnMenuTreeIndexes();
	window.menu_last = ReturnMenuLast();

	window.button_path_main.CreateElement();
	window.title_top_main.CreateElement();
	window.button_branch_main.CreateElement();
	window.frame_main_main.CreateElement();

	document.getElementById('transition_main').remove();
	header_double_main.CreateAnimation();
	window.title_top_main.CreateAnimation();
	document.getElementById('footer_single_main').CreateAnimation();

	WriteJournal();
};

const RefreshPage = () =>
{
	window.menu_tree_indexes = ReturnMenuTreeIndexes();
	window.menu_last = ReturnMenuLast();

	window.button_path_main.RefreshElement();
	window.title_top_main.RefreshElement();
	window.button_branch_main.RefreshElement();
	window.frame_main_main.RefreshElement();
};

const ReturnMenuTreeIndexes = () =>
{
	let path = new URL(window.location.href.replace(/\+/g, '%2B')).searchParams.get('path');
	if (null === path || '' === path)
		return [0];
	else
	{
		if ('/' === path.charAt(0))
			path = path.substring(1);
		const path_length0 = path.length - 1;
		if ('/' === path.charAt(path_length0))
			path = path.substring(0, path_length0);

		return CheckMenuTreeIndexesRecursive(path, window.menu_tree.children) || [1, 0];
	}
};

const CheckMenuTreeIndexesRecursive = (path, menu_tree_children) =>
{
	for (let i = 0; i < menu_tree_children.length; ++i)
	{
		const result = CheckMenuTreeIndexesRecursive(path, menu_tree_children[i].children);
		if (null !== result)
			return [i].concat(result);
		else if (menu_tree_children[i].path === path)
			return [i];
	}
	return null;
};

const ReturnMenuLast = () =>
{
	let element = window.menu_tree;
	for (let i = 0; i < window.menu_tree_indexes.length; ++i)
		element = element.children[window.menu_tree_indexes[i]];
	return element;
};

const WriteJournal = (CallBack = null) =>
{
	const param_norec = new URL(window.location.href.replace(/\+/g, '%2B')).searchParams.get('norec');
	if (null !== param_norec)
		return;

	const href = window.location.href.replace(window.location.origin, '');
	/*
	fetch('https://api.ipify.org').then(response => response.text()).then(response =>
	{
		fetch(GetHrefWithJava('Journal'),
		{
			method: 'post',
			body: JSON.stringify(
			{
				href,
				ip: response
			})
		}).then(response =>
		{
			if (null !== CallBack)
				CallBack();
		}).catch(error =>
		{
			if (null !== CallBack)
				CallBack();
		});
	}).catch(error =>
	{
	*/
	fetch(GetHrefWithJava('Journal'),
	{
		method: 'post',
		body: JSON.stringify(
		{
			href,
			ip: null
		})
	}).then(_ =>
	{
		if (null !== CallBack)
			CallBack();
	}).catch(_ =>
	{
		if (null !== CallBack)
			CallBack();
	});
	// });
};