import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    console.log(`[API] ${req.method} /api/user initiated at ${new Date().toISOString()}`);
    switch(req.method){
        case "PATCH":
            await uploadInfor(req, res)
            break;
        case "GET":
            await getUsers(req, res)
            break;
        default:
            console.warn(`[API Warning] ${req.method} not allowed on /api/user`);
            res.status(405).json({ err: 'Method not allowed.' });
    }
}

const getUsers = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') {
            console.warn(`[API Warning] Unauthorized user access attempt to getUsers by user ID: ${result.id}`);
            return res.status(400).json({err: "Authentication is not valid"})
        }

        const users = await Users.find().select('-password')
        console.log(`[API] Successfully retrieved ${users.length} users for admin user (ID: ${result.id})`);
        res.json({users})

    } catch (err) {
        console.error(`[API Error] getUsers failed:`, err);
        return res.status(500).json({err: err.message})
    }
}


const uploadInfor = async (req, res) => {
    try {
        const result = await auth(req, res)
        const {name, avatar} = req.body

        const newUser = await Users.findOneAndUpdate({_id: result.id}, {name, avatar})
        console.log(`[API] User ${result.id} successfully updated information`);
        res.json({
            msg: "Update Success!",
            user: {
                name,
                avatar,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch (err) {
        console.error(`[API Error] uploadInfor failed:`, err);
        return res.status(500).json({err: err.message})
    }
}