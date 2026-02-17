import Category from './Category';
import './products.css';

const products = [
  {
    id: 1,
    name: '패디드 워크 자켓 (Charcoal)',
    image:
      'https://hdex.co.kr/web/product/big/202510/fc794a5665219d568a965dd323e1f5ac.jpg',
    price: 178200,
    originalPrice: 198000
  },
  {
    id: 2,
    name: '오리진 자이언트핏 후디 집업 (Navy)',
    image:
      'https://hdex.co.kr/web/product/big/202510/fc794a5665219d568a965dd323e1f5ac.jpg',
    price: 98100,
    originalPrice: 109000
  },
  {
    id: 3,
    name: '오리진 자이언트핏 후디 집업 (Melange Gray)',
    image:
      'https://hdex.co.kr/web/product/big/202510/fc794a5665219d568a965dd323e1f5ac.jpg',
    price: 98100,
    originalPrice: 109000
  },
  {
    id: 4,
    name: '윙드 로고 컬러 블럭 후디 (Black)',
    image:
      'https://hdex.co.kr/web/product/big/202510/fc794a5665219d568a965dd323e1f5ac.jpg',
    price: 98100,
    originalPrice: 109000
  }
];

export default function Products() {
  return (
    <>
      <Category />

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="image-wrap">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="product-info">
              <p className="name">{p.name}</p>
              <div className="price-box">
                <span className="original">
                  ₩{p.originalPrice.toLocaleString()}
                </span>
                <span className="price">₩{p.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
