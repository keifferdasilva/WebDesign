/*global fetch*/
debugger
    fetch("https://xivapi.com/Action/127?private_key=b17f31fbadb84acdb13bfff084a62d747ba1f32c269b45b982ce98d3a8c33f38", { mode: 'cors' })
	.then(response => response.json())
	.then(data => console.log(data));