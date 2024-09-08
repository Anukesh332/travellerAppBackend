const {ScanCommand,PutItemCommand,QueryCommand, DeleteItemCommand, UpdateItemCommand} = require("@aws-sdk/client-dynamodb");
  const { ddbClient } = require("./ddbClient");
  const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
  const { Traveller } = require("../Entity/Traveller")

  

  class TravellerService {
    constructor() {
      this.TABLENAME = "Traveller";
    }
  
// ========================================    add traveller    ==============================================

    addTraveller(traveller) {
      console.log(traveller);
    //   let params = {
    //     TableName: this.TABLENAME,
    //     Item: marshall(customer),
    //   };


      const marshallOptions = {

        // Whether to automatically convert empty strings, blobs, and sets to `null`.

        convertEmptyValues: false, // false, by default.

        // Whether to remove undefined values while marshalling.

        removeUndefinedValues: true, // false, by default.

        // Whether to convert typeof object to map attribute.

        convertClassInstanceToMap: true, // false, by default. <-- HERE IS THE ISSUE

    };

    var tra = new Traveller(traveller);

    let params = {

        TableName: this.TABLENAME,

        Item: marshall((tra),marshallOptions)

    };

      let result = ddbClient.send(new PutItemCommand(params)).catch((err) => {
        console.log("err:" + err);
        return Promise.reject(err);
      });


      console.log("err1:" + result);
      return Promise.resolve(result);
    }

  // =======================================    get all    =================================================

  async getAllTravellers() {
    let params = {
      TableName: this.TABLENAME,
      FilterExpression : "Entity = :Traveller",
      ExpressionAttributeValues : { ":Traveller": {S : "TRAVELLER"} }
      }
   
    
    let result = await ddbClient.send(new ScanCommand(params)).catch((err) => {
      console.log("err:" + err);
      return Promise.reject(err);
    });
    console.log(result);
    let admins = [];
    result.Items.forEach((Item) => admins.push(unmarshall(Item)));
    return Promise.resolve(admins);
  
};


  
  // ========================================    get by id    ===========================================

  async getTravellerById(TravellerCode) {
    let params = {
      TableName: this.TABLENAME,
      KeyConditionExpression: "TravellerCode = :code",
      ExpressionAttributeValues: {
        ":code": { S: TravellerCode },
      },

    };

    let result = await ddbClient.send(new QueryCommand(params)).catch((err) => {
      console.log("err:" + err);
      return Promise.reject(err);
    });
    console.log(result);
    return Promise.resolve(result);

    // let admin = [];
    // result.Items.forEach((item) => admin.push(unmarshall(item)));
    // return Promise.resolve(admin);
  }


   // ==========================================    update    ==================================================

   async updateTraveller(Traveller) {
    console.log(Traveller)
    let params = {
      TableName: this.TABLENAME,
      Key: {
        TravellerCode: { S: Traveller.TravellerCode },
        BookingId : {S: "Not Applicable"}
      },
      UpdateExpression: 'set #name=:nm  ',
      ExpressionAttributeNames: {
        '#name': 'TravellerName'
      },
      ExpressionAttributeValues: {
        ':nm': { S: Traveller.TravellerName }
      },
    
    }
    let result = ddbClient.send(new UpdateItemCommand(params)).catch((err) => {
      if (err) {
        console.error('Unable to Update entry', err)
        // return Promise.error(err);
      } else {
        console.log(`Updated the entry succesfully`)
      }
    })
    // return Promise.resolve(admins);
  }



// =============================================    delete    =======================================================


async deleteTraveller(tracode) {
    console.log(tracode);
    let params = {
      TableName: this.TABLENAME,
      Key: {
        TravellerCode: { S: tracode },
        BookingId : {S: "Not Applicable"}
      },
    };
  
    let result = ddbClient.send(new DeleteItemCommand(params)).catch((err) => {
      console.log("Delete the TravellerCode")
      if (err) {
        console.log("err:" + err);
      } else {
        console.log("Deleted Traveller");
        return Promise.reject(err);

      }
      return Promise.resolve(result);

    });


    // let result = ddbClient.send(new DeleteItemCommand(params)).catch((err) => {
    //   console.log("err:" + err);
    //   return Promise.reject(err);
    // });


    // console.log("err1:" + result);
    // return Promise.resolve(result);
  


  }
    




}






module.exports = { TravellerService }