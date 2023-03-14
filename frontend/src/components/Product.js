import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
  const { product } = props;
  return (
    <div className="product">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-info">
        <Link className="product-link" to={`/product/${product.slug}`}>
          <p>{product.name}</p>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p>
          <strong>${product.price}</strong>
        </p>
        <div className="product-btn-container">
          <button className="btn-primary">Add to card</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
