CKEDITOR.plugins.add('datetime', {
	icons: "datetime",
	init: function(editor) {
		editor.ui.addButton('Datetime', {
			label: "Insert Datetime",
			command: "insertDateTime",
			toolbar: "insert"
		});

		editor.addCommand('insertDateTime', {
			exec: function(editor) {
				var now = new Date();
				editor.insertHtml("Current Datetime is " +now.toString());
			}
		});
	}
});