import connectDB from '../../../../utils/connectDB';
import Orders from '../../../../models/orderModel';
import auth from '../../../../middleware/auth';

connectDB();

export default async (req, res) => {
  const { id } = req.query;
  console.log(`[API] ${req.method} /api/order/delivered/${id} initiated at ${new Date().toISOString()}`);
  switch (req.method) {
    case 'PATCH':
      await deliveredOrder(req, res);
      break;
    default:
      console.warn(`[API Warning] ${req.method} not allowed on /api/order/delivered/${id}`);
      res.status(405).json({ err: 'Method not allowed.' });
  }
};

const deliveredOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin') {
      console.warn(`[API Warning] Unauthorized deliveredOrder attempt on ID ${req.query.id} by user ID: ${result.id}`);
      return res.status(400).json({ err: 'Authentication is not valid.' });
    }

    const { id } = req.query;

    const order = await Orders.findOne({ _id: id });
    if (!order) {
      console.warn(`[API Warning] deliveredOrder failed - Order ID ${id} not found.`);
      return res.status(400).json({ err: 'Order does not exist.' });
    }

    if (order.paid) {
      await Orders.findOneAndUpdate({ _id: id }, { delivered: true });
      console.log(`[API] Order ID ${id} marked as delivered (previously paid).`);
      res.json({
        msg: 'Updated success!',
        result: {
          paid: true,
          dateOfPayment: order.dateOfPayment,
          method: order.method,
          delivered: true,
        },
      });
    } else {
      const now = new Date().toISOString();
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfPayment: now,
          method: 'Receive Cash',
          delivered: true,
        }
      );
      console.log(`[API] Order ID ${id} paid via Cash and marked as delivered at ${now}.`);
      res.json({
        msg: 'Updated success!',
        result: {
          paid: true,
          dateOfPayment: now,
          method: 'Receive Cash',
          delivered: true,
        },
      });
    }
  } catch (err) {
    console.error(`[API Error] PATCH /api/order/delivered/${req.query.id} failed:`, err);
    return res.status(500).json({ err: err.message });
  }
};