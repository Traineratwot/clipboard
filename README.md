# clipboard
![npm](https://img.shields.io/npm/v/web-clipboard)
![GitHub issues](https://img.shields.io/github/issues/Traineratwot/clipboard)
![npm bundle size](https://img.shields.io/bundlephobia/min/web-clipboard)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/web-clipboard)

Simple use in browser
``` html
<script src="../dist/index.umd.js"></script>
<script>
	const clipboard = new WebClipboard.WebClipboard()
</script>


<button onclick="cl.write(textareaWrite.value)">wtite</button>
<button onclick="cl.read().then((val)=>{textareaRead.value = val})">read</button>
<input id="textareaWrite" placeholder="write" type="text"></input>
<input id="textareaRead" placeholder="read" type="text"></input>
```
Simple use in vue3
```js
import clipboard from "web-clipboard";
declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$clipboard:typeof clipboard
	}
}
createApp(App)
	.use(clipboard)

...
	var userClipboard = await this.$clipboard.read()
	this.$clipboard.write('You copy this text !!')
```

Simple use in other npm project
```js
import clipboard from "web-clipboard";
var userClipboard = await clipboard.read()
clipboard.write('You copy this text !!')
```