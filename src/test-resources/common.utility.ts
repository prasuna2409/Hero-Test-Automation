export class CommonUtils{
   public static getTestDataFromJson(data: any, scenario: any, keyName:any) : any {
    try{
        console.log(scenario);
        console.log(keyName);
        return data[scenario][keyName];
    }catch (error){
        throw new Error('Exception occured inside getTestDataFromJson function:'+error);
        }
    }

   }
 

