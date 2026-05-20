import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    console.log(`[API] ${req.method} /api/user/[id] initiated at ${new Date().toISOString()}`);
    switch(req.method){
        case "PATCH":
            await updateRole(req, res)
            break;
        case "DELETE":
            await deleteUser(req, res)
            break;
        default:
            console.warn(`[API Warning] ${req.method} not allowed on /api/user/[id]`);
            res.status(405).json({ err: 'Method not allowed.' });
    }
}

const updateRole = async (req, res) => {
    try {
       const result = await auth(req, res)
       if(result.role !== 'admin' || !result.root) {
           console.warn(`[API Warning] Unauthorized attempt to update user role by user ID: ${result.id}`);
           return res.status(400).json({err: "Authentication is not valid"})
       }

       const {id} = req.query
       const {role} = req.body

       await Users.findOneAndUpdate({_id: id}, {role})
       console.log(`[API] Admin ${result.id} successfully updated role of user ${id} to ${role}`);
       res.json({msg: 'Update Success!'})

    } catch (err) {
        console.error(`[API Error] updateRole failed for target user ${req.query.id}:`, err);
        return res.status(500).json({err: err.message})
    }
}

const deleteUser = async (req, res) => {
    try {
       const result = await auth(req, res)
       if(result.role !== 'admin' || !result.root) {
           console.warn(`[API Warning] Unauthorized attempt to delete user by user ID: ${result.id}`);
           return res.status(400).json({err: "Authentication is not valid"})
       }

       const {id} = req.query

       await Users.findByIdAndDelete(id)
       console.log(`[API] Admin ${result.id} successfully deleted user ${id}`);
       res.json({msg: 'Deleted Success!'})

    } catch (err) {
        console.error(`[API Error] deleteUser failed for target user ${req.query.id}:`, err);
        return res.status(500).json({err: err.message})
    }
}