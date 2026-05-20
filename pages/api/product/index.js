import connectDB from '../../../utils/connectDB';
import Products from '../../../models/productModel';
import auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
  console.log(`[API] ${req.method} /api/product initiated at ${new Date().toISOString()}`);
  switch (req.method) {
    case 'GET':
      await getProducts(req, res);
      break;
    case 'POST':
      await createProduct(req, res);
      break;
    default:
      console.warn(`[API Warning] ${req.method} not allowed on /api/product`);
      res.status(405).json({ err: 'Method not allowed.' });
  }
};

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludeFields = ['page', 'sort', 'limit'];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.category !== 'all')
      this.query.find({ category: queryObj.category });
    if (queryObj.title !== 'all')
      this.query.find({ title: { $regex: queryObj.title.toLowerCase() } });

    this.query.find();
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join('');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 6;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const getProducts = async (req, res) => {
  try {
    const features = new APIfeatures(Products.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const products = await features.query;

    console.log(`[API] GET /api/product successfully fetched ${products.length} products`);
    res.json({
      status: 'success',
      result: products.length,
      products,
    });
  } catch (err) {
    console.error('[API Error] GET /api/product failed:', err);
    return res.status(500).json({ err: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin') {
      console.warn(`[API Warning] Unauthorized createProduct attempt by user ID: ${result.id}`);
      return res.status(400).json({ err: 'Authentication is not valid.' });
    }

    const { title, price, inStock, description, content, category, images } =
      req.body;

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === 'all' ||
      images.length === 0
    ) {
      console.warn('[API Warning] createProduct failed - missing mandatory fields');
      return res.status(400).json({ err: 'Please add all the fields.' });
    }

    const newProduct = new Products({
      title: title.toLowerCase(),
      price,
      inStock,
      description,
      content,
      category,
      images,
    });

    await newProduct.save();
    console.log(`[API] Successfully created product: ${newProduct.title} (ID: ${newProduct._id})`);
    res.json({ msg: 'Success! Created a new product' });
  } catch (err) {
    console.error('[API Error] POST /api/product failed:', err);
    return res.status(500).json({ err: err.message });
  }
};
