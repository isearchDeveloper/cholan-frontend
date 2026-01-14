import React from 'react';
import Image from 'next/image';

const CholanBusRental: React.FC = () => {
    return (
        <div className="container">
            <h3 className="color-blue text-center mb-4">Why Choose Cholan Bus Rental?</h3>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="  h-100 text-center">
                        <div className="icon car mx-auto mb-3">
                              <Image
                                width={60}
                                height={60}
                                sizes="100vw"
                                src="/images/cholan-icon.svg"
                                alt="/images/no-img.webp"
                               
                            />
                        </div>
                        <h5 className="fw-semibold">Best Fleet of Buses</h5>
                        <p>We have a wide range of vehicles, suitable for many different traveling options.</p>
                    </div>
                </div>
                <div className="col">
                    <div className="  h-100 text-center">
                        <div className="icon driver mx-auto mb-3">
                            <Image
                                width={60}
                                height={60}
                                sizes="100vw"
                                src="/images/cholan-icon.svg"
                                alt="/images/no-img.webp"
                               
                            />
                        </div>
                        <h5 className="fw-semibold">Experienced Drivers</h5>
                        <p>A team of highly trained & motivated drivers. Most are fluent in English.</p>
                    </div>
                </div>
                <div className="col">
                    <div className="  h-100 text-center">
                        <div className="icon support mx-auto mb-3">
                              <Image
                                width={60}
                                height={60}
                                sizes="100vw"
                                src="/images/cholan-icon.svg"
                                alt="/images/no-img.webp"
                               
                            />
                        </div>
                        <h5 className="fw-semibold">Excellent Customer Support</h5>
                        <p>Our team will be happy to help you before and onwards your journey.</p>
                    </div>
                </div>
                <div className="col">
                    <div className="  h-100 text-center">
                        <div className="icon pricing mx-auto mb-3">
                              <Image
                                width={60}
                                height={60}
                                sizes="100vw"
                                src="/images/cholan-icon.svg"
                                alt="/images/no-img.webp"
                               
                            />
                        </div>
                        <h5 className="fw-semibold">Honest Pricing</h5>
                        <p>With us you will be absolutely clear before you book and pay for your trip exactly what is included.</p>
                    </div>
                </div>
                <div className="col">
                    <div className="  h-100 text-center">
                        <div className="icon booking mx-auto mb-3">
                              <Image
                                width={60}
                                height={60}
                                sizes="100vw"
                                src="/images/cholan-icon.svg"
                                alt="/images/no-img.webp"
                               
                            />
                        </div>
                        <h5 className="fw-semibold">Quick & Easy Booking</h5>
                        <p>Just fill a small form & our team will contact you with great options to choose from.</p>
                    </div>
                </div>
                <div className="col">
                    <div className="  h-100 text-center">
                        <div className="icon travel mx-auto mb-3">
                              <Image
                                width={60}
                                height={60}
                                sizes="100vw"
                                src="/images/cholan-icon.svg"
                                alt="/images/no-img.webp"
                               
                            />
                        </div>
                        <h5 className="fw-semibold">Hassle Free Travel</h5>
                        <p>We do whatever it takes to make you hit the road smiling.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CholanBusRental;