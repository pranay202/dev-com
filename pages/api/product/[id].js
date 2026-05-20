import connectDB from '../../../utils/connectDB';
import Products from '../../../models/productModel';
import auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
  const { id } = req.query;
  console.log(`[API] ${req.method} /api/product/${id} initiated at ${new Date().toISOString()}`);
  switch (req.method) {
    case 'GET':
      await getProduct(req, res);
      break;
    case 'PUT':
      await updateProduct(req, res);
      break;
    case 'DELETE':
      await deleteProduct(req, res);
      break;
    default:
      console.warn(`[API Warning] ${req.method} not allowed on /api/product/${id}`);
      res.status(405).json({ err: 'Method not allowed.' });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Products.findById(id);
    if (!product) {
      console.warn(`[API Warning] GET /api/product/${id} failed - product does not exist.`);
      return res.status(400).json({ err: 'This product does not exist.' });
    }

    console.log(`[API] GET /api/product/${id} successfully fetched product: ${product.title}`);
    res.json({ product });
  } catch (err) {
    console.error(`[API Error] GET /api/product/${req.query.id} failed:`, err);
    return res.status(500).json({ err: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin') {
      console.warn(`[API Warning] Unauthorized updateProduct attempt on ID ${req.query.id} by user ID: ${result.id}`);
      return res.status(400).json({ err: 'Authentication is not valid.' });
    }

    const { id } = req.query;
    const { title, price, inStock, description, content, category, images } = req.body;

    if (!title || !price || !inStock || !description || !content || category === 'all' || images.length === 0) {
      console.warn(`[API Warning] updateProduct failed for ID ${id} - missing mandatory fields`);
      return res.status(400).json({ err: 'Please add all the fields.' });
    }

    const updated = await Products.findOneAndUpdate(
      { _id: id },
      {
        title: title.toLowerCase(),
        price,
        inStock,
        description,
        content,
        category,
        images,
      },
      { new: true }
    );

    console.log(`[API] Successfully updated product ID ${id}: ${updated.title}`);
    res.json({ msg: 'Success! Updated a product' });
  } catch (err) {
    console.error(`[API Error] PUT /api/product/${req.query.id} failed:`, err);
    return res.status(500).json({ err: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role !== 'admin') {
      console.warn(`[API Warning] Unauthorized deleteProduct attempt on ID ${req.query.id} by user ID: ${result.id}`);
      return res.status(400).json({ err: 'Authentication is not valid.' });
    }

    const { id } = req.query;

    const deleted = await Products.findByIdAndDelete(id);
    console.log(`[API] Successfully deleted product ID ${id}: ${deleted?.title || 'Unknown'}`);
    res.json({ msg: 'Deleted a product.' });
  } catch (err) {
    console.error(`[API Error] DELETE /api/product/${req.query.id} failed:`, err);
    return res.status(500).json({ err: err.message });
  }
};