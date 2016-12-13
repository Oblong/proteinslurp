// (c) oblong industries

const yaml = require('js-yaml'); // what plasma-js-bridge uses
const types = require('./slawtypes');
const _ = require('lodash');

var SlawYamlType = new yaml.Type('tag:oblong.com,2009:slaw/protein', {
    kind: 'mapping'
});

var SlawF64Type = new yaml.Type('tag:oblong.com,2009:slaw/f64', {
    kind: 'scalar',
    resolve: function(data) {
        return true;
    },
    construct: function(data) {
        return Number(data);
    }
});

var SlawF32Type = new yaml.Type('tag:oblong.com,2009:slaw/f32', {
    kind: 'scalar',
    resolve: function(data) {
        return true;
    },
    construct: function(data) {
        return Number(data);
    }
});

var SlawI64Type = new yaml.Type('tag:oblong.com,2009:slaw/i64', {
    kind: 'scalar',
    resolve: function(data) {
        return true;
    },
    construct: function(data) {
        return Number(data);
    }
});

var SlawI32Type = new yaml.Type('tag:oblong.com,2009:slaw/i32', {
    kind: 'scalar',
    resolve: function(data) {
        return true;
    },
    construct: function(data) {
        return Number(data);
    }
});

var VectYamlType = new yaml.Type('tag:oblong.com,2009:slaw/vector', {
    kind: 'sequence',
    resolve: function(data) {
        return data !== null && data.length >= 2 && data.length <= 4;
    },
    construct: function(data) {
        return new types.Vect(data);
    },
    'instanceOf': types.Vect,
    represent: function(vect) {
        return vect.toArray();
    }
});

var ArrayYamlType = new yaml.Type('tag:oblong.com,2009:slaw/array', {
    kind: 'sequence',
    resolve: function(data) {
        return Array.isArray(data);
    },
    construct: function(data) {
        return new types.Array(data);
    },
    'instanceOf': types.Array,
    represent: function(array) {
        return array.toArray();
    }
});

var SLAW_SCHEMA = yaml.Schema.create([SlawYamlType, SlawF64Type, SlawF32Type, SlawI64Type,
    SlawI32Type, VectYamlType, ArrayYamlType
]);

// Parses string as single YAML document. 
// Returns a JavaScript object or null on error
function process_protein(proteinstring) {
    if (!_.isString(proteinstring) || proteinstring.length == 0)
        return null;

    try {
        let o = yaml.safeLoad(proteinstring, {
            schema: SLAW_SCHEMA
        });
        if (!(_.isObject(o) &&
                _.has(o, ['descrips']) &&
                _.has(o, ['ingests']) &&
                _.isArray(o.descrips))) {
          console.error("Protein parsed from YAML but may be malformed.");
        }
        return o;
    } catch (e) {
        console.error(e);
    }
    return null;
}

exports.process_protein = process_protein;