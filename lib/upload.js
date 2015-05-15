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
var zip = require("bauer-zip"),
    fs = require("fs"),
    request = require("request");

function upload() {
    "use strict";

    return {
        createFile: function () {

            fs.readFile("./mangowebsite.json", function (err, data) {

                var json, req, ff;
                
                if (err) {
                    throw err;
                }
                
                json = JSON.parse(data);
                
                zip.zip("./", "./" + json.projectname + ".zip");

                req = request.post("http://www.mangoictcloud.com/gwy/upl.php", function (err, resp, body) {
                    if (err) {
                        console.log(">> Error!");
                        console.log(err);
                    } else {
                        console.log(">> " + body);
                    }
                    fs.unlink("./" + json.projectname + ".zip");
                });
                
                ff = req.form();
                ff.append("file", fs.createReadStream("./" + json.projectname + ".zip"));
                                                                           
            });

        }
    };

}

module.exports = upload;