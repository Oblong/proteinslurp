// (c) oblong industries

const protein_yml = require('./protein-yaml');
const process_protein = require('./protein-yaml').process_protein;
const yaml = require('js-yaml'); // what plasma-js-bridge uses
const fs = require('fs');

// returns a string if the file exists AND has content; otherwise, null
function slurp(filename) {
  let s = "";
  try {
    s = fs.readFileSync(filename, 'utf8');
  } catch (err) {}
  return (s.length > 0) ? s : null;
}

// Returns an object if the file exists, has content, and can be 
// YAML-parsed; otherwise null
function slurp_and_yaml_parse(filename, callback) {
  let txt = slurp(filename);
  let o = null;
  if (txt) {
    try {
      o = yaml.safeLoad(txt);
    } catch (e) {
      console.log(e);
    }
  }
  return o;
}

// Calls back with an object if the file exists, has content, and can be 
// YAML-parsed; otherwise null
function slurp_and_protein_parse(filename, callback) {
  let protein_txt = slurp(filename);
  if (protein_txt) {
    let result = process_protein(protein_txt, callback);
  } else {
    callback(null);
  }
}


exports.slurp = slurp;
exports.slurp_and_yaml_parse = slurp_and_yaml_parse;
exports.slurp_and_protein_parse = slurp_and_protein_parse;
exports.process_protein = process_protein;