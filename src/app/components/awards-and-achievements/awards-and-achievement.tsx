import React from "react";
import Breadcrumb from "../common/Breadcrumb";
import AwardsTimeline from "../about/AwardsTimeline";
import StaticTimeline from "../about/AwardsTimeline";

interface CMSMeta {
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    h1_heading?: string;
    meta_details?: string;
}

interface CMSDetails {
    title?: string;
    slug?: string;
    banner_image?: string;
    banner_image_alt?: string;
    short_description?: string | null;
    description?: string;
    meta?: CMSMeta;
}

interface AwardItem {
    title?: string;
    award_year?: number;
    description?: string;
    banner_image?: string;
}

interface Props {
    details: CMSDetails;
    awards: AwardItem[];
}


const staticBreadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Awards & Achievements", isCurrent: true },
];

export default function AwardsAchievement({ details, awards }: Props) {
    if (!details) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <p className="text-secondary fs-5">
                    Content not available at the moment.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* ✅ Banner Section */}
            <section
                className="banner py-5 text-white"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.2)), url('${details.banner_image || "/images/banner.jpg"
                        }')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
                aria-label={details.banner_image_alt || details.title || "Banner image"}
            >
                <img
                    src={details.banner_image || "/images/banner.jpg"}
                    alt={details.banner_image_alt || "Awards Banner"}
                    className="d-none"
                />
            </section>

            {/* ✅ Content Section */}
            <section className="pb-5 pt-4">
                <div className="container ">
                    <Breadcrumb items={staticBreadcrumbItems} />

                    <div className="border-0 card">
                        <div className="pb-0">
                            <h1 className="fs-2 mb-3">
                                {details.title || "Awards & Achievements"}
                            </h1>

                            {details?.short_description && (
                                <div
                                    className="text-muted"
                                    dangerouslySetInnerHTML={{
                                        __html: details.short_description || "",
                                    }}
                                />
                            )}

                            {/* ✅ Description */}
                            {details?.description && (
                                <div
                                    className="mt-4"
                                    dangerouslySetInnerHTML={{
                                        __html: details.description,
                                    }}
                                />
                            )}

                            {/* ✅ Example: Use Awards Data */}
                            {awards && (
                                <div className="mt-5">
                                    <StaticTimeline data={awards} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
