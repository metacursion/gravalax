var fs = require('fs')
var bodybuilder = require('./body-builder')
var controllerbuilder = require('./controller-builder')
var auraparser = require('./aura-parser')
if(!process.argv[2]){
  console.error('No file provided. Run as "node index FooService.cls"')
} else {
  var filename = process.argv[2]
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      return console.log(err)
    }
    readData(data, filename.split('.')[0])
  })  
}
function readData(data, classname){
  var methods = auraparser.getMethods(data)
  if(!fs.existsSync(classname)){
    fs.mkdirSync(classname)
  }
  writeResults( classname +'/'+classname+'Controller.js', controllerbuilder.generateController(methods) )
  writeResults( classname +'/'+classname+'.cmp', bodybuilder.generateComponent(methods, classname) )
  writeResults( classname +'/'+classname+'.cmp-meta.xml', getMeta() )
}
function writeResults(filename, result){
  fs.writeFile(filename, result, 'utf8', function(err) {
    if (err) return console.log(err)
  })
}
function getMeta(){
  return `<?xml version="1.0" encoding="UTF-8"?>
<AuraDefinitionBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>42.0</apiVersion>
</AuraDefinitionBundle>
`
}