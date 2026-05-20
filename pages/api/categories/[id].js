import connectDB from '../../../utils/connectDB';
import Categories from '../../../models/categoriesModel';
import Products from '../../../models/productModel';
import auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
  const { id } = req.query;
  console.log(`[API] ${req.method} /api/categories/${id} initiated at ${new Date().toISOString()}`);
  switch (req.method) {
    case 'PUT':
      await updateCategory(req, res);
      break;
    case 'DELETE':
      await deleteCategory(req, res);
      break;
    default:
      console.warn(`[API Warning] ${req.method} not allowed on /api/categories/${id}`);
      res.status(405).json({ err: 'Method not allowed.' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin') {
      console.warn(`[API Warning] Unauthorized updateCategory attempt on ID ${req.query.id} by user ID: ${result.id}`);
      return res.status(400).json({ err: 'Authentication is not valid.' });
    }

    const { id } = req.query;
    const { name } = req.body;

    const newCategory = await Categories.findOneAndUpdate({ _id: id }, { name }, { new: true });
    console.log(`[API] Successfully updated category ID ${id} to name: ${name}`);
    res.json({
      msg: 'Success! Update a new category',
      category: {
        ...newCategory._doc,
        name,
      },
    });
  } catch (err) {
    console.error(`[API Error] PUT /api/categories/${req.query.id} failed:`, err);
    return res.status(500).json({ err: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin') {
      console.warn(`[API Warning] Unauthorized deleteCategory attempt on ID ${req.query.id} by user ID: ${result.id}`);
      return res.status(400).json({ err: 'Authentication is not valid.' });
    }

    const { id } = req.query;

    const products = await Products.findOne({ category: id });
    if (products) {
      console.warn(`[API Warning] Failed to delete category ID ${id} - active products depend on it`);
      return res.status(400).json({
        err: 'Please delete all products with a relationship',
      });
    }

    await Categories.findByIdAndDelete(id);
    console.log(`[API] Successfully deleted category ID: ${id}`);
    res.json({ msg: 'Success! Deleted a category' });
  } catch (err) {
    console.error(`[API Error] DELETE /api/categories/${req.query.id} failed:`, err);
    return res.status(500).json({ err: err.message });
  }
};