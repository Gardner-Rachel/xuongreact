import { ICategory } from "@/common/types/category";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import React, { useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductItems from "../../_components/ProductItems";
import {
  CarOutlined,
  ClockCircleOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

type Props = {};

const ProductDetailPage = (props: Props) => {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => instance.get(`/products/${id}`),
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => instance.get(`/categories`),
  });
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => instance.get("/products"),
  });

  const productCategories = product?.data.category || [];
  const categoryOptions = categories?.data
    .filter((category: { _id: number | string; name: string }) =>
      productCategories.includes(category._id)
    )
    .map((category: { _id: number | string; name: string }) => ({
      value: category._id,
      label: category.name,
    }));

  // const addToCart = () => {
  //   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  //   const existingProductIndex = cart.findIndex(
  //     (item: any) => item._id === product?.data._id
  //   );

  //   if (existingProductIndex >= 0) {

  //     cart[existingProductIndex].quantity += 1;
  //   } else {

  //     cart.push({ ...product?.data, quantity: 1 });
  //   }

  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   alert("Sản phẩm đã được thêm vào giỏ hàng!");
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <main className="w-full *:lg:w-[1312px] *:w-[342px] *:mx-auto *:h-full lg:py-10 mb:py-6 lg:mt-0 mb:mt-0.5">
        <div className="lg:grid lg:grid-cols-[573px_640px] justify-between border-b">
          {/*  desktop : left  , mobile : row 1 */}
          <div className="w-full h-full">
            <div className="w-full flex flex-col lg:items-center lg:gap-y-6 gap-y-3.5">
              <div className="handle_show_img_product relative cursor-pointer w-full lg:h-[520px] mb:h-[342px] bg-white border grid place-items-center mb:rounded-xl lg:rounded-3xl">
                <img
                  className="lg:w-[400px] lg:h-[400px] mb:w-[240px] mb:h-[240px]"
                  src={product?.data.image}
                />
                <div className="absolute bottom-0 cursor-pointer hover:scale-110 duration-300 right-0 -translate-x-1/2 -translate-y-1/2 lg:w-10 lg:h-10 mb:w-8 mb:h-8 lg:p-2.5 mb:p-2 rounded-[50%] bg-white grid place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-external-link"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </div>
              </div>
              <div className="*:lg:w-16 *:lg:h-16 *:mb:w-14 *:mb:h-14 *:p-2 *:bg-[#F4F4F4] *:rounded-lg *:duration-300 *:cursor-pointer flex items-center gap-x-4">
                <button className="hover:scale-110">
                  <img src={product?.data.image} />
                </button>
                <button className="hover:scale-110">
                  <img src={product?.data.image} />
                </button>
                <button className="hover:scale-110">
                  <img src={product?.data.image} />
                </button>
                <button className="hover:scale-110">
                  <img src={product?.data.image} />
                </button>
              </div>
            </div>
          </div>
          {/*desktop: right, mobile : row 2 */}
          <div className="h-full w-full *:w-full lg:mt-0 mb:mt-[42px]">
            <div className="flex flex-col lg:gap-y-5">
              {/* row 1 */}
              <div className="lg:h-[211px] flex flex-col lg:gap-y-4">
                <span className="text-[#9D9EA2] font-bold lg:text-sm mb:text-xs lg:tracking-[4px] mb:tracking-[2px]">
                  Thông tin sản phẩm
                </span>
                <strong className="lg:text-[40px] lg:mt-[1px] mb:mt-3.5 mb:text-[20px] lg:tracking-[-1.2px] font-bold lg:leading-[38.4px]">
                  {product?.data?.name}
                </strong>
                <div className="*:bg-[#F2F6F4] *:lg:rounded-lg *:lg:px-4 *:lg:py-2.5 *:text-[#05422C] flex items-center lg:gap-x-4 *:text-xs lg:my-0 mb:mt-3 mb:mb-2 *:mb:px-2.5 *:mb:py-[5.5px] mb:gap-2 *:mb:rounded">
                  {/* {productCategories.map((categoryId: string) => {
                    const category = categoryOptions.find(
                      (option: { value: string | number; label: string }) =>
                        option.value === categoryId
                    );
                    return category ? (
                      <Button
                        style={{ padding: "4px 8px", borderRadius: "4px" }}
                        key={category.value}
                      >
                        {category.label}
                      </Button>
                    ) : null;
                  })} */}
                </div>
                <div className="flex lg:items-center mb:items-end justify-between">
                  <span className="font-medium text-[#EB2606] lg:text-xl lg:tracking-[0.7px] mb:text-base flex flex-col items-center lg:gap-x-3 lg:mt-0.5 mb:gap-x-2">
                    <del
                      className="font-bold lg:text-sm mb:text-sm text-[#9D9EA2] mr-12"
                      style={{ fontSize: "1rem" }}
                    >
                      {product?.data?.price} VNĐ
                    </del>
                    <div
                      className="mt-2 font-bold"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {product?.data?.discount} VNĐ
                    </div>
                  </span>
                  <section className="lg:w-[163px] mb:w-[157px] mb:mt-[8px] lg:mt-0 h-[21px] *:lg:text-sm *:mb:text-xs flex justify-between items-start">
                    <div className="flex items-start lg:gap-x-0 mb:gap-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <strong>4.6/5</strong>
                    </div>
                    <div className="flex gap-x-2">
                      <strong>135</strong>
                      <span className="text-[#C8C9CB]">Reviews</span>
                    </div>
                  </section>
                </div>
              </div>
              {/* row 2 */}

              {/* row 3 */}
              <div className="flex flex-col lg:gap-y-3 mb:gap-y-2 lg:mt-[2px] mt-[3px] lg:pb-0 mb:pb-[21px]">
                <span className="text-xl tracking-[1px] text-black font-bold">
                  Mô tả sản phẩm
                </span>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#46494F",
                    whiteSpace: "pre-wrap", // Giữ nguyên khoảng cách và xuống dòng theo định dạng gốc
                  }}
                  className="font-bold"
                >
                  {product?.data.description}
                </p>
              </div>
              {/* row 4 */}
              <div className="flex flex-col lg:gap-y-[22px] border-t lg:mt-[5px] lg:py-5 mb:py-6"></div>
              {/* row 5 */}
              <div className="lg:p-6 mb:py-5 mb:px-5 rounded-lg *:w-full border rounded-xl lg:-mt-5 -mt-1">
                {/* price */}

                {/* quantity */}
                <div className="py-5 flex lg:flex-row mb:flex-col lg:gap-y-0 gap-y-[17px] justify-between lg:items-center mb:items-start border-y lg:mt-[22px]">
                  <div className="border lg:py-2.5 lg:pr-6 lg:pl-4 mb:py-1 mb:pl-2 mb:pr-[18px] *:text-xs flex items-center gap-x-3 rounded-xl">
                    <div className="flex items-center *:w-9 *:h-9 gap-x-1 *:grid *:place-items-center">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-minus"
                        >
                          <path d="M5 12h14" />
                        </svg>
                      </button>
                      <div className="bg-[#F4F4F4]">2</div>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-plus"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                      </button>
                    </div>
                    |
                    <span className="text-[#17AF26] lg:tracking-[0.5px] font-bold">
                      Trong kho: {product?.data.countInStock}
                    </span>
                  </div>
                  {/* add cart */}
                  {/* <Button
                    className="bg-[#F8E81C] border-none w-full lg:py-4 mb:py-3 text-lg font-bold text-[#051C2C]"
                    onClick={addToCart}
                  >
                    Thêm vào giỏ hàng
                  </Button> */}

                  <button className="lg:text-base mb:text-sm font-bold flex place-items-center gap-x-4 text-white bg-[#17AF26] rounded-[100px] lg:px-[30px] mb:px-[22px] lg:h-14 mb:h-12">
                    <NavLink to={`/cart`}>
                      <span>Thêm vào giỏ hàng</span>
                      {/* | <span>$242.00</span> */}
                    </NavLink>
                  </button>
                </div>
                {/* service , voucher */}
                <section className="flex lg:mt-0 mt-0.5 flex-col pt-[23px] gap-y-[13px] *:flex *:items-center *:gap-x-2 *:lg:text-sm *:mb:text-xs *:text-[#46494F] font-bold">
                  <span>
                    <CarOutlined />
                    Miễn phí vận chuyển nhanh cho đơn hàng trên{" "}
                    <p className="text-[#F2BC1B]">250.000 VNĐ</p>
                  </span>
                  <span>
                    <ClockCircleOutlined />
                    Đặt hàng trước 12:00pm để được gửi trong cùng ngày
                  </span>
                  <span>
                    <CustomerServiceOutlined />
                    Hỗ trợ & đặt hàng mở cửa 7 ngày trong tuần
                  </span>
                </section>
              </div>
              {/* different */}
              <div className="grid justify-between lg:gap-y-0 mb:gap-y-4 lg:text-sm mb:text-xs *:flex border-t lg:pt-6 lg:mt-0 mb:pt-[18px] mb:mt-5 mb:grid-cols-full">
                <span className="font-light text-[#717378] lg:gap-x-[50px] mb:gap-x-10">
                  Danh mục{" "}
                  <p className="text-[#17AF26] font-normal flex items-center space-x-2">
                    :&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    {productCategories.map((categoryId: string) => {
                      const category = categoryOptions.find(
                        (option: { value: string | number; label: string }) =>
                          option.value === categoryId
                      );
                      return category ? (
                        <span key={category.value}>{category.label}</span>
                      ) : null;
                    })}
                  </p>
                </span>
              </div>
            </div>
            {/* description */}
            <div className="flex flex-col border-t lg:py-10 lg:mt-10 mb:py-[34px] mb:mt-8"></div>
          </div>
        </div>
        {/* featured products */}
        <div className="lg:mt-6 mb:-mt-1 lg:pt-[58px] mb:pt-[34px]">
          <span className="lg:text-2xl text-2xl lg:tracking-[-0.5px] font-bold">
            SẢN PHẨM TƯƠNG TỰ
          </span>

          <Swiper spaceBetween={50} slidesPerView={4}>
            {products?.data?.data
              ?.slice(0, 4)
              .map((product: any, index: number) => (
                <SwiperSlide key={index}>
                  <ProductItems product={product} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </main>
    </>
  );
};

export default ProductDetailPage;
