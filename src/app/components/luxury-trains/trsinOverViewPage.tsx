import Breadcrumb from "@/app/components/common/Breadcrumb";
import TrainBanner from "@/app/components/luxury-trains/trainBanner";
import TrainExpandableText from "@/app/components/luxury-trains/ExpandableText";
import TrainEnquiryFormClient from "./TrainEnquiryForm.client";
import TrainOtherClient from "./TrainOthers.client";

export default function TrainOverview({ trainOverviewData }: any) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Luxury Trains", href: "/luxury-trains" },
    { label: trainOverviewData?.data?.train?.title, isCurrent: true },
  ];

  return (
    <>
      {/* <ToastContainer /> */}
      <div className="train-wrapper">
        <TrainBanner data={trainOverviewData?.data.train?.primary_image} />
        <div className="pt-4 train-wrapper-iiner">
          <div className="container pb-5">
            <Breadcrumb items={breadcrumbItems} />
            <div className="row">
              <div className="col-lg-8">
                <div className="flex flex-col gap-4 mb-5">
                  <div className="train-overview-para ">
                    <h1 className="mb-2 fs-2">
                      {trainOverviewData?.data?.train?.title}{" "}
                    </h1>
                    <div className="text-sm">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            trainOverviewData?.data?.train?.short_description,
                        }}
                      />
                    </div>
                  </div>
                  {trainOverviewData?.data?.train?.long_description ? (

                    <div className="train-ex-para">
                      <h2 className="mb-2 fs-3">{`About ${trainOverviewData?.data?.train?.title}`}</h2>
                    
                      <TrainExpandableText
                        text={trainOverviewData?.data?.train?.long_description}
                      />
                    </div>


                  ) : null}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tourCard shadow-sm p-lg-4 mt-lg-4 mt-lg-0">
                  <h2 className="fs-3">Start Your Journey </h2>
                  {/* <p>
                    Experience the Journey of a Lifetime Aboard a Luxury Train
                  </p> */}
                  <TrainEnquiryFormClient
                    trainOverviewData={trainOverviewData?.data?.train?.title}
                    trainSlug={trainOverviewData?.data?.train?.slug}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* here rest start */}
          <TrainOtherClient trainOverviewData={trainOverviewData} />
          {/* here rest end */}
        </div>
      </div>
    </>
  );
}

