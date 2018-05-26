# gravalax
Simple utility to automatically generate Lightning service components using Lax library (https://github.com/ruslan-kurchenko/sfdc-lax)

## Motivation
When quickly prototyping something, saves you from writing same and same code again - just define the skeleton in Apex, and let service component follow it.

## Usage
`node index.js FooService.cls` will generate FooService/FooService.cmp and related JS controller.

Now, Include it in your component markup as

`<c:FooService aura:id="FooService"/>`

Then call Apex methods by
```
component
.find('FooService')
._getSampleString('baz')
.then(function(res) {console.log(res))
.catch(function(err) { })
```

### Sample FooService.cls
```
public with sharing class BCGMSPComponentsBackendSyncService {
	@AuraEnabled public static Void getSampleString(string fizz) {
    return fizz + 'buzz';
	}
}
```
NOTE: @AuraEnabled methods have to be in same line as method name

In future, will add generator that produces example files.
