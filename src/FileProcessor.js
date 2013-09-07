var callbackError=function(type,strOrErr,callback){
	/*if(strOrErr instanceof Array){
		var i,finalStr='Errors :';
		for(i in strOrErr){
			console.error(strOrErr[i].stack);
			finalStr+=+"\n"+strOrErr[i].toString().slice(7);
		}
		strOrErr=finalStr;
	}*/
	//var error=new Error(strOrErr instanceof Error ? strOrErr.toString().slice(7) : strOrErr);
	var error=strOrErr instanceof Error ? strOrErr : new Error(strOrErr);
	error._Type=type;
	callback(error);
};



module.exports = S.extClass(EventEmitter,function(_super_){
	this.ctor = function(file){
		S.defineProperty(this,'file',file);
		this.isCanceled = false;
	};
	
	this.prototype = {
		checkCanceled: function(callback){
			if(this.isCanceled){
				S.log('Compilation canceled for '+this.path);
				callback = this.cancelCallback;
			}
			callback.call(this);
		},
		
		// Reads file and compiles it with compiler. Data is cached
		process: function(callback){
			
		}
	};
});