const { Router } = require("express");
const { TravellerService } = require("../service/Traveller-service");

var rolerouter = Router();
var admSvc = new TravellerService();


// ==========================================    add    ====================================================

rolerouter.post("/", async (req, res) => {
  let admin = req.body;
  let result = await admSvc

    .addTraveller(admin)
    .catch((err) =>
      res.status(500).json({ message: "Unable to add new Role" })
    );


  if (result) {
    console.log("added");
    res.status(201).json({ message: "Role added successfully" });
  }
});


// =========================================    delete    =====================================================


rolerouter.delete("/:code", async (req, res) => {
  var tracode = req.params ["code"]
  // var id = req.params ["id"]
//  let customer = req.body;
 console.log("delete");

 let result = await admSvc
.deleteTraveller(tracode)
 .catch((err) =>
res.status(500).json({ message: "Unable to delete Role" })
 );

 if (result) {
 console.log("delete");
 res.status(201).json({ message: "Role deleted successfully" });
 }

});


// ============================================    get all    ======================================================


rolerouter.get("/get",async(req,res)=>{
// let admin = req.body;
let result = await admSvc
 .getAllTravellers()
 .catch((err)=>
 res.status(500).json({message:"Unable to add new Role"})
 );

if(result) {
console.log("2");
res.status(200).json(result);
 }
});



// ===============================================    update    ====================================================

rolerouter.put('/', async (req, res) => {
  let traveller = req.body
  console.log('update')
  let result = await admSvc
    .updateTraveller(traveller)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('2')
    res.status(200).json({ message: 'Updated successfully' })
  }
})



// ==========================================    get by id    ============================================================

rolerouter.get("/:code", async (req, res) => {
  //let admin = req.body;
  var TravellerCode = req.params["code"];
  //   console.log("getbyId");
  //   console.log(CustomerCode);

  let result = await admSvc

    .getTravellerById(TravellerCode)

    .catch((err) =>

      res.status(500).json({ message: "Unable to add new Role" })

    );



  if (result) {

    console.log("2");

    console.log("getbyid");

    res.status(200).json(result);

  }

});


module.exports = { rolerouter };

