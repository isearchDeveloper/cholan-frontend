



'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

const baseUrl = process.env.NEXT_PUBLIC_PROD_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

// ---------- TYPES ----------
interface Department {
  id: number;
  name: string;
}

interface Member {
  id?: number;
  name: string;
  profile_image: string;
  description: string;
  about: string | null;
  department: {
    id: number;
    name: string;
  };
}

interface EmployeeCardProps {
  departments: Department[];
}

// ---------- MODAL COMPONENT ----------
const TeamMemberModal: React.FC<{
  member: Member;
  allMembers: Record<string, Member[]>;
  onClose: () => void;
}> = ({ member, allMembers, onClose }) => {
  if (!member) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content overflow-hidden rounded-4 shadow-lg position-relative">

          {/* Close Button */}
          <button
            type="button"
            className="btn-close modal-btN position-absolute top-0 end-0 m-3 z-10"
            onClick={onClose}
            aria-label="Close"
            style={{ filter: 'invert(1)', zIndex: 10 }}
          />

          {/* Modal Body */}
          <div className="modal-body p-0">
            <div className="row g-0">

              {/* Left: Image */}
              {/* <div className="col-md-5">
                <div
                  className="position-relative w-100 h-100"
                  style={{
                    backgroundImage: `linear-gradient(transparent, rgba(0,0,0,0.1)), url('${member.profile_image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '350px',
                  }}
                >
                  <Image
                    src={member.profile_image}
                    alt={member.name}
                    fill
                    className="d-none"
                    priority
                  />
                </div>
              </div> */}

              {/* Right: Info */}
              <div className="col-md-12 d-flex align-items-center">
                <div className="p-3 p-lg-5 w-100">

                  {/*                   
                  <div className="nav-pills d-flex align-items-center">
                    {member.department?.name && (
                      <p className="nav-link active mb-0 px-3 py-1">
                        {member.department.name}
                      </p>
                    )}
                  </div> */}
                  <h4 className="fw-bold mb-0">{member.name}</h4>


                  <p className="text-muted mb-2">{member.description}</p>

                  {member.about && (
                    <p className="text-secondary my-3">{member.about}</p>
                  )}


                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- MAIN COMPONENT ----------
const EmployeeCard: React.FC<EmployeeCardProps> = ({ departments }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesData, setSlidesData] = useState<Record<string, Member[]>>({});
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Fetch first department automatically
  useEffect(() => {
    if (departments?.length > 0) {
      const firstDept = departments[0];
      fetchTeamMembers(firstDept.id, firstDept.name);
    }
  }, [departments]);

  // Fetch function
  const fetchTeamMembers = async (id: number, deptName: string) => {
    if (slidesData[deptName]) return;

    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/v1/cms/team-list?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Public-Token": XPublicToken,
        },
        next: { revalidate: 60 },
      });

      if (!res.ok) throw new Error("Failed to fetch team members");

      const data = await res.json();
      const mappedMembers: Member[] = (data?.teams || []).map((m: any) => ({
        name: m.name,
        profile_image: m.profile_image,
        description: m.description,
        about: m.about,
        department: m.department,
      }));

      setSlidesData((prev) => ({ ...prev, [deptName]: mappedMembers }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabSelect = (index: number) => {
    setSelectedIndex(index);
    const dept = departments[index];
    if (dept && !slidesData[dept.name]) {
      fetchTeamMembers(dept.id, dept.name);
    }
  };

  const openModal = (member: Member) => {
    setSelectedMember(member);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h2 className="mb-4 text-center fs-3 fw-bold">
              <span>Team Of Cholan Tours</span>
            </h2>

            {/* Tabs */}
            <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
              <TabList className="nav nav-pills justify-content-center mb-5 gap-2 flex-wrap">
                {departments.map((dept) => (
                  <Tab
                    key={dept.id}
                    className="nav-link px-4 py-2 rounded-pill"
                    selectedClassName="active bg-primary text-white"
                  >
                    {dept.name}
                  </Tab>
                ))}
              </TabList>

              {/* Tab Panels */}
              {departments.map((dept, index) => (
                <TabPanel key={dept.id}>
                  {loading && selectedIndex === index ? (
                    <p className="text-center my-5">Loading...</p>
                  ) : !slidesData[dept.name]?.length ? (
                    <p className="text-center my-5 text-muted">
                      No team members found.
                    </p>
                  ) : (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation={{
                        nextEl: `.swiper-button-next-custom-${index}`,
                        prevEl: `.swiper-button-prev-custom-${index}`,
                      }}
                      pagination={{ clickable: true }}
                      spaceBetween={20}
                      slidesPerView={4}
                      loop={true}
                      className="mySwiper"
                      breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        992: { slidesPerView: 4 },
                      }}
                    >
                      {slidesData[dept.name].map((member, idx) => (
                        <SwiperSlide key={idx}>
                          <div
                            className="rounded-4 text-center p-3 tourCard h-100 cursor-pointer shadow-sm hover-shadow-lg transition-all"
                            onClick={() => openModal(member)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && openModal(member)}
                          >
                            <div
                              className="position-relative mx-auto mb-3 rounded-4 overflow-hidden"
                              style={{
                                backgroundImage: `linear-gradient(transparent, rgba(0,0,0,0.1)), url('${member.profile_image}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '250px',
                                cursor: 'pointer',
                              }}
                            >
                              <Image
                                src={member.profile_image}
                                alt={member.name}
                                fill
                                className="d-none"
                                priority
                              />
                            </div>

                            <div className="pt-2 team-info">
                              <h6 className="mb-1 fw-semibold">{member.name}</h6>
                              <p className="text-muted small mb-2 team-deg">{member.description}</p>


                              <button
                                type="button"
                                onClick={() => openModal(member)}
                                className=" plus-icon-btn border-0 mx-auto d-flex align-items-center justify-content-center custom-hover"
                                aria-label="View details"
                              >
                                <Image
                                  width={23}
                                  height={23}
                                  sizes="100vw"
                                  src="/images/button-arrow.png"
                                  alt=""
                                />
                              </button>

                            </div>

                          </div>
                        </SwiperSlide>
                      ))}

                      <div className={`swiper-button-prev-custom-${index} swiper-button-prev text-primary`} />
                      <div className={`swiper-button-next-custom-${index} swiper-button-next text-primary`} />
                    </Swiper>
                  )}
                </TabPanel>
              ))}
            </Tabs>
          </div>
        </div>
      </div>


      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          allMembers={slidesData}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default EmployeeCard;
