"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";


const AboutSection = () => {


  return (
    <section className="about-sec common-padd">
        <div className="container">
            <div className="row align-items-center gap-4 gap-lg-0">
                <div className="col-lg-4">
                    <div className="left-box">
                        <h2 className="fs-3">About Cholan Tours</h2>
                        <Link href="/contact-us" className="btn blue-btn">
                           Contact us
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
                <div className="col-lg-8">
                    <div className="right-box">
                        <p>
                            {`Cholan Tours is one of India’s leading ISO 9001:2015 certified Destination Management Companies (DMC), recognized by the Ministry of Tourism, Government of India. With a dedicated team of over 200 professionals, the company delivers reliable, technology-driven travel solutions that ensure quality and customer satisfaction. Post-pandemic, Cholan Tours continues to expand rapidly, offering comprehensive travel services and sustainable tourism experiences across India and international destinations.`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default AboutSection;
