var chai = require('chai');
var chaiImmutable = require('chai-immutable');
chai.use(chaiImmutable);
var expect    = chai.expect;
var assert    = chai.assert;
var ps = require('../proteinslurp.js');
var data = require('./testdata.js');

describe('protein parsing functions ================', 
  () => {

  it('plain JS result is OK', () => {
    let p = ps.process_protein(data.screenprotein);
    assert(p.ingests.screens.feld1.cent.length == 3);
    assert(p.ingests.screens.feld1['px-origin'].length == 2);
    assert(p.ingests.screens.feld1.type == 'basic');
  });

});
