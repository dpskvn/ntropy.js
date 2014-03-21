#ntropy.js

##Description
ntropy.js is a random string/number generator using entropy collected from mouse movement or device motion as the seed for random content.

It can be used as way for users to generate passwords for themselves, generate password salts during account registration, or even manual session ID creation. There are other possible uses, generating encryption keys, and so on.

##Usage
The usage is rather simple. Just point the plugin to the target input field. 

		ntropy({limit: 10, pool: "abcdefghijklmnopqrstuvwxyz"}, function (random) {
  		console.log(random);
		});
		
After the random string is generated, the callback is executed.

##Demo
A demo/new page will follow soon.

##Options
The `options` object has the following two properties:

`limit` - the length of the generated string 
`pool` - the characters used to generate the string (i.e. 'abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

##License
ntropy.js is released under the MIT license. For more info, check the LICENSE file.

##Author
Dino Paskvan (http://www.dinopaskvan.com)