import { Demo } from "./Demo";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Logo } from "./Logo";
import { Navbar } from "./Navbar";

export default function Home() {
    return (
        <div className=" mx-auto font-right">
            <Navbar></Navbar>
            <Hero></Hero>
            <div className="mx-w-6xl mx-auto">
                <Demo></Demo>
                <Features></Features>
                <Footer></Footer>
            </div>
        </div>
    );
}