# Encryption Module
This encryption module is meant to encrypt & decrypt environment variables. The idea is you can push your encrypted.env to your repo & keep the password in a seperate place. When pulling the repo to a new machien, you only need the password to have access to all the environment variables.

## Commands
- ```npm run encrypt``` Encrypts the contents of .env into encrypted.env
- ```npm run decrypt``` Decrypts the contents of encrypted.env into .env

When running either of these commands, you will be prompted for a password in order to complete the encryption or decryption