const express = require('express');
const multer = require('multer');
const CloudConvert = require('cloudconvert');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });
const cloudConvert = new CloudConvert('YOUR_CLOUDCONVERT_API_KEY');

app.post('/convert', upload.single('file'), async (req, res) => {
  const { conversionType } = req.body;
  const filePath = req.file.path;

  try {
    // Use CloudConvert for file conversion
    const job = await cloudConvert.jobs.create({
      tasks: {
        'import-my-file': {
          operation: 'import/upload',
        },
        'convert-my-file': {
          operation: 'convert',
          input: 'import-my-file',
          output_format: conversionType.split('to')[1],
          some_option: true
        },
        'export-my-file': {
          operation: 'export/url',
          input: 'convert-my-file'
        }
      }
    });

    const downloadUrl = job.tasks[2].result.files[0].url;
    res.redirect(downloadUrl);

    // Clean up file on server
    fs.unlink(filePath, () => {});
  } catch (error) {
    console.error(error);
    res.status(500).send('Conversion failed.');
  }
});

app.listen(3000, () => {
  console.log('Converter API running on port 3000');
});
