const vscode = require('vscode');
var fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "asciidocToolbar-vscode" is now active!');

	var disposable = vscode.commands.registerCommand('extension.encdetect', function () {
	});

	vscode.workspace.onDidOpenTextDocument(function(e){
		var fname = e.fileName.replace(/\\/g,'/');

		fs.readFile(fname, function (err, text) {
			if (text.length == 0){
				return;
			}
			console.log(text[0].toString(16));
			console.log(text[1].toString(16));
			console.log(text[2].toString(16));

			if(text[0].toString(16) == 'ef' && text[1].toString(16) == 'bb' && text[2].toString(16) == 'bf'){
				var mes = '';
				mes = "File encoding not UTF-8!!";
				vscode.window.showWarningMessage(mes);
				console.log(mes);
			}

		});

	});

	context.subscriptions.push(disposable);

	const bold = vscode.commands.registerTextEditorCommand('asciidocToolbar.bold', (textEditor) => {
		var start = textEditor.selection.start;
		var end = textEditor.selection.end;

		textEditor.edit((editBuilder) => {
			editBuilder.insert(textEditor.selection.start, "*");
			editBuilder.insert(textEditor.selection.end, "*");
			
		});
		textEditor.selection = new vscode.Selection(start.translate(0, 1), end.translate(0, 1));
	});
	context.subscriptions.push(bold);

	const italic = vscode.commands.registerTextEditorCommand('asciidocToolbar.italic', (textEditor) => {
		var start = textEditor.selection.start;
		var end = textEditor.selection.end;

		textEditor.edit((editBuilder) => {
			editBuilder.insert(textEditor.selection.start, "_");
			editBuilder.insert(textEditor.selection.end, "_");
			
		});
		textEditor.selection = new vscode.Selection(start.translate(0, 1), end.translate(0, 1));
	});
	context.subscriptions.push(italic);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
