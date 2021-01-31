const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const prompt = inquirerer.createPromptModule();

prompt({
  message: 'Enter Password: ',
  type: 'password',
  name: 'password'
})
  .then(password => {
    fs.readFile(path.join(__dirname, '../.env'), 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('ssssssssssssssss'), iv);
      const encrypted = cipher.update(data);
      const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
      
      const encryptedHex = iv.toString('hex') + ':' + finalBuffer.toString('hex');
      
      console.log(encryptedHex);
      
      fs.writeFile(path.join(__dirname, '../encrypted.env'), encryptedHex, (err, data) => {
        if (err) {
          throw err;
        }
        console.log('Data successfully encrypted.');
      });
    });
  })
  .catch(err => {
    console.log(err);
  })



