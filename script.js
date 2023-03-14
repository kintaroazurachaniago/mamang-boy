const mine = {
	0 : { name : 'Molen mini', n : 0, f : 'original' },
	1 : { name : 'Tahu krispi', n : 0, f : 'original' },
	2 : { name : 'Tela-tela', n : 0, f : 'original' }
}

const container = document.querySelector('.container')

function start () {

	const items = [
		{ name : 'Molen mini', flavour : false, image : 'molen-mini.jpeg' },
		{ name : 'Tahu krispi', flavour : true, image : 'tahu-krispi.jpeg' },
		{ name : 'Tela-tela', flavour : true, image : 'tela-tela.jpeg' },
	]

	const cummonPackages = document.createElement('div')
	cummonPackages.setAttribute('class', 'cummon-packages')

	const package = `
	<button type="button" class="package-button hidden" id="package-button-{index}" onclick="action({index})">Molen</button>
	<div class="package-counter hidden" id="package-counter-{index}">
		<button class="package-counter-dot" value="0">0</button>
	</div>
	<div class="action hidden" id="action-{index}"></div>
	<div class="package-image" onmouseover="action({index})">
		<label for="package-button-{index}">
			<img src="{image}" alt="{name}" class="package-image-tag">
		</label>
	</div>
	<div class="package-name">
		<div class="left">{name}</div>
		<div class="right">Only 5k/porce</div>
	</div>
	<div class="package-flavour light">
		<div class="package-flavour-list light hidden" id="package-flavour-list-{index}">
			<button type="button" class="package-flavour-list-button light" onclick="changeFlavour(this, {index})" value="Original">Original</button>
			<button type="button" class="package-flavour-list-button light" onclick="changeFlavour(this, {index})" value="Balado">Balado</button>
			<button type="button" class="package-flavour-list-button light" onclick="changeFlavour(this, {index})" value="Barbeque">Barbeque</button>
			<button type="button" class="package-flavour-list-button light" onclick="changeFlavour(this, {index})" value="Jagung bakar">Jagung bakar</button>
		</div>
		<button class="package-flavour-button" id="package-flavour-button-{index}" onclick="showFlavours({index})">
			<label for="package-flavour-button-{index}" class="package-flavour-label light" id="package-flavour-label-{index}">Original</label>
			<label for="package-flavour-button-{index}" class="package-flavour-guide" id="flavour-guide-{index}">Click here</label>
		</button>
	</div>
	`

	items.forEach( (item, index) => {
		const packages = document.createElement('div')
		packages.setAttribute('class', 'packages light')
		packages.innerHTML = package
		.replace(/{index}/g, index)
		.replace(/{image}/g, item.image)
		.replace(/{name}/g, item.name)
		cummonPackages.appendChild(packages)
	})

	container.appendChild(cummonPackages)

	const next = document.createElement('div')
	next.setAttribute('class', 'next')
	next.innerHTML = `<button class="next-button" onclick="next()">Next</button>`

	container.appendChild(next)

	const customPackage = document.createElement('h1')
	customPackage.setAttribute('class', 'custom-package')
	customPackage.innerHTML = 'Custom Package'
	// container.appendChild(customPackage)
	
	// dark = 2d2d2d
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) theme('dark')

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
		theme(event.matches ? 'dark' : 'light')
	})
}

function theme (t) {
    const x = t != 'light' ? 'light' : 'dark'
	document.querySelectorAll('.'+x).forEach( e => {
		e.classList.remove(x)
		e.classList.add(t)
	})
}

function backgroundColor () {
	var r = { n : 255, s : 0 }
	setInterval(_ => {
		if ( r.n > 0 && r.s == 0 ) r.n--
		else if ( r.n == 0 && r.s == 0 ) r.s = 1
		else if ( r.n < 255 && r.s == 1 ) r.n++
		else if ( r.n == 255 && r.s == 1 ) r.s = 0
	}, 30)

	var g = { n : 255, s : 0 }
	setInterval(_ => {
		if ( g.n > 0 && g.s == 0 ) g.n--
		else if ( g.n == 0 && g.s == 0 ) g.s = 1
		else if ( g.n < 255 && g.s == 1 ) g.n++
		else if ( g.n == 255 && g.s == 1 ) g.s = 0
	}, 20)

	var b = { n : 255, s : 0 }
	setInterval(_ => {
		if ( b.n > 0 && b.s == 0 ) b.n--
		else if ( b.n == 0 && b.s == 0 ) b.s = 1
		else if ( b.n < 255 && b.s == 1 ) b.n++
		else if ( b.n == 255 && b.s == 1 ) b.s = 0
	}, 10)

	setInterval(_ => {
		document.body.setAttribute('style', `background-color: rgb(${r.n}, ${g.n}, ${b.n});`)
	}, 10)

}

function action (id) {
	console.log('Show action', id)
	const actionTag = document.querySelector('#action-'+id)
	actionTag.classList.remove('hidden')
	dimmer('show', 'dismisAction('+id+')')

	const	counter = document.querySelector('#package-counter-'+id)
	const counterValue = parseInt(counter.querySelector('button').value)
	if ( counterValue < 1 ) {
		actionTag.innerHTML = `
		<button class="action-button select" onclick="add(${id})">Select</button>
		`
	} else if ( counterValue == 1 ) {
		actionTag.innerHTML = `
		<button class="action-button add" onclick="add(${id})">Add</button>
		<button class="action-button cancel" onclick="cancel(${id})">Cancel</button>
		`
	} else {
		actionTag.innerHTML = `
		<button class="action-button add" onclick="add(${id})">Add</button>
		<button class="action-button less" onclick="less(${id})">Less</button>
		<button class="action-button cancel" onclick="cancel(${id})">Cancel</button>
		`
	}
}

function add (id) {
	const	counter = document.querySelector('#package-counter-'+id)
	const counterDot = counter.querySelector('button')
	const counterValue = parseInt(counterDot.value)

	console.log('Add', id)
	mine[id]['n'] = counterValue+1
	console.log('Add :', mine)

	counter.classList.remove('hidden')
	counterDot.setAttribute('value', counterValue+1)
	counterDot.innerHTML = counterValue+1
	dismisAction(id)
}

function less (id) {
	const	counter = document.querySelector('#package-counter-'+id)
	const counterDot = counter.querySelector('button')
	const counterValue = parseInt(counterDot.value)

	console.log('Less', id)
	mine[id]['n'] = counterValue-1
	console.log('Less :', mine)

	counter.classList.remove('hidden')
	counterDot.setAttribute('value', counterValue-1)
	counterDot.innerHTML = counterValue-1
	dismisAction(id)
}

function cancel (id) {
	const	counter = document.querySelector('#package-counter-'+id)
	const counterDot = counter.querySelector('button')
	const counterValue = parseInt(counterDot.value)
	const label = document.querySelector('#package-flavour-label-'+id)

	console.log('Cancel', id)
	mine[id]['n'] = 0
	mine[id]['f'] = 'original'
	console.log('Cancel :', mine)

	counter.classList.add('hidden')
	counterDot.setAttribute('value', 0)
	counterDot.innerHTML = 0

	label.innerHTML = 'original'

	dismisAction(id)
}

function dismisAction (id) {
	console.log('Dismis action', id)
	const actionTag = document.querySelector('#action-'+id)
	actionTag.classList.add('hidden')
	dimmer('hide')
}

function showFlavours (id) {
	console.log('Show flavour', id)
	const flavourList = document.querySelector('#package-flavour-list-'+id)
	flavourList.classList.remove('hidden')
	dimmer('show', 'dismisFlavour('+id+')')
}

function changeFlavour (e, id) {
	console.log('Change flavour', id)
	mine[id]['f'] = e.value
	console.log('Change flavour :', mine)

	const label = document.querySelector('#package-flavour-label-'+id)
	label.innerHTML = e.value
	dismisFlavour(id)
}

function dismisFlavour (id) {
	console.log('Dismis flavour', id)
	const flavourList = document.querySelector('#package-flavour-list-'+id)
	flavourList.classList.add('hidden')
	dimmer('hide')
}

function dimmer (state, ondismis) {
	const dimmerTag = document.createElement('div')
	dimmerTag.setAttribute('class', 'dimmer')
	if ( state == 'show' ) {
		console.log('Show dimmer', ondismis)
		dimmerTag.setAttribute('onclick', ondismis)
		dimmerTag.setAttribute('onmouseover', ondismis)
		container.appendChild(dimmerTag)
	} else {
		console.log('Dismis dimmer')
		document.body.querySelector('.dimmer').remove()
	}
}

function next () {
	const data = []
	for ( [key, value] of Object.entries(mine) ) if ( value.n > 0 ) data.push(value)
	if ( data.length == 0 ) return alert('Please select some cummon package')
	let text = ''
	data.forEach( d => text += d.name + ' (' + d.f + ') ' + d.n + ' Porsi%0A')
	const url = new URL('https://wa.me/6289633948126?text='+text)
	window.open(url, '_blank')
	window.location.reload()
}