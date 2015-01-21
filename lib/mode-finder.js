var esprima = require('esprima');
var ometajs = null;
var BEMHTMLParser = null;
var BEMHTMLToXJST = null;
var XJSTToJS = null;
// var    pp = require('zeHelpers').prettyPrint;

function lazyLoad() {
  ometajs = require('ometajs');
  BEMHTMLParser = require('./ometa/bemhtml').BEMHTMLParser;
  BEMHTMLToXJST = require('./ometa/bemhtml').BEMHTMLToXJST;
  XJSTToJS = require('./ometa/bemhtml').XJSTToJS;
}

// Parse old bemhtml source
function parse(source) {
  lazyLoad();
  return BEMHTMLParser.matchAll(source, 'topLevel');
};

// Translate old ast to new ast
function translate(ast) {
  lazyLoad();
  ast = BEMHTMLToXJST.match(ast, 'topLevel');
  var out = XJSTToJS.match(ast, 'topLevel');
  return esprima.parse(out);
};

// Transpile old source to new source
function transpile(source) {
  // If code is ECMAScript compatible - there is no need to use ometajs
  try {
    if (esprima.parse(source)) return source;
  } catch (e) {
  }

  lazyLoad();
  var ast = parse(source);
  ast = BEMHTMLToXJST.match(ast, 'topLevel');
  return XJSTToJS.match(ast, 'topLevel');
};


exports.run = function run(options) {
    var input = [],
        out = [],
        err = [],
        output = options.output,
        stream = options.input.stream,
        path = options.input.path;

  stream.on('data', function(chunk) { input.push(chunk); })
    .on('end', function() { finish(input.join('')); })
    .resume();

    function finish(source) {
        try {
          transpile(source);
          // pp(parse(source), {prompt: "tree"});
        } catch (e) {
          if(e === "mode!!!") {
            output.write(path)
            output.end('\n');
          }
        }
    }
}
