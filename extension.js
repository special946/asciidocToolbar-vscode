const vscode = require('vscode');
//var encoding = require('encoding');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "asciidocToolbar-vscode" is now active!');

	//var result = encoding.convert('ÕÄÖÜ', 'UTF-8', 'Latin_1', false);
	//console.log(result.toString());

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	//let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World!');
	//});
	//context.subscriptions.push(disposable);

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
