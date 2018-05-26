module.exports = {
  generateExampleHelper: function (methods, classname) {
    var helperMethods = methods.map(i=>{
      return getHelperMethod(i.name, classname)
    }).join(',')
    var body = getHelperBody(helperMethods)
    // console.log(body)
    return body
  }
}
  function getHelperBody(body){
    return `({${body}  
    })
    `
  }
  function getHelperMethod(jsmethod, className){
      return `
      ${jsmethod} : function(component, event, helper) {
        component
            .find('${className}')
            ._${jsmethod}()
            .then(helper.${jsmethod}Success.bind(null, component, helper))
            .catch(helper.${jsmethod}Fail.bind(null, component, helper))
      },
      ${jsmethod}Success: function (component, helper, result) {
          
      },
      ${jsmethod}Fail: function (component, helper, errors) {
          
      }`
  }