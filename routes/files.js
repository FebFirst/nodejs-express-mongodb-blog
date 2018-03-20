const fileService = require('../services/fileService');
const multer = require('multer');
const utils = require('../utils/util');


// const filePath = "./upload/";

// let storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, filePath);
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, Date.now());
// 	}
// });

let upload = multer({
	dest: 'upload/tmp'
});

module.exports = function(app){
	app.post("/image/upload", utils.authorization,upload.single('file'), function(req, res, next){
		
		let content = req.body.content;
		// console.log(req);
		// console.log(req.get('Content-Type'));
		let file = req.file;
		fileService.saveFile(file, content).then(function(result){
			console.log(result);
			res.send('OK');
		}).catch(function(err){
			console.log(err);
			next(err);
		});
	});


	app.get("/image/:name", function(req, res, next){
		fileService.getFile(req.params.name).then(function(result){
			// res.download(result.path, result.name);
			res.send(result);
		}).catch(function(err){
			next(err);
		});
	});

}