public with sharing class FooService {
	@AuraEnabled public static void getSampleString(String fizz, String buzz) {
    return fizz + buzz;
	}
}