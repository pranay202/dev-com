import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'
import bcrypt from 'bcrypt'

connectDB()

export default async (req, res) => {
    console.log(`[API] ${req.method} /api/user/resetPassword initiated at ${new Date().toISOString()}`);
    switch(req.method){
        case "PATCH":
            await resetPassword(req, res)
            break;
        default:
            console.warn(`[API Warning] ${req.method} not allowed on /api/user/resetPassword`);
            res.status(405).json({ err: 'Method not allowed.' });
    }
}


const resetPassword = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { password } = req.body
        const passwordHash = await bcrypt.hash(password, 12)

        await Users.findOneAndUpdate({_id: result.id}, {password: passwordHash})
        console.log(`[API] User ${result.id} successfully updated password`);
        res.json({ msg: "Update Success!"})
        
    } catch (err) {
        console.error(`[API Error] resetPassword failed for user:`, err);
        return res.status(500).json({err: err.message})
    }   
}