module.exports = {
  generateExampleComponent: function (serviceComponentName) {
    var body = getComponentBody(serviceComponentName)
    // console.log(body)
    return body
  }
}
function getComponentBody(serviceComponentName){
  return `<aura:component>
  <c:${serviceComponentName} aura:id="${serviceComponentName}"/>
  </aura:component>
  `
}