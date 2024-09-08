const { Router } = require("express");
const { BookingService } = require("../service/Booking-service");

var rolerouters = Router();
var admSvc = new BookingService();

// =====================================   add    =====================================================

rolerouters.post("/", async (req, res) => {
    let admin = req.body;
    let result = await admSvc
  
      .addBooking(admin)
      .catch((err) =>
        res.status(500).json({ message: "Unable to add new Role" })
      );
  
  
    if (result) {
      console.log("2");
      res.status(201).json({ message: "Role added successfully" });
    }
  });


//   ===========================================    get all    ====================================================
  


rolerouters.get("/",async(req,res)=>{
    // let admin = req.body;
    let result = await admSvc
     .getAllBookings()
     .catch((err)=>
     res.status(500).json({message:"Unable to add new Role"})
     );
    
    if(result) {
    console.log("2");
    res.status(200).json(result);
     }
    });
    

// =============================================    get by id    =====================================================

rolerouters.get("/:code", async (req, res) => {
    //let admin = req.body;
    var BookingId = req.params["code"];
    //   console.log("getbyId");
    //   console.log(CustomerCode);
  
    let result = await admSvc
  
      .getBookingById(BookingId)
  
      .catch((err) =>
  
        res.status(500).json({ message: "Unable to add new Role" })
  
      );
  
  
  
    if (result) {
  
      // console.log("2");
  
      console.log("getbyid");
  
      res.status(200).json(result);
  
    }
  
  });
  
// ====================================================    update    =================================================


rolerouters.put('/', async (req, res) => {
  let booking = req.body
  console.log('update')
  let result = await admSvc
    .updateBooking(booking)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('2')
    res.status(200).json({ message: 'Updated successfully' })
  }
})


// =================================================================


  rolerouters.get("/orderid/:id", async (req, res) => {
    //let admin = req.body;
    var OredrId = req.params["id"];
    //   console.log("getbyId");
    //   console.log(CustomerCode);
  
    let result = await admSvc
  
      .getOrderById(OredrId)
  
      .catch((err) =>
  
        res.status(500).json({ message: "Unable to add new Role" })
  
      );
  
  
  
    if (result) {
  
      console.log("2");
  
      console.log("getbyid");
  
      res.status(200).json(result);
  
    }
  
  });
  










  module.exports = { rolerouters };