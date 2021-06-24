const form = document.getElementById('formFashion');
let isWholesale = false;
let wholesaleElem = document.getElementById('wholesale');
let params = [];

function parseUri () {}
function getUriParams () {
	let parts = window.location.href
	.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		params.push({[key]: value});
	});
}
function getFormParams () {

}
function setFormParam (param) {
	for(const key in param){
		switch (key) {
			case 'size':
			case 'color':
				form.querySelectorAll('input[name="'+key+'"]')
				.forEach((elem) => {
					if (elem.value === param[key]) {
						elem.checked = true
					}
				});
				break;
			case 'manufacturer':
				form.querySelectorAll('select[name="'+key+'"] option')
					.forEach((elem) =>{
						if (elem.value === decodeURIComponent(param[key])) {
							elem.selected = true;
						}
					});
				break
			case 'sale':
				param[key] === "1" ? isWholesale = true : isWholesale = false;
				if (isWholesale){
					form.querySelector('input[name="'+key+'"]').checked = true;
					form.addEventListener('change', function (e) {
						e.target.checked = true;
					}, false);
				}
				break;
		}
	}
}
function clearForm () {
	for(let field of form){
		switch (field.type) {
			case 'checkbox':
			case 'radio':
				field.checked = false;
			break;
			case 'select-multiple':
				field.querySelectorAll('option')
				.forEach((option) =>{
					option.selected = false;
				});
			break;
		}
	}
}
function setFormParams () {
	clearForm();
	getUriParams();

	params.every(function (param) {
		setFormParam(param);
		return true;
	});
}
function logFormParams () {
	const query = [];
	let url = window.location.origin + window.location.pathname + '/?filter?';

	for(let field of form){
		switch (field.type) {
			case 'checkbox':
			case 'radio':
				if (field.checked) {
					query.push({[field.name]: field.value});
				}
			break;
			case 'select-multiple':
				field.querySelectorAll('option')
				.forEach((option) =>{
					if(option.selected) {
						query.push({[field.name]: option.value});
					}
				});
			break;
		}
	}

	query.every(function(param){
		for(let key in param ) {
			url = url + '&' + key + '=' + encodeURIComponent(param[key]);
		}
		return true;
	});
	
	console.log(url);
}

setFormParams();
form.addEventListener('change', logFormParams, false);