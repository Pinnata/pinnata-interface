import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Modal from "react-modal";
import { LandingPageHeader } from "src/components/LandingPageHeader";
import { Header } from "src/components/Header";
import { HeroSection } from "src/components/HeroSection";
import { FeatureSection } from "src/components/FeatureSection";
import { Footer } from "src/components/Footer";

interface Props extends RouteComponentProps{}

export const LandingPage: React.FC<Props> = (props: RouteComponentProps<{}>) => {
    React.useEffect(() => {
        Modal.setAppElement("body");
    });

    return (
        <div className="flex-grow">
            <LandingPageHeader {...props} />
            <HeroSection {...props} />
            {/* <FeatureSection {...props} /> */}
            <Footer />
        </div>
    );
};