import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import logger from 'use-reducer-logger';
import axios from 'axios';
import Rating from '../components/Rating';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETC_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(logger(reducer), {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="product-container">
      <div className="product-container__img">
        <img className="img-large" src={product.image} alt={product.name}></img>
      </div>
      <div className="product-screen-info">
        <ul className="product-screen-info__list">
          <li className="product-screen-info__heading">{product.name}</li>
          <li>
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
          </li>
          <li>Price : ${product.price}</li>
          <li>
            Description : <p>{product.description}</p>
          </li>
        </ul>
      </div>
      <div className="product-screen-info">
        <ul className="product-screen-status">
          <li>
            Price :{' '}
            <span className="product-screen-status__price">
              ${product.price}
            </span>
          </li>
          <li>
            Status :{' '}
            {product.countInStock > 0 ? (
              <span className="product-screen-status__success">In Stock</span>
            ) : (
              <span className="product-screen-status__danger">Unavailable</span>
            )}
          </li>
          <li>
            {product.countInStock > 0 && (
              <button className="btn-primary">Add to Card</button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductScreen;
