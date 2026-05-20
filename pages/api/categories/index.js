import connectDB from '../../../utils/connectDB';
import Categories from '../../../models/categoriesModel';
import auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
  console.log(`[API] ${req.method} /api/categories initiated at ${new Date().toISOString()}`);
  switch (req.method) {
    case 'POST':
      await createCategory(req, res);
      break;
    case 'GET':
      await getCategories(req, res);
      break;
    default:
      console.warn(`[API Warning] ${req.method} not allowed on /api/categories`);
      res.status(405).json({ err: 'Method not allowed.' });
  }
};

const createCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin') {
      console.warn(`[API Warning] Unauthorized createCategory attempt by user ID: ${result.id}`);
      return res.status(400).json({ err: 'Authentication is not valid.' });
    }

    const { name } = req.body;
    if (!name) {
      console.warn('[API Warning] createCategory failed - name field empty');
      return res.status(400).json({ err: 'Name can not be left blank.' });
    }

    const newCategory = new Categories({ name });

    await newCategory.save();
    console.log(`[API] Successfully created category: ${name} (ID: ${newCategory._id})`);
    res.json({
      msg: 'Success! Created a new category.',
      newCategory,
    });
  } catch (err) {
    console.error('[API Error] POST /api/categories failed:', err);
    return res.status(500).json({ err: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    console.log(`[API] GET /api/categories successfully fetched ${categories.length} categories`);
    res.json({ categories });
  } catch (err) {
    console.error('[API Error] GET /api/categories failed:', err);
    return res.status(500).json({ err: err.message });
  }
};