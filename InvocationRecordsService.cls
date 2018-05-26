/**
 * Created by heyoo on 24/05/18.
 */

public with sharing class InvocationRecordsService {
    @AuraEnabled public static String GetAll(){
        return JSON.serialize( InvocationRecordsSelector.selectAll() );
    }
    @AuraEnabled public static String GetByConfigurationIds(List<Id> configurationIds){
        return JSON.serialize( InvocationRecordsSelector.selectByConfigurationIds(new Set<Id>(configurationIds)) );
    }
    @AuraEnabled public static String GetBySObjects(List<String> sobjects){
        return JSON.serialize( InvocationRecordsSelector.selectBySObjects(new Set<String>(sobjects)) );
    }
    @AuraEnabled public static String GetByPolicies(List<Id> policyIds){
        return JSON.serialize( InvocationRecordsSelector.selectByPolicies(new Set<Id>(policyIds)) );
    }
    @AuraEnabled public static String GetByTypes(List<String> types){
        return JSON.serialize( InvocationRecordsSelector.selectByTypes( new Set<String>(types) ) );
    }
}