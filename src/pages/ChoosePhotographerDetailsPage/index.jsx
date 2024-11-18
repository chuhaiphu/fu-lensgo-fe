import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import CaroselHeader from "./CaroselHeader";
import MomentsGrid from "./MomentsGrid";
import OverviewPage from "./OverviewPage";
export default function ChoosePhotographerDetailsPage() {
    const { studioId } = useParams();
    
    return (
        <>
        <Header />
        <CaroselHeader />
        <OverviewPage studioId={studioId} />
        <MomentsGrid />
        <Footer />   
        </>
    );
}