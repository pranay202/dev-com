import connectDB from '../../../utils/connectDB';
import Orders from '../../../models/orderModel';
import Products from '../../../models/productModel';
import auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
  console.log(`[API] ${req.method} /api/order initiated at ${new Date().toISOString()}`);
  switch (req.method) {
    case 'POST':
      await createOrder(req, res);
      break;
    case 'GET':
      await getOrders(req, res);
      break;
    default:
      console.warn(`[API Warning] ${req.method} not allowed on /api/order`);
      res.status(405).json({ err: 'Method not allowed.' });
  }
};

const getOrders = async (req, res) => {
  try {
    const result = await auth(req, res);

    let orders;
    if (result.role !== 'admin') {
      orders = await Orders.find({ user: result.id }).populate('user', '-password');
      console.log(`[API] GET /api/order successfully fetched ${orders.length} orders for user ID: ${result.id}`);
    } else {
      orders = await Orders.find().populate('user', '-password');
      console.log(`[API] GET /api/order successfully fetched all ${orders.length} orders for Admin`);
    }

    res.json({ orders });
  } catch (err) {
    console.error('[API Error] GET /api/order failed:', err);
    return res.status(500).json({ err: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { address, mobile, cart, total } = req.body;

    const newOrder = new Orders({
      user: result.id,
      address,
      mobile,
      cart,
      total,
    });

    // Update stocks and sold counts
    for (const item of cart) {
      await sold(item._id, item.quantity, item.inStock, item.sold);
    }

    await newOrder.save();
    console.log(`[API] Order successfully created (ID: ${newOrder._id}) by user ID: ${result.id}`);

    res.json({
      msg: 'Order success! We will contact you to confirm the order.',
      newOrder,
    });
  } catch (err) {
    console.error('[API Error] POST /api/order failed:', err);
    return res.status(500).json({ err: err.message });
  }
};

const sold = async (id, quantity, oldInStock, oldSold) => {
  try {
    await Products.findOneAndUpdate(
      { _id: id },
      {
        inStock: oldInStock - quantity,
        sold: quantity + oldSold,
      }
    );
    console.log(`[DB] Product stock updated for ID ${id} - Quantity purchased: ${quantity}`);
  } catch (err) {
    console.error(`[DB Error] Failed to update product stock for ID ${id}:`, err.message);
    throw err;
  }
};