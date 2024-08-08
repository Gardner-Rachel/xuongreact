import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";
import { Button, message } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

type ProductItemProps = {
  product: IProduct;
};

const ProductItems = ({ product }: ProductItemProps) => {
  const addToCartMutation = useMutation({
    mutationFn: (cartData: {
      userId: string;
      productId: string;
      quantity: number;
    }) => instance.post("/carts/add-to-cart", cartData),
    onSuccess: () => {
      message.success("Sản phẩm đã được thêm vào giỏ hàng!");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    },
  });

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user._id;
    const quantity = 1;

    if (!userId) {
      message.error(
        "Bạn cần phải đăng nhập trước khi thêm sản phẩm vào giỏ hàng."
      );
      return;
    }

    if (!product._id) {
      message.error("Sản phẩm không hợp lệ.");
      return;
    }
    const productId = String(product._id);
    addToCartMutation.mutate({ userId, productId, quantity });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="lg:w-full mb:w-[342px] md:w-[95vw] grid lg:my-[41px] my-6 lg:grid-cols-[304px_304px_304px_304px] mb:grid-cols-[159px_159px] lg:gap-y-8 gap-y-[29.5px] text-center justify-between">
        {/* item 1 */}
        <div className="grid grid-cols-[100%] snap-center lg:auto-rows-[240px_auto] mb:auto-rows-[160px_auto] lg:gap-y-[25px] mb:gap-y-[27px] overflow-hidden h-full rounded-xl">
          {/* img */}
          <Link to={`/products/${product._id}`} className="hidden lg:block">
            <div className="relative group w-full lg:h-[240px] mb:h-[160px] bg-[#f4f4f4] rounded-xl grid place-items-center">
              <img
                className="lg:w-[310px] mb:w-[200px] lg:h-[250px] mb:h-[200px]"
                src={product.image}
              />
              <button className="absolute scale-0 group-hover:scale-100 group-hover:translate-y-0 -translate-y-[200%] duration-200 z-[2] lg:w-[152px] mb:w-[136px] lg:h-[64px]  mb:h-[48px] rounded-[100px] border-none bg-[#1A1E2630] text-sm text-white backdrop-blur-md">
                Chi tiết
              </button>
              <section className="hidden absolute top-0 left-0 bg-[#F2BC1B] px-3 py-1.5 text-white">
                $60 ounce
              </section>
            </div>
          </Link>
          {/* about */}
          <div className="w-full flex flex-col justify-between gap-y-5 items-center">
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

              <Button
                type="primary"
                onClick={handleAddToCart}
                className="lg:text-base mb:text-sm font-bold text-white bg-[#17AF26] rounded-[100px] lg:px-[30px] mb:px-[22px] lg:h-14 mb:h-12"
              >
                Thêm vào giỏ hàng
              </Button>
              {/* <button className="bg-[#17AF26] lg:w-[158px] mb:w-[118px] lg:mt-[11px] mb:mt-[14.5px] h-[40px] grid place-items-center rounded-[100px] lg:text-sm mb:text-xs text-white font-bold">
                Thêm vào giỏ hàng
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItems;
