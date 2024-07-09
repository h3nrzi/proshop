import { model, Schema } from "mongoose";

interface Review {
  user: typeof Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

interface Product {
  user: typeof Schema.Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: Review[];
  addReview(review: Review): Promise<void>;
}

const reviewSchema = new Schema<Review>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
  },
  { timestamps: true }
);

const productSchema = new Schema<Product>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: [true, "Number of reviews is required"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, "Count in stock is required"],
      default: 0,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

productSchema.methods.addReview = async function (this: Product, review: Review) {
  this.reviews.push(review);
  this.numReviews = this.reviews.length;
  this.rating = this.reviews.reduce((sum, review) => sum + review.rating, 0) / this.numReviews;
};

const Product = model<Product>("Product", productSchema);
export default Product;
