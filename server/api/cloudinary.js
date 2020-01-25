const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dahfjsacf', 
  api_key: '235725224111251', 
  api_secret: 'uRQkBgBWl5qSLzUIQHfOqzeZzak' 
});

// cloudinary.uploader.upload("dog.mp4", 
//   { resource_type: "video", 
//     public_id: "my_folder/my_sub_folder/dog_closeup",
//     chunk_size: 6000000,
//   function(error, result) {console.log(result, error)});
