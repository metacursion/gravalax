function getParams(match){
  return match.match(/\(([^)]+)\)/)
}
function parseParams(params){
  if(!params) return params
  return params[1].split(',').map( i => getParam(i) )
}
function getParam(param){
  var i = param.split(' ')
  return { name : i[1], type : normalizeType(i[0]) }
}
function normalizeType(type){
  if(type.toUpperCase().startsWith('LIST') && type.endsWith('>')){
    return type.match(/<([^>]+)*>/)[1]+'[]'
  } else {
    return type
  }
}
function getMethodName(match){
  return match.match(/\S+(?=\s*\()/)
}
module.exports = {
  getMethods: function (data) {
    var matches = data.match( new RegExp('\@auraenabled.*','ig') )
    return matches.map(i=>{
  	   return { name : getMethodName(i), attributes: parseParams(getParams(i)) }
    })
  }
}
