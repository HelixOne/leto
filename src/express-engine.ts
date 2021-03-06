// Taken from https://github.com/robwormald/ng-universal-demo/

import { renderModuleFactory } from '@angular/platform-server';

import * as fs from 'fs';
import * as path from 'path';

const templateCache  = {};

export function ngExpressEngine(setupOptions){

	return function(filePath, options, callback){
		if(!templateCache[filePath]){
			let file = fs.readFileSync(filePath);
			templateCache[filePath] = file.toString();
		}
		renderModuleFactory(setupOptions.bootstrap, {
			document: templateCache[filePath],
			url: options.req.url
		})
		.then(string => {
			callback(null, string);
		});
	}
}