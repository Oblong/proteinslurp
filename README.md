# proteinslurp

Functions for reading protein files from disk and parsing their YAML schema



### process_protein(protein, callback)

Calls back with a JS object representing the protein. Returns a bool to indicate whether parsing was successful


### slurp(filename)

Returns a string containing the file's contents if the file exists AND has readable text content; otherwise, null


### slurp_and_yaml_parse(filename, callback)

Returns a JS object if the file exists, has content, and can be 
YAML-parsed; otherwise null


### slurp_and_protein_parse(filename, callback) 

Calls back with an object if the file exists, has content, and can be 
YAML-parsed; otherwise null



