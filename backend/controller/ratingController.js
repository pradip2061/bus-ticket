const path = require("../model/PathModel")
const Sign = require("../model/SignUpModel")

const rating = async(req,res)=>{
 try {
       const{rating,review,busid}=req.body
    const userid =req.user
    console.log(rating,userid,busid,review)
    if(!rating || !review ||!userid){
        return res.status(400).json({message:"all fields are required!"})
    }
    const userinfo = await Sign.findOne({_id:userid}).select('firstName lastName')
    const businfo = await path.findOne({_id:busid})
    if(!businfo){
        return res.status(404).json({message:'not found bus'})
    }

    businfo.rate.push({userid,rating,review,username:userinfo.firstName+userinfo.lastName})

    await businfo.save()
    res.status(200).json({message:"rating successfully!"})
 } catch (error) {
    console.log(error)
 }
}


module.exports=rating