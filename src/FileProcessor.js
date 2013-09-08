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


var S = require('springboktools');
module.exports = S.newClass(function(){
	return {
		ctor: function(file){
			S.defineProperty(this,'file',file);
			this.isCanceled = false;
		},
		checkCanceled: function(callback){
			if(this.isCanceled){
				S.log('Compilation canceled for '+this.path);
				callback = this.cancelCallback;
			}
			callback.call(this);
		},
		
		// Reads file and compiles it with compiler. Data is cached
		process: function(callback){
			var file = this.file, fileProcessor = this;
			UArray.forEachSeries(['readers','linters','compilers','optimizers','minifiers'],function(action,onEnd){
				UArray.forEachSeries(['before','process','after'],function(action2,onEnd2){
					fileProcessor.checkCanceled(function(){
						file.fireTo(action,action2,onEnd2,fileProcessor);
					})
				},function(err){
					fileProcessor.checkCanceled(function(){
						if(err) callbackError(action,err,onEnd);
						else onEnd();
					});
				})
			},function(err){
				if(err) return callback(err);
				fileProcessor.checkCanceled(function(){
					this.write(callback);
				});
			});
		},
		
		write: function(callback){
			if(this.output)
				this.file.write(this.output,function(){
					this.checkCanceled(callback);
				}.bind(this))
			else
				callback();
		}
	};
});