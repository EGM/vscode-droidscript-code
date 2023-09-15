const vscode = require('vscode');
const ext = require("./extension");

class TreeDataProvider {

    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    getTreeItem(element) {
      return element;
    }
  
    async getChildren(element) {
        if( !element ) {
            let data = await ext.listFolder(".edit/docs/plugins");
            if(data.status=="ok") {
                const plugins = data.list.map(m => {
                    return new TreeItem(m, vscode.TreeItemCollapsibleState.None, m);
                });
                return Promise.resolve(plugins);
            }
            else {
                return Promise.resolve([]);
            }
        }
        else {
            vscode.window.showInformationMessage(element.label);
        }
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }
}

class TreeItem extends vscode.TreeItem {
    constructor(label, collapsibleState, contextValue) {
        super(label, collapsibleState);
        this.contextValue = contextValue;
    }

    // Provide the command ID to execute when the tree item is selected
    get command() {
        return {
            command: 'droidscript-code.openDroidScriptPlugin',
            title: 'Open Plugin',
            arguments: [this],
        };
    }
}

module.exports = {
    TreeDataProvider
}