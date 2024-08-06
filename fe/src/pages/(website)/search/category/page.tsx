import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "@/configs/axios";
import { IProduct } from "@/common/types/product";
import { Link } from "react-router-dom";

const SearchPageCategory: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get(
          `/products?category=${encodeURIComponent(category)}`
        );
        setProducts(response.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div>
      <strong className="lg:text-[30px] mb:text-[32px] lg:leading-[70px] mb:leading-[40px] lg:tracking-[-3px] mb:tracking-[-1.8px]">
        {category}
      </strong>
      <div className="lg:w-full mb:w-[342px] md:w-[95vw] grid lg:my-[41px] my-6 lg:grid-cols-[304px_304px_304px_304px] mb:grid-cols-[159px_159px] lg:gap-y-8 gap-y-[29.5px] text-center justify-between">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="border rounded-lg p-5 shadow-md">
              <Link to={`/products/${product._id}`} className="hidden lg:block">
                {product.image && product.image.length > 0 && (
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="lg:w-[310px] mb:w-[200px] lg:h-[250px] mb:h-[200px] object-cover"
                  />
                )}
              </Link>
              <div className="flex flex-col gap-y-2 items-center">
                <strong className="lg:text-lg text-center mb:text-base font-normal text-[#1A1E26] overflow-hidden whitespace-nowrap text-ellipsis w-full max-w-[304px]">
                  <Link
                    to={`/products/${product._id}`}
                    className="font-bold hover:text-red-500 transition-colors duration-300"
                  >
                    {product.name}
                  </Link>
                </strong>
              </div>
              <div className="flex flex-col gap-y-2 items-center lg:translate-y-0 mb:-translate-y-[2.5px]">
                <div className="flex mb:text-sm lg:text-base lg:mb-3 mb:mb-2.5"></div>
                <div className="flex items-center gap-x-2 text-xs mb:px-2 lg:py-[7px] mb:translate-y-0.5 lg:translate-y-0 mb:py-1 lg:px-[10px] rounded">
                  <span className="flex items-center gap-x-2">
                    <del
                      className="text-[#9D9EA2] lg:text-sm mb:text-sm font-bold"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {product.price} VNĐ
                    </del>
                    <div
                      className="font-bold lg:text-xl mb:text-base"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      {product.discount} VNĐ
                    </div>
                  </span>
                </div>
                <button className="bg-[#17AF26] lg:w-[158px] mb:w-[118px] lg:mt-[11px] mb:mt-[14.5px] h-[40px] grid place-items-center rounded-[100px] lg:text-sm mb:text-xs text-white font-bold">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào!</p>
        )}
      </div>
    </div>
  );
};

export default SearchPageCategory;
