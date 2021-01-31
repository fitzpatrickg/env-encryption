const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');

const prompt = inquirer.createPromptModule();

prompt({
  message: 'Enter Password: ',
  type: 'password',
  name: 'key'
})
  .then(answer => {
    fs.readFile(path.join(__dirname, '../encrypted.env'), 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const encryptedArray = data.split(':');
      const iv = new Buffer(encryptedArray[0], 'hex');
      const encrypted = new Buffer(encryptedArray[1], 'hex');
      const decipher = crypto.createDecipheriv('aes-128-cbc', new Buffer(answer.key), iv);
      const decrypted = decipher.update(encrypted);
      const decryptedText = Buffer.concat([decrypted, decipher.final()]).toString();

      fs.writeFile(path.join(__dirname, '../.env'), decryptedText, (err, data) => {
        if (err) {
          throw err;
        }
        console.log('Data successfully decrypted to .env file.');
      });
    });
  })
  .catch(err => {
    console.log(err);
  });

