import ProductList from "../_components/ProductList";
import Banner from "./_components/Banner";
import Services from "./_components/Services";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
import ProductItems from "../_components/ProductItems";

type Props = {};

const HomePage = (props: Props) => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => instance.get("/products"),
  });
  return (
    <>
      <div>
        <Banner />
        <Services />
        {/*best dispensary*/}
        <div className="w-full text-center lg:py-[30px] mb:pt-16 mb:pb-[42px]">
          {/* menu service */}
          <div className="w-full flex justify-center lg:my-[62px] mb:mt-8">
            <h1 className="text-black font-bold lg:ml-4 mb:ml-0 lg:text-[40px]">
              SẢN PHẨM BÁN CHẠY
            </h1>
          </div>
          {/* products best seler  */}
          <div className="w-full relative flex sm:flex-row mb:flex-col mb:items-center justify-center lg:my-16 mb:my-[22px] mb:overflow-x-auto hidden_scroll_x">
            <div className="lg:w-[1440px] flex justify-end *:lg:h-[568px] *:sm:h-[350px] overflow-hidden">
              <div
                className="grid sm:gap-x-[32px] mb:w-[342px] sm:w-[95vw] mb:gap-y-10 sm:gap-y-0 sm:grid-cols-[379px_auto] mb:flex-col items-center 
  lg:w-[1348px] rounded-xl lg:translate-x-[28px]"
              >
                {/* banner */}
                <div
                  className="sm:w-full mb:w-[342px] md:mt-0 mb:mt-[18px] lg:rounded-xl mb:rounded-2xl lg:h-full sm:h-[350px] mb:h-[395px] border bg-[#05422C] flex flex-col 
      items-center justify-center gap-y-6"
                >
                  <img
                    src="https://statics.pancake.vn/web-media/5d/5c/5b/42/ed8cb2e38d8babe95d65592537d1ab508d386f992d9c24b999ea9d11.jpg"
                    className="lg:w-[270px] lg:h-[300px] mb:w-[151px] mb:h-[151px]"
                    alt=""
                  />
                  <div className="h-[163px] flex flex-col justify-between">
                    <strong className="text-white text-xl font-medium">
                      Mua sản phẩm bán chạy
                    </strong>
                    <p className="w-[216px] text-[14px] leading-[21px] opacity-60 text-white font-light -translate-y-[5px] mt-5">
                      Khám phá những sản phẩm bán chạy nhất của chúng tôi với
                      chất lượng hàng đầu và giá cả hợp lý. Đừng bỏ lỡ cơ hội để
                      sở hữu những sản phẩm yêu thích của bạn.
                    </p>
                    <a className="text-[#17AF26] text-sm underline" href="">
                      Xem tất cả
                    </a>
                  </div>
                </div>
                {/* product desktop */}
                <div className="mb:hidden sm:block h-full overflow-x-auto hidden_scroll_x">
                  {/* <div className="grid grid-flow-col auto-cols-[291px] *:w-full h-full gap-x-[32px] md:h-[568px]">
                  
                    <div className="flex flex-col justify-between overflow-hidden h-full rounded-xl">
                    </div>

                    <div className="flex flex-col justify-between overflow-hidden h-full rounded-xl">
                    </div>

                    <div className="flex flex-col justify-between overflow-hidden h-full rounded-xl">
                        
                    </div>

                    <div className="flex flex-col justify-between overflow-hidden h-full rounded-xl">
                    </div>

                  </div>     */}
                  <Swiper spaceBetween={50} slidesPerView={3}>
                    {products?.data?.data
                      ?.slice(0, 4)
                      .map((product: any, index: number) => (
                        <SwiperSlide key={index}>
                          <ProductItems product={product} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
            </div>

            {/* products mobile */}

            {/* back, next */}
            <div className="absolute lg:w-[52%] mb:w-[76%] lg:top-1/2 mb:top-[62.2%] lg:left-1/2 lg:-translate-x-[24%] mb:top-[20%] lg:-translate-y-[270%] flex justify-between *:shadow-2xl *:w-9 *:h-9 *:grid *:place-items-center *:rounded-[50%] *:bg-white">
              {/* <button className="hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button> */}
              {/* <button className="hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button> */}
            </div>
          </div>
          {/* ---- */}
        </div>

        {/* <div className="w-full flex justify-center lg:mt-[118px] mb:mt-[77.5px]">
          <div className="lg:w-[1200px] mb:w-[342px] flex flex-col">
           
            <div className="lg:w-[789px] flex flex-col">
              <strong className="lg:text-[64px] mb:text-[32px] lg:leading-[70px] mb:leading-[38px] lg:tracking-[-4.6px] mb:tracking-[-1.8px]">
                WHAT MAKES US THE <br className="lg:hidden" />{" "}
                <strong className="text-[#F2BC1B]">#1</strong> ONLINE MARIJUANA
                DISPENSARY IN CANADA?
              </strong>
              <p className="text-[#717378] lg:my-6 lg:text-base mb:text-[14px] my-4">
                When it comes to what makes us the foremost online marijuana
                dispensary in Canada, we could wax lyrical about our positive
                qualities. Instead, to make this information clearer, we’ve
                highlighted the six prioritized features that we feel makes us a
                cut above the rest.
              </p>
            </div>
       
            <div className="w-full lg:mt-10 mb:mt-4 lg:grid mb:flex mb:flex-col lg:grid-cols-[379px_379px_379px] lg:justify-between lg:gap-y-10 *:mb:mb-6 *:lg:mb-0">
             
              <div className="lg:order-none order-1">
                <div className="flex flex-col lg:gap-y-8 mb:gap-y-1.5 justify-between lg:p-[32px] mb:px-3.5 mb:pb-3.5 rounded-xl border">
                  <img
                    className="w-[56px] py-[18px] lg:translate-y-0 translate-y-[3px] px-1 h-[80px]"
                    src="../Images/cskh_icon.png"
                    alt=""
                  />
                  <div className="flex flex-col gap-y-6">
                    <span className="font-medium lg:text-2xl mb:text-lg lg:tracking-[-0.5px]">
                      CUSTOMER SERVICE
                    </span>
                    <p className="text-[#717378] lg:-mt-1.5 -mt-[6.5px] lg:text-[14px] mb:text-[12px]">
                      Whether it is answering any questions you have before
                      making a purchase, helping out with the buying process
                      itself or taking your feedback under consideration, we are
                      proud to provide high quality customer service that makes
                      you – the customer – the most important person in the
                      transaction.
                    </p>
                  </div>
                </div>
              </div>
             
              <div className="lg:order-none order-2">
                <div className="flex flex-col lg:gap-y-8 mb:gap-y-1.5 justify-between lg:p-[32px] mb:px-3.5 mb:pb-3.5 rounded-xl border">
                  <img
                    className="w-[56px] py-[15px] lg:translate-y-0 translate-y-[3px] px-1 h-[80px]"
                    src="../Images/cskh_icon_1.png"
                    alt=""
                  />
                  <div className="flex flex-col gap-y-6">
                    <span className="font-medium lg:text-2xl mb:text-lg">
                      SECURITY
                    </span>
                    <p className="text-[#717378] lg:-mt-1.5 mb:tracking-[0.08px] -mt-[7px] lg:text-[14px] mb:text-[12px]">
                      When it comes to security, we only keep what details are
                      necessary for you to have an account with us and make an
                      order. When it comes to shipping your mail order marijuana
                      out, we use only tamper-proof and discrete packaging so
                      then what you’ve purchased is your business only.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="lg:order-none order-4">
                <div className="flex flex-col lg:gap-y-8 mb:gap-y-1.5 justify-between lg:p-[32px] mb:px-4 mb:pb-3.5 rounded-xl border">
                  <img
                    className="lg:w-[56px] mb:w-[62px] lg:translate-y-0 lg:translate-x-0 -translate-x-1 translate-y-0.5 py-4 px-1 h-[80px]"
                    src="../Images/cskh_icon_2.png"
                    alt=""
                  />
                  <div className="flex flex-col gap-y-6">
                    <span className="font-medium lg:text-2xl mb:text-lg">
                      BEST VALUE
                    </span>
                    <p className="text-[#717378] lg:-mt-1.5 -mt-[6.8px] lg:text-[14px] mb:text-[12px]">
                      We are continually adjusting what we supply and our prices
                      to ensure that we maintain an optimal balance of
                      affordable and quality for our products. We invest in the
                      best quality strains that we can find and are always on
                      the lookout for new, affordable and high quality weed
                      products.
                    </p>
                  </div>
                </div>
              </div>
             
              <div className="lg:order-none order-3">
                <div className="flex flex-col lg:gap-y-8 mb:gap-y-[2.5px] justify-between lg:pt-[32px] lg:px-[32px] lg:pb-[95px] mb:px-4 mb:pb-3.5 rounded-xl border">
                  <img
                    className="w-[56px] py-4 lg:translate-x-0 translate-x-[-2px] px-1 h-[80px]"
                    src="../Images/cskh_icon_3.png"
                    alt=""
                  />
                  <div className="flex flex-col gap-y-6">
                    <span className="font-medium lg:text-[24px] lg:tracking-[-0.5px] mb:text-lg  mt-1">
                      DELIVERY INSURANCE
                    </span>
                    <p className="text-[#717378] lg:-mt-1 -mt-[6.7px] lg:text-[14px] mb:text-[12px]">
                      If your mail order marijuana becomes lost, stolen, or
                      damaged during transit, we will send you a replacement
                      completely free of charge. Free Canada Post Xpress
                      shipping on all orders over $120
                    </p>
                  </div>
                </div>
              </div>
            
              <div className="lg:order-none order-6">
                <div className="flex flex-col lg:gap-y-8 mb:gap-y-[2px] justify-between lg:p-[32px] mb:px-4 mb:pb-3.5 rounded-xl border">
                  <img
                    className="w-[56px] py-4 px-1 lg:translatet-y-0 translate-y-0.5 h-[80px]"
                    src="../Images/cskh_icon_4.png"
                    alt=""
                  />
                  <div className="flex flex-col gap-y-6">
                    <span className="font-medium lg:text-[24px] lg:tracking-[-0.5px] mb:text-lg mt-1">
                      HIGHEST QUALITY
                    </span>
                    <p className="text-[#717378] lg:-mt-1 -mt-1.5 lg:text-[14px] mb:text-[12px]">
                      All of our cannabis products are tested to ensure that
                      they are the highest quality possible. We work with expert
                      suppliers and are always revising what makes a quality
                      cannabis product to ensure that we have only the best
                      available.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="lg:order-none order-5">
                <div className="flex flex-col lg:gap-y-8 mb:gap-y-[2.5px] justify-between lg:pt-[32px] lg:px-[32px] lg:pb-[95px] mb:px-4 mb:pb-3.5 border rounded-xl">
                  <img
                    className="w-[56px] lg:py-4 py-5 lg:translate-y-0 translate-y-1 px-1 h-[80px]"
                    src="../Images/cskh_icon_5.png"
                    alt=""
                  />
                  <div className="flex flex-col gap-y-6">
                    <span className="font-medium lg:tracking-[-0.5px] mt-1 lg:text-[24px] mb:text-lg">
                      TRUST
                    </span>
                    <p className="text-[#717378] lg:-mt-1 -mt-2 lg:text-[14px] mb:text-[12px]">
                      With over 15 years in the weed business, you can rest
                      assured that you will be taken care of. You can guarantee
                      that we have your best interests in mind. Feel free to
                      check out our reviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* RECENTY */}
        <div className="lg:w-[1200px] mx-auto sm:w-[95vw] mb:w-[342px] flex flex-col lg:mt-[20.5px] lg:pt-24 mb:pt-[39px]">
          <strong className="lg:text-[35px] mb:text-[32px] lg:leading-[70px] mb:leading-[40px] lg:tracking-[-3px] mb:tracking-[-1.8px] ">
            HÀNG MỚI
          </strong>
          <div className="mb:hidden sm:block h-full overflow-x-auto hidden_scroll_x">
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
        </div>

        <div className="lg:w-[1200px] mx-auto sm:w-[95vw] mb:w-[342px] flex flex-col lg:mt-[20.5px] lg:pt-24 mb:pt-[39px]">
          <strong className="lg:text-[35px] mb:text-[32px] lg:leading-[70px] mb:leading-[40px] lg:tracking-[-3px] mb:tracking-[-1.8px]">
            DRAGON BALL
          </strong>
          <div className="mb:hidden sm:block h-full overflow-x-auto hidden_scroll_x">
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
        </div>

        <div className="lg:w-[1200px] mx-auto sm:w-[95vw] mb:w-[342px] flex flex-col lg:mt-[20.5px] lg:pt-24 mb:pt-[39px]">
          <strong className="lg:text-[35px] mb:text-[32px] lg:leading-[70px] mb:leading-[40px] lg:tracking-[-3px] mb:tracking-[-1.8px]">
            ONE PIECE
          </strong>
          <div className="mb:hidden sm:block h-full overflow-x-auto hidden_scroll_x">
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
        </div>

        <div className="lg:w-[1200px] mx-auto sm:w-[95vw] mb:w-[342px] flex flex-col lg:mt-[20.5px] lg:pt-24 mb:pt-[39px]">
          <strong className="lg:text-[35px] mb:text-[32px] lg:leading-[70px] mb:leading-[40px] lg:tracking-[-3px] mb:tracking-[-1.8px]">
            NARUTO
          </strong>
          <div className="mb:hidden sm:block h-full overflow-x-auto hidden_scroll_x">
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
        </div>

        <div className="lg:w-[1200px] mx-auto sm:w-[95vw] mb:w-[342px] flex flex-col lg:mt-[20.5px] lg:pt-24 mb:pt-[39px] mb-20">
          <strong className="lg:text-[45px] mb:text-[32px] lg:leading-[70px] mb:leading-[40px] lg:tracking-[-3px] mb:tracking-[-1.8px]">
            TRANSFORMER
          </strong>
          <div className="mb:hidden sm:block h-full overflow-x-auto hidden_scroll_x">
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
        </div>

        {/* WEED EDUCATION */}
        {/* <div className="w-full bg-[#F4F4F4] lg:pb-[300px] lg:pt-16 mb:pt-[50px] mb:pb-[236.5px] flex justify-center lg:mt-[100px]">
          <div className="lg:w-[1200px] mb:w-[342px] pt-20">
            <div className="lg:mb-8 mb:mb-6 flex justify-between items-center">
              <strong className="lg:text-[32px] mb:text-2xl lg:tracking-[-1.7px] tracking-[-1.05px]">
                WEED EDUCATION
              </strong>
              <a className="text-base text-[#17AF26]  underline lg:tracking-[-0.5px] tracking-[-0.8px]">
                Show All
              </a>
            </div>
            <div className="w-full lg:pt-[66px] lg:-mt-0.5 mb:mt-14 lg:gap-y-0 gap-y-[23px] border-t grid lg:grid-cols-[379px_379px_379px] lg:justify-between *:rounded-xl">
            
              <div className="flex flex-col">
                <img
                  className="w-full h-[240px] border-none bg-[#F2F6F4]"
                  src="../Images/web_edu_1.png"
                  alt=""
                />
                <div>
                  <span className="block text-sm text-[#717378] font-light mt-6">
                    January 24, 2023
                  </span>
                  <h4 className="text-[24px] text-[#1A1E26] -tracking-[0.5px] font-medium mt-2.5 mb-2">
                    12 Mistakes To Avoid When Buying Cannabis Online
                  </h4>
                  <p className="text-[16px] leading-[24px] text-[#717378] mb-8">
                    Buying cannabis online can be a great way to get your hands
                    on the products you need without leaving the comfort of your
                    home. But …
                  </p>
                  <a href="" className="text-[#17AF26] underline">
                    Read More
                  </a>
                </div>
              </div>
             
              <div className="flex flex-col">
                <img
                  className="w-full border-none h-[240px] bg-[#F2F6F4]"
                  src="../Images/web_edu_2.png"
                  alt=""
                />
                <div>
                  <span className="block text-sm text-[#717378] font-light mt-6">
                    January 24, 2023
                  </span>
                  <h4 className="text-[24px] text-[#1A1E26] -tracking-[0.5px] font-medium mt-2.5 mb-2">
                    How To Store Cannabis and <br className="hidden lg:block" />{" "}
                    Keep it Fresh and Potent?
                  </h4>
                  <p className="text-[16px] leading-[24px] text-[#717378] mb-8">
                    Cannabis packaging has advanced dramatically in recent
                    years, whether your state has a medicinal marijuana
                    programme, legal adult-use weed, or both. Most ...
                  </p>
                  <a href="" className="text-[#17AF26] underline">
                    Read More
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col">
                <img
                  className="w-full border-none h-[240px] bg-[#F2F6F4]"
                  src="../Images/web_edu_3.png"
                  alt=""
                />
                <div>
                  <span className="block text-sm text-[#717378] font-light mt-6">
                    January 19, 2023
                  </span>
                  <h4 className="text-[24px] text-[#1A1E26] -tracking-[0.5px] font-medium mt-2.5 mb-2">
                    The Ultimate Guide to Checking the Quality of Cannabis - 10
                    Industry Leading Tips
                  </h4>
                  <p className="text-[16px] leading-[24px] text-[#717378] mb-8">
                    Quality cannabis is a term used to describe cannabis
                    products that meet specific standards of excellence. It is
                    essential to understand what quality cannabis means, …
                  </p>
                  <a href="" className="text-[#17AF26] underline">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* END WEED EDUCATION */}
        {/* FOOTER */}
      </div>
    </>
  );
};

export default HomePage;
