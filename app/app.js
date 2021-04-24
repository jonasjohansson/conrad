var data = {
	rows: 10,
	cols: 10,
	orientation: 'vertical',
	tabpage: [
		{
			controls: [
				{
					x: 1,
					y: 1,
					width: 2,
					height: 1,
					type: 'button',
					data: {},
				},
				{
					x: 2,
					y: 1,
					width: 1,
					height: 2,
					type: 'range',
				},
				{
					x: 3,
					y: 1,
					width: 1,
					height: 3,
					type: 'range',
					data: {
						orientation: 'vertical',
					},
				},
				{
					x: 5,
					y: 1,
					width: 1,
					height: 1,
					type: 'label',
				},
				{
					x: 6,
					y: 1,
					width: 1,
					height: 1,
					type: 'label',
					data: {
						value: 'label',
					},
				},
			],
		},
	],
};

const body = document.body;

window.onload = setSize();
window.onresize = setSize();

function setSize() {
	let size = `${100 / data.rows}vw`;
	let rowData = '';
	for (let i = 0; i < data.rows; i++) {
		rowData += ` ${size}`;
	}

	let colData = '';
	for (let i = 0; i < data.cols; i++) {
		colData += ` ${size}`;
	}

	document.documentElement.style.setProperty('--grid-rows', rowData);
	document.documentElement.style.setProperty('--grid-columns', colData);
}

for (let page of data.tabpage) {
	console.log(page);
	let section = document.createElement('section');
	body.appendChild(section);
	for (let control of page.controls) {
		let div = document.createElement('div');
		div.style.setProperty('--x', control.x || 1);
		div.style.setProperty('--y', control.y || 1);
		div.style.setProperty('--w', control.width || 1);
		div.style.setProperty('--h', control.height || 1);
		div.classList.add(control.type);
		let el = null;
		switch (control.type) {
			case 'button':
				el = document.createElement('button');
				break;
			case 'range':
				el = document.createElement('input');
				el.type = control.type;
				el.min = control?.data?.min || 0;
				el.max = control?.data?.max || 100;
				el.classList.add(control?.data?.orientation);
				break;
			case 'label':
				el = document.createElement('span');
				el.textContent = control?.data?.value || '';
				break;
		}
		if (el !== null) div.appendChild(el);
		section.appendChild(div);
	}
}
