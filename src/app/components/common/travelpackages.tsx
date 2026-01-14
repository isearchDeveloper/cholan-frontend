



'use client';

import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Link from 'next/link';

export default function TravelPackages({ internationalData }: any) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  if (!internationalData || internationalData.length === 0) return null;

  const leftColumn = internationalData.slice(0, 3); // 1 large + 2 small
  const middleColumn = internationalData[3];        // 1 tall card
  const rightColumn = internationalData.slice(4, 6); // 2 cards

  const renderCard = (item: any, isFullWidth: boolean = true, height = 'h-56') => (
    
    <Link href={`/packages/${item.slug}`} key={item.slug}>
      <div className={`position-relative overflow-hidden custom-hover rounded ${height} flex items-stretch`}>
        <Image
          src={item.primary_image || "/images/no-img.webp" }
          alt={item.primary_image_alt }
          width={400}
          height={300}
          className="rounded-4 w-100 h-full object-cover transition-all duration-500 hover:scale-110 hover:brightness-90"
        />
        <div className="rounded-4 banner-overlay absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
          <div>
            <h5 className="text-white text-left text-base">{item.title}</h5>
            <h6 className="text-white text-left text-sm">{item.details.duration_days} Nights / {item.details.duration_days} days</h6>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="deals-packages bg-gray-100 py-5">
      <div className="container">
        <h2 className="color-blue text-center mb-4">Deals You Can't Miss</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">

          {/* Column 1 */}
          <div className="col-lg-5">
            <div className="row g-4">
              {leftColumn[0] && (
                <div className="col-lg-12">
                  {renderCard(leftColumn[0])}
                </div>
              )}
              {leftColumn.slice(1).map((item: any) => (
                <div className="col-lg-6" key={item.slug}>
                  {renderCard(item)}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-lg-3">
            {middleColumn && renderCard(middleColumn, true, 'h-100')}
          </div>

          {/* Column 3 */}
          <div className="col-lg-4">
            <div className="row g-4">
              {rightColumn.map((item: any) => (
                <div className="col-lg-12" key={item.slug}>
                  {renderCard(item)}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
