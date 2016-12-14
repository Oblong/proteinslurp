// (c) oblong industries

const protein_yml = require('./protein-yaml');
const process_protein = require('./protein-yaml').process_protein;
const process_protein_strictly = require('./protein-yaml').process_protein_strictly;
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
function slurp_yaml(filename) {
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

// Returns an object if the file exists, has content, and can be 
// YAML-parsed; otherwise null.  In strict mode, protein may include
// specific types from slawtypes.js: Vect and SlawArray
function slurp_protein(filename, strict) {
    let protein_txt = slurp(filename);
    if (protein_txt) {
        if (_.isBoolean(strict) && strict) {
            return pp.process_protein_strictly(protein_txt);
        } else {
            return pp.process_protein(protein_txt);
        }
    }
    return null;
}


exports.slurp = slurp;
exports.slurp_yaml = slurp_yaml;
exports.slurp_protein = slurp_protein;
exports.process_protein = process_protein;
exports.process_protein_strictly = process_protein_strictly;