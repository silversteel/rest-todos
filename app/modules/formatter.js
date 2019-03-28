module.exports = {
	listToHtml: function(list) {
		const prefix = '<ol>'
		const suffix = '</ol>'
		let content = ''

		for(let item of list){
			if (!item.is_completed) {
				content += `<li style="font-size:18px;"> ${item.title} </li>`
			} else {
				content += `<li style="font-size:18px;"> <del>${item.title}</del> </li>`
			}
		}

		return prefix + content + suffix
	}
}