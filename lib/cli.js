/**
  Licensed to the Mango ICT software company under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership.  The ASF licenses this file
  to you under the Apache License, Version 2.0 (the 
  "License"); you may not use this file except in compliance
  with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0 

  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License.
*/
/*global module, require, console */
var prompt = require("prompt"),
    resources = require("./resources/lang"),
    fs = require('fs'),
    githubLib = require('./github'),
    uploadLib = require('./upload');

function cli() {
    "use strict";

    var resource = resources("en_EN"),
        github = githubLib(),
        upload = uploadLib();

    console.log(resource.CLI_INFO);
    console.log(resource.CLI_SLOGAN);
    console.log(resource.EMPTY);

    return {
        push: function () {
            upload.createFile();
        },
        init: function () {
            console.log(resource.CLI_PROJECT_SETTINGS);
            prompt.start();
            prompt.message = resource.EMPTY;
            prompt.delimiter = " >> ".green;
            prompt.get([{
                name: "projectname",
                required: true
            }, {
                name: "version",
                required: true
            }, {
                name: "website",
                required: true
            }, {
                name: "author",
                required: true
            }], function (err, result) {

                if (result) {

                    github.releases('mango-ict', 'mangoboilerplate', function (err, body) {

                        var repoUrl, repoName, tagName;
                        
                        if (err) {
                            console.log('>> We could not clone the mango boilerplate...');
                        } else {
                            if (typeof body[0].assets === 'object' && body[0].assets.length > 0 && typeof body[0].assets[0].url !== 'undefined') {

                                repoUrl = body[0].assets[0].url;
                                repoName = 'mangoboilerplate';
                                tagName = body[0].tag_name;

                                github.get((repoName + '-' + tagName).split('.').join('_') + '.zip', repoUrl, function () {
                                    
                                    console.log('>> We have cloned the mango boilerplate...');

                                    fs.writeFile('./mangowebsite.json', JSON.stringify(result), function (err) {
                                        if (err) {
                                            throw err;
                                        }
                                        console.log('>> We have added the project settings in mangowebsite.json.');
                                        console.log(resource.EMPTY);


                                    });
                                });
                            }
                        }
                    });

                } else {
                    console.log(resource.EMPTY);
                }

            });
        },
        addUser: function () {
            console.log(resource.CLI_LOGIN_CREDENTIALS);
            prompt.start();
            prompt.message = resource.EMPTY;
            prompt.delimiter = " >> ".green;
            prompt.get([{
                name: "username",
                required: true
            }, {
                name: "password",
                hidden: true,
                conform: function (value) {
                    return true;
                }
            }], function (err, result) {

                if (result) {
                    fs.exists('./.mgs', function (exists) {
                        if (exists) {
                            fs.writeFile('./.mgs/usr.json', JSON.stringify(result), function (err) {
                                if (err) {
                                    throw err;
                                }
                                console.log('>> We have added the user with name...');
                            });
                        } else {
                            fs.mkdir("./.mgs", function () {
                                fs.writeFile('./.mgs/usr.json', JSON.stringify(result), function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('>> We have added the user with name...');
                                });
                            });
                        }
                    });
                } else {
                    console.log(resource.EMPTY);
                }

            });
        }
    };

}

module.exports = cli;