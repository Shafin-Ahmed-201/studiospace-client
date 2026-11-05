import Banner from "@/components/Home/Banner";
import BrowseCategories from "@/components/Home/BrowseCategories";
import FeaturedStudios from "@/components/Home/FeaturedStudios";
import HostGuarantee from "@/components/Home/HostGurantee";
import HowBookingWorks from "@/components/Home/HowBookingWorks";


export default function Home() {
  return (
    <>
    <Banner></Banner>
    <BrowseCategories></BrowseCategories>
    <FeaturedStudios></FeaturedStudios>
    <HowBookingWorks></HowBookingWorks>
    <HostGuarantee></HostGuarantee>
    </>
  );
}
