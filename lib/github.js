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
/*global module, require, console, process */
function githubLib() {
    "use strict";

    var github = require("octonode");

    function getUserRepoReleases(userName, repository, callback) {

        var client = github.client();
        client.get("/repos/" + userName + "/" + repository + "/releases", {}, function (err, status, body, headers) {
            if (err !== null) {
                callback(err, status);
            } else {
                callback(null, body);
            }
        });

    }

    function getRepo(filename, url, callback) {
        var fs = require("fs"),
            zip = require("bauer-zip"),
            sysPath = process.cwd(),
            request = require("request"),

            headers = {
                "User-Agent":       "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
                "accept"    :       "application/octet-stream"
            },

            // Configure the request
            options = {
                uri: url,
                method: "GET",
                headers: headers,
                followRedirect: true,
                gzip: true
            },

            local = ".";

        console.log(">> started downloading - " + local + "/" + filename);

        fs.readdir(local, function (err, files) {
            request(options).pipe(fs.createWriteStream(local + "/" + filename)).on("finish", function () {
                console.log(">> file - " + local + "/" + filename + " - was downloaded!");
                zip.unzip(local + "/" + filename, local, function () {
                    console.log(">> unpacked file - " + local + "/" + filename);
                    fs.unlink(local + "/" + filename);
                    console.log(">> file unlinked - " + local + "/" + filename);
                    callback();
                });
            });

        });

    }

    return {
        releases: getUserRepoReleases,
        get: getRepo
    };

}
module.exports = githubLib;