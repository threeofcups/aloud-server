const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dahfjsacf', 
  api_key: '235725224111251', 
  api_secret: 'uRQkBgBWl5qSLzUIQHfOqzeZzak' 
});

/*cloudinary
.uploader.upload("my_image.jpg", function(error, result) {
  console.log(result, error)
});
*/