"use client";
import { span } from "framer-motion/client";
import React from "react";

interface TrainDetailsContentProps {
    train: {
        title: string;

        duration: string;
    };
}

const TrainDetailsContent: any = ({ data }: any) => {

    return (
        <div className="train-content">
            <h1 className="train-title fs-2 ">
             {data.tour.title}
                <span className="color-blue fw-normal">
                    - {data.tour.details.duration_nights} {data.tour.details.duration_nights < 2 ? "Night" : "Nights"} / {data.tour.details.duration_days} {data.tour.details.duration_days < 2 ? "Day" : "Days"}
                </span>
            </h1>
           

            <div className="train-details d-flex align-items-=center gap-2 mt-2">
                <img src="../location.svg" alt="icon" />
                <span className="days-count text-sm">{data.tour.details.route_details}</span>
            </div>
        </div>
    );
};

export default TrainDetailsContent;
