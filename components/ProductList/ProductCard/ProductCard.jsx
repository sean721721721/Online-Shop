import Image from 'next/image';

export default function ProductCard () {
  return (
      <div className="product-card">
        <Image
          src="/product1.jpg"
          width={182}
          height={182}
        />
      </div>
  );
}
