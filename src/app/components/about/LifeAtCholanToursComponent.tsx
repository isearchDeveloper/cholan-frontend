'use client';

import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import React from 'react';
import { Link } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TravelPackages({ data, title }: any) {

  const router = useRouter();

  // ✅ Extract <img> src attributes from HTML string
  const imageRegex = /<img[^>]+src="([^">]+)"/g;
  const images: string[] = [];
  let match;
  while ((match = imageRegex.exec(data)) !== null) {
    images.push(match[1]);
  }

  // ✅ Extract the heading (h2)
  const headingMatch = data.match(/<h2[^>]*>(.*?)<\/h2>/);
  const heading = headingMatch ? headingMatch[1] : "Come, let's grow together!";

  // ✅ Extract the paragraph content (first <p> after <h2>)
  const paragraphMatch = data.match(/<h2[^>]*>.*?<\/h2>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/);
  const paragraph = paragraphMatch
    ? paragraphMatch[1].replace(/<\/?[^>]+(>|$)/g, '') // remove leftover tags
    : `Cholan Tours is the registered trade name of our business. We operate tours in India under TWO different brand names...`;

  // fallback if no images
  if (images.length === 0) {
    return <p className="text-center py-5">No images available</p>;
  }

  return (
    <div className="about-cholan pb-5 lifecholan-wrapper pt-5">
      <div className="container">
        <h2 className="color-blue text-center mb-4 fs-3">Life at Cholan Tours</h2>

        {/* ===== Mobile Swiper ===== */}
        <div className="d-block d-lg-none">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            className="mySwiper"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="position-relative overflow-hidden rounded h-64 flex custom-hover">
                  <Image
                    src={src}
                    alt={`image-${index}`}
                    width={400}
                    height={400}
                    className="rounded w-100 h-full object-cover transition-all duration-500 hover:scale-110 hover:brightness-90"
                  />
                </div>
              </SwiperSlide>
            ))}

            <div className="swiper-button-prev rounded-circle d-flex align-items-center justify-content-center"></div>
            <div className="swiper-button-next rounded-circle d-flex align-items-center justify-content-center"></div>
          </Swiper>
        </div>

        {/* ===== Desktop Layout ===== */}
        <div className="d-none d-lg-block">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {/* Column 1 */}
            <div className="col-lg-5">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="position-relative overflow-hidden rounded h-56 flex items-stretch custom-hover">
                    <Image
                      src={images[0] || '/images/placeholder.webp'}
                      alt="img"
                      width={400}
                      height={300}
                      className="rounded w-100 h-full object-cover transition-all duration-500 hover:scale-110 hover:brightness-90"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="position-relative overflow-hidden rounded h-56 flex items-stretch custom-hover">
                    <Image
                      src={images[1] || '/images/placeholder.webp'}
                      alt="img"
                      width={400}
                      height={300}
                      className="rounded w-100 h-full object-cover transition-all duration-500 hover:scale-110 hover:brightness-90"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="position-relative overflow-hidden rounded h-56 flex items-stretch custom-hover">
                    <Image
                      src={images[2] || '/images/placeholder.webp'}
                      alt="img"
                      width={400}
                      height={300}
                      className="rounded w-100 h-full object-cover transition-all duration-500 hover:scale-110 hover:brightness-90"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="col-lg-3">
              <div className="position-relative overflow-hidden rounded h-100 flex items-stretch custom-hover">
                <Image
                  src={images[3] || '/images/placeholder.webp'}
                  alt="img"
                  width={400}
                  height={300}
                  className="rounded w-100 h-full object-cover transition-all duration-500 hover:scale-110 hover:brightness-90"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-lg-4">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="position-relative overflow-hidden rounded h-56 flex items-stretch custom-hover">
                    <Image
                      src={images[4] || '/images/placeholder.webp'}
                      alt="img"
                      width={400}
                      height={300}
                      className="rounded w-100 h-full object-cover transition-all duration-500 hover:scale-110 hover:brightness-90"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="position-relative overflow-hidden rounded h-56 flex items-stretch custom-hover">
                    <Image
                      src={images[5] || '/images/placeholder.webp'}
                      alt="img"
                      width={400}
                      height={300}
                      className="rounded w-100 h-full object-cover transition-all duration-500 hover:scale-110 hover:brightness-90"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="btm-button mt-4 text-center">
            <button
              className="btn blue-btn"
              onClick={() => router.push('/our-team')}
            >
              Know More
              <span>
                <Image
                  width={23}
                  height={23}
                  sizes="100vw"
                  src="/images/button-arrow.png"
                  alt=""
                />
              </span>
            </button>

          </div>


        </div>

        {/* ===== Text Section (dynamic) ===== */}
        {/* <div className="row mt-5">
          <div className="col-12 text-center">
            <h2 className="mb-2 fs-3" dangerouslySetInnerHTML={{ __html: heading }}></h2>
            <p dangerouslySetInnerHTML={{ __html: paragraph }}></p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
