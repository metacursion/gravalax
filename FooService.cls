public with sharing class FooService {
	@AuraEnabled public static String getSampleString(String fizz, String buzz) {
    return fizz + buzz;
	}
}