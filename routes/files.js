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
		let file = req.file;
		fileService.saveFile(file, content).then(function(result){
			//console.log(result);
			res.send('OK');
		}).catch(function(err){
			//console.log(err);
			next(err);
		});
	});


	app.get("/image/:name", function(req, res, next){
		fileService.getImage(req.params.name).then(function(result){
			res.send(result);
		}).catch(function(err){
			next(err);
		});
	});


	app.get("/image/:date1/:date2", function(req, res, next){
		fileService.selectFileBydate('image', req.params.date1, req.params.date2).then(function(result){
			res.render('image', {images: result});
		}).catch(function(err){
			next(err);
		});
	});

}