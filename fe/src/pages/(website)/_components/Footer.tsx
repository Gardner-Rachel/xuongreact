import {
  FacebookFilled,
  FacebookOutlined,
  TwitterOutlined,
  XOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

type Props = {};

const Footer = (props: Props) => {
    const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining location: ", error);
        }
      );
    }
  }, []);
  return (
    <>
      <footer className="w-full lg:-mt-1 bg-gradient-to-b from-[#1A1E26] to-[#01100B]">
        <div className="relative lg:pt-[100px] mb:pt-[271px] lg:w-[1200px] mb:w-[342px] mx-auto">
          <div className="flex lg:flex-row mb:flex-col lg:gap-x-16 lg:gap-y-0 gap-y-8 *:w-full">
            <div className="lg:w-[385px]">
              <img
                className="w-[173px] h-[42px]"
                src="../../../../public/logo.svg"
                alt=""
              />
              <p className="text-[#9D9EA2] mt-6 font-normal lg:w-full w-[276px]">
                Cửa hàng trực tuyến bán mô hình hàng đầu tại Việt Nam, đáp ứng
                mọi nhu cầu của khách hàng đam mê mô hình. Với hơn 15 năm kinh
                nghiệm trong ngành, đội ngũ của Logoipsum cam kết mang đến
                những sản phẩm mô hình chất lượng cao, dịch vụ tận tâm và giá cả
                cạnh tranh nhất. Chúng tôi luôn nỗ lực để trở thành địa chỉ tin
                cậy cho các tín đồ mô hình tại Việt Nam, nơi bạn có thể tìm thấy
                mọi thứ từ các bộ mô hình lắp ráp phức tạp đến những mô hình sưu
                tầm độc đáo.
              </p>
            </div>
            <div className="lg:pl-[77px]">
              <div className="lg:mb-[27px] mb-[25px]">
                <h2 className="text-xl text-white tracking-[0.2px] uppercase translate-y-[2px] mb-[24px]">
                  THÔNG TIN LIÊN HỆ
                </h2>
                <ul className="columns-2 *:lg:mb-[13px] *:mb-[13.5px] gap-x-8">
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Địa chỉ: 146A Phan Văn Trị, phường 12, quận Bình Thạnh,
                      TP.HCM
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Zalo (vui lòng nhắn tin): 0938 100 525
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Email: takishop2012@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Thời gian làm việc: Tất cả các ngày trong tuần / 9:00 AM -
                      5:00 PM
                    </a>
                  </li>
                  <div className="mb:hidden lg:block ">
                    <div className="flex gap-x-4 mt-[25px]">
                      <FacebookOutlined className="text-4xl text-blue-600" />
                      <XOutlined className="text-4xl text-blue-600" />
                      <YoutubeOutlined className="text-4xl text-red-600" />
                    </div>
                  </div>
                </ul>
              </div>

              <div className="lg:mb-[27px] mb-[25px]">
                <h2 className="text-xl text-white tracking-[0.2px] uppercase translate-y-[2px] mb-[24px]">
                  CHÍNH SÁCH
                </h2>
                <ul className="columns-2 *:lg:mb-[13px] *:mb-[13.5px] gap-x-8">
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Giới thiệu
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Chính sách Đại Lý - CTV
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Hướng dẫn đặt hàng
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Kiểm tra đơn hàng
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Chính sách bảo mật thông tin
                    </a>
                  </li>
                </ul>
              </div>

              <div className="lg:mb-[27px] mb-[25px]">
                <h2 className="text-xl text-white tracking-[0.2px] uppercase translate-y-[2px] mb-[24px]">
                  HỖ TRỢ
                </h2>
                <ul className="columns-2 *:lg:mb-[13px] *:mb-[13.5px] gap-x-8">
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Hướng dẫn mua hàng
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Hướng dẫn thanh toán
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Hướng dẫn giao nhận
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-[#9D9EA2] text-sm">
                      Điều khoản dịch vụ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:justify-between border-[#46494F] border-t pt-10 pb-8 ">
            <p className="order-2 lg:order-1 text-[#9D9EA2] text-base">
              Logoipsum © Copyright 2024. All Rights Reserved.
            </p>
            {location.lat && location.lng && (
                <p className="order-1 lg:order-2 text-[#9D9EA2] text-base">
                Vị trí hiện tại của bạn: {location.lat}, {location.lng} 
              </p>
            )}
           
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
