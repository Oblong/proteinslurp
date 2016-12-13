# proteinslurp

Functions for reading protein files from disk and parsing their YAML schema

### slurp(filename)

Returns a string containing the file's contents, if the file exists AND has readable text content; otherwise null.


### slurp_yaml(filename)

Returns an object if the file exists, has content, and can be YAML-parsed; otherwise null.


### slurp_protein(filename)

Returns an object if the file exists, has content, and can be YAML-parsed as a valid plasma protein; otherwise null. If protein parses OK but lacks descrips or ingests, you get the object anyway and a complaint on stderr.


### process_protein(proteinstring)

Parses string as single YAML document.  Returns an object, otherwise null.



