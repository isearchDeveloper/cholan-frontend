import React from "react";

const CholanToursComponent: React.FC = () => {
  return (
    <div className="row mt-4 mt-lg-5 gap-4 gap-lg-0 align-items-center">
      <div className="col-lg-5">
        <img
          src="/md.png"
          alt="Team behind Cholan Tours"
          className="img-fluid rounded"
        />
      </div>
      <div className="col-lg-7">
        <h2 className="color-blue mb-3 fs-3">The Minds Behind Cholan Tours</h2>
        <p>Cholan Tours is built on the vision and passion of its founder <b>Mr. Pandian Kumaravel.</b></p>
        <p>Mr. Pandian Kumaravel, Managing Director has over 20 years of experience in the tourism industry. He is an entrepreneur of repute and has been a member of several national and international tourism boards and has contributed to the growth of the industry. His commitment to service quality, ethics and innovation continues to drive Cholan Tours growth and success.</p>

        <p>Along with him <b> Mrs. Mythily Pandian </b>, Director brings business acumen and human touch. Over the years she has played a key role in building the team and creating a culture of positivity, integrity and professionalism. Her calm leadership and ability to inspire has become the backbone of Cholan’s work environment.</p>
        <p>Together their shared vision to make Indian travel easy, immersive and personal has grown Cholan Tours from a 2 person team to a multi city operation with over 350 passionate professionals. Their philosophy is about sustainable growth, attentive service and human touch so the company is more than a business it’s a family that welcomes every traveler as one of its own.</p>

      </div>
    </div>
  );
};

export default CholanToursComponent;
