const {ScanCommand,PutItemCommand,QueryCommand, UpdateItemCommand} = require("@aws-sdk/client-dynamodb");
  const { ddbClient } = require("./ddbClient");
  const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
  const { Booking } = require("../Entity/Booking")


  class BookingService {
    constructor() {
      this.TABLENAME = "Traveller";
    }


    //============================================     add     ===============================================

    addBooking(booking) {
        console.log(booking);
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
  
      var bkg = new Booking(booking);
  
      let params = {
  
          TableName: this.TABLENAME,
  
          Item: marshall(bkg,marshallOptions)
  
      };
  
        let result = ddbClient.send(new PutItemCommand(params)).catch((err) => {
          console.log("err:" + err);
          return Promise.reject(err);
        });
  
        console.log("err1:" + result);
        return Promise.resolve(result);
      }

    //   =================================    get all    ============================================

    async getAllBookings() {
        let params = {
          TableName: this.TABLENAME,
          FilterExpression : "Entity = :Booking",
          ExpressionAttributeValues : { ":Booking": {S : "BOOKING"} }
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



    // =======================================    get by id    =============================================
    

    async getBookingById(BookingId) {
        let params = {
          TableName: this.TABLENAME,
          KeyConditionExpression: "BookingId = :code",
          ExpressionAttributeValues: {
            ":code": { S: BookingId },
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
    

    //   =======================================    update    ==============================================

    async updateBooking(Booking) {
      console.log(Booking)
      let params = {
        TableName: this.TABLENAME,
        Key: {
          TravellerCode: { S: Booking.TravellerCode },
          BookingId : {S: Booking.TravellerCode + "_" + new Date().toISOString()}
        },
        UpdateExpression: 'set #from=:fm, #to=:to, #date=:dt' ,  
        // UpdateExpression:  'set #mail=:ml  ', 
        // UpdateExpression:  'set #name=:nm  ', 
        // UpdateExpression:  'set #dptname=:dptnm  ', 
        ExpressionAttributeNames: {
          '#from': 'From',
          '#to': 'To',
          '#date': 'TravellingDate',
        },
        ExpressionAttributeValues: {
          ':fm': { S: Booking.From },
          ':to': { S: Booking.To },
          ':dt': { S: Booking.TravellingDate },
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
  

    }



    module.exports = { BookingService }