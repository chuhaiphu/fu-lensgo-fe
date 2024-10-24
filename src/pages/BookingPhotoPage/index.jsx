import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import CaroselHeader from "./CaroselHeader";
import MomentsGrid from "./MomentsGrid";
import NavPhoto from "./NavPhoto";
import OverviewPage from "./OverviewPage";
export default function ChoosePhotographer() {
    return (
        <>
        <Header />
        <CaroselHeader />
        <NavPhoto />
        <OverviewPage />
        <MomentsGrid />
        <Footer />   
        </>
     
    );
}