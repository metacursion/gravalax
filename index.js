var fs = require('fs')
var bodybuilder = require('./modules/service-body-builder')
var controllerbuilder = require('./modules/service-controller-builder')
var auraparser = require('./modules/aura-parser')
var examplebodybuilder = require('./modules/example-body-builder')
var examplecontrollerbuilder = require('./modules/example-controller-builder')
var examplehelperbuilder = require('./modules/example-helper-builder')

if(!process.argv[2]){
  console.error('No file provided. Run as "node index FooService.cls"')
} else {
  var filename = process.argv[2]
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      return console.error(err)
    }
    readData(data, filename.split('.')[0])
  })  
}

function readData(data, classname){
  var methods = auraparser.getMethods(data)
  var stamp = getTimestamp()
  writeComponent(classname, methods, stamp)
  writeExample(classname, methods, stamp)
  console.log('Success')
}
function writeComponent(classname, methods, stamp){
  if(!fs.existsSync(classname)){
    fs.mkdirSync(classname)
  }
  writeResults( classname +'/'+classname+'.cmp-meta.xml', getMeta() )
  writeResults( classname +'/'+classname+'.cmp', getTimestampXML(stamp) + bodybuilder.generateComponent(methods, classname) )
  writeResults( classname +'/'+classname+'Controller.js', getTimestampJS(stamp) + controllerbuilder.generateController(methods) )
}
function writeExample(classname, methods, stamp){
  classname += 'Example'
  if(!fs.existsSync(classname)){
    fs.mkdirSync(classname)
  }
  writeResults( classname +'/'+classname+'.cmp-meta.xml', getMeta() )
  writeResults( classname +'/'+classname+'.cmp', getTimestampXML(stamp) + examplebodybuilder.generateExampleComponent(classname) )
  writeResults( classname +'/'+classname+'Controller.js', getTimestampJS(stamp) + examplecontrollerbuilder.generateExampleController(methods) )
  writeResults( classname +'/'+classname+'Helper.js', getTimestampJS(stamp) + examplehelperbuilder.generateExampleHelper(methods, classname) )
}
function writeResults(filename, result){
  fs.writeFile(filename, result, 'utf8', function(err) {
    if (err) return console.error(err)
  })
}
function getTimestampJS(stamp){
  return `// ${stamp}
`
}
function getTimestampXML(stamp){
  return `<!-- ${stamp} -->
`
}
function getTimestamp(){
  return `Automatically generated by https://github.com/metacursion/gravalax/ @ ${new Date()}`
}
function getMeta(){
  return `<?xml version="1.0" encoding="UTF-8"?>
<AuraDefinitionBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>42.0</apiVersion>
</AuraDefinitionBundle>
`
}