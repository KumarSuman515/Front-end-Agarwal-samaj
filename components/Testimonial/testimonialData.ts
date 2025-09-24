import image1 from "@/public/images/user/user-01.png";
import image2 from "@/public/images/user/user-02.png";
import { Testimonial } from "@/types/testimonial";

export const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Priya Agarwal",
    designation: "Community Member",
    image: image1,
    content:
      "The Agarwal Samaj platform has been incredible for our family. We found our daughter's perfect match through the matrimony service, and the community events have brought us closer to our heritage.",
  },
  {
    id: 2,
    name: "Rajesh Agarwal",
    designation: "Business Owner",
    image: image2,
    content:
      "Through the classifieds section, I've been able to grow my business by connecting with other community members. The platform has created amazing networking opportunities for entrepreneurs like me.",
  },
  {
    id: 3,
    name: "Sunita Agarwal",
    designation: "Community Volunteer",
    image: image1,
    content:
      "The blog section keeps us updated with community news and cultural insights. It's wonderful to see how technology is helping preserve and strengthen our traditions.",
  },
  {
    id: 4,
    name: "Amit Agarwal",
    designation: "Software Engineer",
    image: image2,
    content:
      "The membership program has given me access to exclusive events and networking opportunities. It's amazing how this platform brings together professionals from various fields within our community.",
  },
];
