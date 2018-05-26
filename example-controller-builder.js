module.exports = {
  generateExampleController: function (methods, filename) {
    var componentMethods = methods.map(i=>{
      var attributes = (i.attributes) ? i.attributes.map(i => getComponentAttribute(i.name, i.type)).join('') :''
      return getComponentMethod('_'+i.name, attributes)
    }).join('')
    var body = getComponentBody(filename, componentMethods)
    // console.log(body)
    return body
  }
}

module.exports = {
  generateExampleController: function (methods, filename) {
    var controllerMethods = methods.map(i=>{
      return getControllerMethod(i.name)
    }).join(',')
    var body = getControllerBody(controllerMethods)
    return body
  }
}
  function getControllerBody(body){
    return `({${body}  
    })
    `
  }
  function getControllerMethod(jsmethod){
      return `
      ${jsmethod} : function(component, event, helper) {
          helper.${jsmethod}(component, event, helper)
      }`
  }
