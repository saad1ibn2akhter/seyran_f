import { Hero } from "./Hero";
import { Logo } from "./Logo";
import { Navbar } from "./Navbar";

export default function Home(){
    return (
        <div className=" mx-auto ">
            <Navbar></Navbar>
            <Hero></Hero>
        </div>
    );
}