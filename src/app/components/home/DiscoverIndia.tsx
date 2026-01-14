"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { devImgPath } from "@/app/urls/imageUrl";
import { useRouter } from "next/navigation";

const DiscoverIndia = ({ discoverIndiaPackageData }: any) => {
  const router = useRouter();

  const setUrl = (slug: any, displaySlug: any) => {
    router.push(`/packages/${slug}`);
  };

  return (
    <section className="discover-india common-padd pb-0">
      <Image
        width={1920}
        height={600}
        sizes="100vw"
        src="/images/indiaget.jpg"
        alt=""
      />
      <div className="content-box">
        <div className="container">
          <div className="common-header-center">
            <h2 className="fs-3">Discover India</h2>
            <p>
              Over the last two decades, We’ve helped our customer to travel so
              rather than us singing our praises; we prefer to let our customers
              do the talking...{" "}
            </p>
          </div>
          <div className="discover-wraper">
            <div className="row gap-4 gap-md-0 gap-lg-0 g-md-4">
              {discoverIndiaPackageData?.map((discover: any) => (
                <div className="col-md-6 col-lg-3" key={discover?.slug}>
                  <div className="sngl-box">
                    <Link href={`/packages/${discover.slug}`}>
                      <div
                        className="image-box"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setUrl(discover.slug, discover.display_slug)
                        }
                      >
                        <Image
                          width={300}
                          height={400}
                          sizes="100vw"
                          className="custom-hover"
                          src={
                            `${
                              discover?.primary_image
                                ? discover?.primary_image
                                : "/images/no-img.webp"
                            }` || "/images/no-img.webp"
                          }
                          alt={discover.primary_image_alt}
                        />
                      </div>
                    </Link>
                    <div className="content-box-wraper">
                      <Link href={`/packages/${discover.slug}`}>
                        <h5
                          onClick={() =>
                            setUrl(discover.slug, discover.display_slug)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {discover.title}
                        </h5>
                      </Link>
                      <div className="content-box-wraper-content">
                        <p>
                          {(() => {
                            const raw = discover.short_description || "";
                            const noHtml = raw.replace(/<[^>]*>?/gm, "");
                            const decoded = noHtml
                              .replace(/&rsquo;/g, "'")
                              .replace(/&lsquo;/g, "'")
                              .replace(/&quot;/g, '"')
                              .replace(/&amp;/g, "&")
                              .replace(/&nbsp;/g, " ");

                            return decoded.length > 120
                              ? decoded.slice(0, 120) + "..."
                              : decoded;
                          })()}
                        </p>
                      </div>
                      <Link
                        href={`packages/${discover.slug}`}
                        className="btn blue-btn bg-transparent"
                      >
                        Find out More
                        <span>
                          <Image
                            width={23}
                            height={23}
                            sizes="100vw"
                            src="/images/button-arrow.png"
                            alt=""
                          />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverIndia;
