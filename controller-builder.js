module.exports = {
  generateController: function (methods) {
    var controllerMethods = methods.map(i=>{
      return getControllerMethod('_'+i.name, i.name, i.attributes != undefined)
    }).join(',')
    var body = getControllerBody(controllerMethods)
    // console.log(body)
    return body
  }
}
function getControllerBody(body){
  return `({${body}  
  })
  `
}
function getControllerMethod(jsmethod, apexmethod, withParams){
    return `
    ${jsmethod} : function(component, event, helper) {
        return component.lax.enqueue('c.${apexmethod}'${getArguments(withParams)})
    }`
}
function getArguments(withParams){
  return withParams ? ", event.getParam('arguments')" :''
}