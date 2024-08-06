import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IProduct } from "@/common/types/product";

const SearchPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [products, setProducts] = useState<IProduct[]>([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query.trim()) return;

      try {
        const response = await fetch(
          `http://localhost:8080/api/products?search=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [query]);

  return (
    <div>
      <strong className="lg:text-[30px] mb:text-[32px] lg:leading-[70px] mb:leading-[40px] lg:tracking-[-3px] mb:tracking-[-1.8px]">
        HÀNG MỚI CẬP NHẬT
      </strong>

      <div className="lg:w-full mb:w-[342px] md:w-[95vw] grid lg:my-[41px] my-6 lg:grid-cols-[304px_304px_304px_304px] mb:grid-cols-[159px_159px] lg:gap-y-8 gap-y-[29.5px] text-center justify-between">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="rounded-lg p-5 shadow-md">
              <Link to={`/products/${product._id}`}>
                <div className="relative group w-full lg:h-[240px] mb:h-[160px] bg-[#f4f4f4] rounded-xl grid place-items-center">
                  {product.image && product.image.length > 0 && (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="lg:w-[310px] mb:w-[200px] lg:h-[250px] mb:h-[200px]"
                    />
                  )}
                  <button className="absolute scale-0 group-hover:scale-100 group-hover:translate-y-0 -translate-y-[200%] duration-200 z-[2] lg:w-[152px] mb:w-[136px] lg:h-[64px]  mb:h-[48px] rounded-[100px] border-none bg-[#1A1E2630] text-sm text-white backdrop-blur-md">
                    Chi tiết
                  </button>
                </div>
              </Link>
              <div className="flex flex-col gap-y-2 items-center">
                <strong className="lg:text-lg mt-7 text-center mb:text-base font-normal text-[#1A1E26] overflow-hidden whitespace-nowrap text-ellipsis w-full max-w-[304px]">
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
          <p>Không tìm thấy sản phẩm</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
