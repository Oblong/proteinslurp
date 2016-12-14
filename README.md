# proteinslurp

Functions for reading protein files from disk and parsing their YAML schema

### slurp(filename)

Returns a string containing the file's contents, if the file exists AND has readable text content; otherwise null.


### slurp_yaml(filename)

Returns an object if the file exists, has content, and can be YAML-parsed; otherwise null.


### slurp_protein(filename)

Returns an object if the file exists, has content, and can be YAML-parsed as a valid plasma protein; otherwise null. If protein parses OK but lacks descrips or ingests, you get the object anyway and a complaint on stderr.

In strict mode, protein may include specific types from slawtypes.js: Vect and SlawArray


### process_protein(proteinstring)

Parses string as single YAML document.  Returns a (plain old Javascript) object, otherwise null. May lose type information that was present in the protein.


### process_protein_strictly(proteinstring)

Like process_protein(), but result may include specific types Vect and SlawArray (see slawtypes.js)




