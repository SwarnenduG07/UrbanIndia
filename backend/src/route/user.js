import express from "express";
const app = express();

app.use(express.json());

userRouter.post("/signup",  async (req, res) => {
    const body = req.body;
     try {
    /*
      Your Signup logic
    */
        res.json({
            message:"User Created"
        })
     } catch (e) {
         console.log(e);
         res.json({
            message:"Error in signup route"
         })
     }

})

userRouter.post("/signin", async (req,res) => {
    const body = req.body;    
    try {
        //  Your signin logic
    } catch (error) {
        console.log(error);
        res.json({
            message : "Error in SignIn Route"
        })
    }
    

})

app.listen(3000, () => {
    console.log("Server is lestening on Port 3000");
})