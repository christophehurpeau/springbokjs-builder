global.traceur = require('../../traceur-compiler/src/node/traceur.js');
// import FileList from './FileList'; // or var FileList = traceur.require('FileList');
import FileList from './FileList';

/*
import {foo, baz} from './bar';
is like
var barModule = require('./bar'), foo = barModule.foo, baz = barModule.baz;
*/
module.exports = FileList;

module.exports.hello();