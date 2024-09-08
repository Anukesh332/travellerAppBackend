class Booking{

    constructor (Booking) {

    
        var SK,PK


        //PK = uuidv4()

        //SK=PK

        //this.PK = PK

        //this.SK =   SK;

        this.TravellerName = Booking.TravellerName;

       // this.CustId= SK

        this.From = Booking.From

        this.Entity = "BOOKING"

        this.TravellerCode=Booking.TravellerCode

        this.To=Booking.To

        this.TravellingDate=Booking.TravellingDate

        this.Status=Booking.Status

        this.BookingId=Booking.TravellerCode + "_" + new Date().toISOString();

    }


}



module.exports = {Booking}