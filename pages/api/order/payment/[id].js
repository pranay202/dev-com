import connectDB from '../../../../utils/connectDB';
import Orders from '../../../../models/orderModel';
import auth from '../../../../middleware/auth';

connectDB();

export default async (req, res) => {
  const { id } = req.query;
  console.log(`[API] ${req.method} /api/order/payment/${id} initiated at ${new Date().toISOString()}`);
  switch (req.method) {
    case 'PATCH':
      await paymentOrder(req, res);
      break;
    default:
      console.warn(`[API Warning] ${req.method} not allowed on /api/order/payment/${id}`);
      res.status(405).json({ err: 'Method not allowed.' });
  }
};

const paymentOrder = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role === 'user') {
      const { id } = req.query;
      const { paymentId } = req.body;

      const now = new Date().toISOString();
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfPayment: now,
          paymentId,
          method: 'Paypal',
        }
      );

      console.log(`[API] Order ID ${id} successfully paid via PayPal (ID: ${paymentId}) at ${now}.`);
      res.json({ msg: 'Payment success!' });
    } else {
      console.warn(`[API Warning] paymentOrder failed - only standard users can make payments. User ID: ${result.id}`);
      res.status(403).json({ err: 'Only standard users can make payments.' });
    }
  } catch (err) {
    console.error(`[API Error] PATCH /api/order/payment/${req.query.id} failed:`, err);
    return res.status(500).json({ err: err.message });
  }
};