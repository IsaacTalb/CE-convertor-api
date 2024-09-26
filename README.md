# CE-convertor-api

## Backend Handling on file conversion

-- We use the modern tools and libraries such as CloudConvert API 

###### Install Dependencies:

| npm init -y
| npm install express multer cloudconvert

###### Run the Backend?

|in your terminal run this ( node index.js )

###### Do Not Forget!!

Configure Your Extension to Use the Backend:

const response = await fetch('https://your-convertor-api.com/convert', {
        method: 'POST',
        body: formData
      });

// you can check this out in popup.js (https://github.com/IsaacTalb/convertor-extensions/blob/main/popup.js)
