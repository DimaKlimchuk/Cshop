import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Product from '../components/Product';
//import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETC_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      //setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div className="content">
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="products-container">
            {products.map((product) => (
              <div key={product.slug} className="poduct">
                <Product product={product}></Product>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
