// (c) oblong industries

var yaml = require('js-yaml'); // what plasma-js-bridge uses
var types = require('./slawtypes');

var SlawYamlType = new yaml.Type('tag:oblong.com,2009:slaw/protein', {
  kind: 'mapping'
});

var SlawF64Type = new yaml.Type('tag:oblong.com,2009:slaw/f64', {
  kind: 'scalar',
  resolve: function (data) {
    return true;
  },
  construct: function (data) {
    return Number(data);
  }
});

var SlawF32Type = new yaml.Type('tag:oblong.com,2009:slaw/f32', {
  kind: 'scalar',
  resolve: function (data) {
    return true;
  },
  construct: function (data) {
    return Number(data);
  }
});

var SlawI64Type = new yaml.Type('tag:oblong.com,2009:slaw/i64', {
  kind: 'scalar',
  resolve: function (data) {
    return true;
  },
  construct: function (data) {
    return Number(data);
  }
});

var SlawI32Type = new yaml.Type('tag:oblong.com,2009:slaw/i32', {
  kind: 'scalar',
  resolve: function (data) {
    return true;
  },
  construct: function (data) {
    return Number(data);
  }
});

var VectYamlType = new yaml.Type('tag:oblong.com,2009:slaw/vector', {
  kind: 'sequence',
  resolve: function (data) {
    return data !== null && data.length >= 2 && data.length <= 4;
  },
  construct: function (data) {
    return new types.Vect(data);
  },
  'instanceOf': types.Vect,
  represent: function (vect) {
    return vect.toArray();
  }
});

var ArrayYamlType = new yaml.Type('tag:oblong.com,2009:slaw/array', {
  kind: 'sequence',
  resolve: function (data) {
    return Array.isArray(data);
  },
  construct: function (data) {
    return new types.Array(data);
  },
  'instanceOf': types.Array,
  represent: function (array) {
    return array.toArray();
  }
});

var SLAW_SCHEMA = yaml.Schema.create([SlawYamlType, SlawF64Type, SlawF32Type, SlawI64Type, SlawI32Type, VectYamlType, ArrayYamlType]);

// Returns a bool to indicate whether parsing was successful
var process_protein = function process_protein(protein, callback) {
  var success = false;
  try {
    yaml.safeLoadAll(protein, function(protein) {
      if (protein.descrips && protein.ingests && protein.descrips.length > 0) {
        try {
          callback(protein);
        } catch (e) {
          console.log(e);
        }
        success = true;
      } else {
        console.log('ERROR: protein arrived without descrips or ingests: ');
        console.log(JSON.stringify(protein));
      }
    }, { schema: SLAW_SCHEMA });
  } catch (e) {
    console.log('Yaml error handling protein: ' + JSON.stringify(e));
  }

  if (!success) {
    callback(null);
  }

  return success;
}

exports.process_protein = process_protein;
