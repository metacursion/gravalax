module.exports = {
  generateComponent: function (methods, filename) {
    var componentMethods = methods.map(i=>{
      var attributes = (i.attributes) ? i.attributes.map(i => getComponentAttribute(i.name, i.type)).join('\n      ') :''
      return getComponentMethod('_'+i.name, attributes)
    }).join('')
    var body = getComponentBody(filename, componentMethods)
    // console.log(body)
    return body
  }
}
function getComponentAttribute(name, type){
  return `<aura:attribute name="${name}" type="${type}" />`
}
function getComponentMethod(name, attributes){
  return `    <aura:method name="${name}">
      ${attributes}
    </aura:method>
`
}
function getComponentBody(controller, methods){
  return `<aura:component controller="${controller}">
    <c:lax context="{!this}" />
${methods}</aura:component>
  `
}
