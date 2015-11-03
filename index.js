'use strict';

var Promise       = require( 'bluebird' );
var jsondiffpatch = require('jsondiffpatch');
var handlebars    = require( 'handlebars' );
var fs            = require( 'fs-extra' );
var source        = fs.readFileSync( './templates/visual-diff.html', 'utf8' );


function validate ( json1, json2, output ) {

	var filename = json1.scenarioId + json1.scenario;

	var diff = jsondiffpatch.diff( json1.data, json2 );

	if ( !diff ) {
		json1 = JSON.stringify( json1.data );
		json2 = JSON.stringify( json2 );

		var context = {
					'json1' : json1,
					'json2' : json2
				};

		var template = handlebars.compile( source );

		var html = template( context );

		fs.outputFileSync(
			path.join(  output, filename + '.html' ), html
			);

		return( 'JSONs are not the same. See logs ' + path.join(  output, filename + '.html' ) + ' for details.' );
	} else {
		return( 'Both JSONs are the same.' );
	}

};

module.exports = validate();
