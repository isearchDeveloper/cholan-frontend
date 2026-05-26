'use client';

import Image from 'next/image';
export const locations = [
    {
        id: 1,
        name: "Delhi",
        image: "https://www.southtourism.in/assets/images/branch/delhi.jpg",
        address: "#201, Second Floor, Prakash Deep Building - 7, Tolstoy Marg, New Delhi - 110001",
        phones: ["+91 8800403377", "011-35001214"],
    },
    {
        id: 2,
        name: "Chennai",
        image: "https://www.southtourism.in/assets/images/branch/chennai.jpg",
        address: "Sunil Sanctuary, F1, First Floor 30/25, Cart Track Road Velachery, Chennai 600042",
        phones: ["+91 8220005598", "044-28494114", "044-48538053"],
    },
    {
        id: 3,
        name: "Bangalore",
        image: "https://www.southtourism.in/assets/images/branch/bangalore.jpg",
        address:
            "No: 81, 1st Floor, Cm Kempanna Building, Chikkajala, Jala Hobali, Bangalore North, Bangalore – 562157",
        phones: ["+91 8925901134", "080-28467538"],
    },
    {
        id: 4,
        name: "Cochin",
        image: "https://www.southtourism.in/assets/images/branch/cochin.jpg",
        address: "11th Cross Road, Street - A, G-255, Panampilly Nagar, Cochin - 682036",
        phones: ["+91 9895756372", "0484-4062000"],
    },
    {
        id: 5,
        name: "Alleppey",
        image: "https://www.southtourism.in/assets/images/branch/alleppey.jpg",
        address:
            "Thottukadavil (h), Avalukunnu (Post), Punnamada, Alleppey - 688006, Kerala",
        phones: ["+91 9746479660", "0477-6061116"],
    },
    {
        id: 6,
        name: "Madurai",
        image: "https://www.southtourism.in/assets/images/branch/madurai.jpg",
        address:
            "A3 - First Floor, Seetha Apartments, Old Natham Road, Madurai – 625002",
        phones: ["+91 8220005542", "0452-4520029"],
    },
    {
        id: 7,
        name: "Trichy",
        image: "https://www.southtourism.in/assets/images/branch/trichy.jpg",
        address: "4, Annai Avenue, Vasanth Nagar Extn., Sri Rangam, Trichy - 620006",
        phones: ["+91 9600901304", "0431-4226100"],
    },
    {
        id: 8,
        name: "Pondicherry",
        image: "https://www.southtourism.in/assets/images/branch/pondicherry.jpg",
        address: "No.21, Mahatma Gandhi Rd, Heritage Town, Puducherry - 605001",
        phones: ["+91 9944929651", "0413-4200032"],
    },
    {
        id: 9,
        name: "Coimbatore",
        image: "https://www.southtourism.in/assets/images/branch/coimbatore.jpg",
        address:
            "Door No. 18E, Ashok Nagar, Civil Aerodrome PO, Coimbatore - 641014",
        phones: ["+91 9600752666", "0422-3130242"],
    },
    {
        id: 10,
        name: "Trivandrum",
        image: "https://www.southtourism.in/assets/images/branch/trivandrum.jpg",
        address:
            "TC/64/800, Janathalayam House, Vazhamuttom, Pachalloor PO, Trivandrum - 695027",
        phones: ["+91 9746479663"],
    },
    {
        id: 11,
        name: "Mumbai",
        image: "https://www.southtourism.in/assets/images/branch/mumbai.jpg",
        address:
            "Office No: 8, First Floor, Samruddhi Venture Park, Near Tunga Paradise Hotel, MIDC Andheri East, Mumbai - 400093",
        phones: ["+91 8925816522", "022-4783388"],
    },
    {
        id: 12,
        name: "Tiruvannamalai",
        image: "https://www.southtourism.in/assets/images/branch/thiruvanamalai.jpg",
        address:
            "#75/5, Chengam Road, Opp. Ramana Ashram, Ramanasramam POST, Tiruvannamalai - 606603",
        phones: ["+91 9443237922"],
    },
    {
        id: 13,
        name: "Periyar",
        image: "https://www.southtourism.in/assets/images/branch/thekkady.jpg",
        address: "IPE Thekkumcoil, Thamarakandam Rd, Thekkady, Kumily, Kerala - 685509",
        phones: ["+91 9746378622"],
    },
];

export default function LocationCard() {
    return (
        <>

            <div className="row g-4">
                {locations.map((location) => (
                    <div key={location.id} className="col-md-3">
                        <div className="card h-100 border-0 shadow-sm custom-hover">
                            <div className="card-body d-flex flex-column pt-3">
                                <h5 className="card-title fs-6 text-dark mb-3 d-flex gap-1">
                                    <span className="fw-bold">{location.name}</span>
                                </h5>

                                {/* Address */}
                                <div className="d-flex align-items-start text-muted small mb-1">
                                    <svg
                                        className="me-2 flex-shrink-0 mt-2"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        aria-hidden="true"
                                    >
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                    </svg>
                                    <span>{location.address}</span>
                                </div>

                                <hr className="my-2" />

                                {/* Phone numbers */}
                                <div className="mt-auto">
                                    {location.phones.map((phone, idx) => (
                                        <div
                                            key={idx}
                                            className="d-flex align-items-center text-muted small mb-1"
                                        >
                                            <svg
                                                className="me-2 flex-shrink-0"
                                                width="14"
                                                height="14"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                                aria-hidden="true"
                                            >
                                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z" />
                                            </svg>
                                            <span>{phone}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </>
    );
}