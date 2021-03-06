import * as vscode from "vscode";
import { registerCommands } from "./commands";
import { registerCommentController } from "./comments";
import { registerFileSystemProvider } from "./fileSystem";
import { log } from "./logger";
import { initializeProtocolHander } from "./protocolHandler";
import { store } from "./store";
import { initializeAuth } from "./store/auth";
import { initializeStorage } from "./store/storage";
import { registerTreeProvider } from "./tree";

export async function activate(context: vscode.ExtensionContext) {
  log.setLoggingChannel(vscode.window.createOutputChannel("GistPad"));

  initializeProtocolHander();
  registerFileSystemProvider(store);
  registerCommands(context);
  registerTreeProvider(store, context.extensionPath);
  registerCommentController();

  initializeStorage(context);
  initializeAuth();
}
