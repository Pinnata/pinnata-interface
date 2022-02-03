import React, { useState } from 'react';
import { Link, useLocation, RouteComponentProps } from "react-router-dom";
import { Button } from 'theme-ui';

interface Props extends RouteComponentProps{}

export const HeroSection: React.FC<Props> = ({ history}) => {
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const location = useLocation();
    return (
        <section className="relative">
            <div className="z-0 fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                {/* <img className="z-0 object-contain opacity-10" src={require('../images/Dahlia-teal.png').default} width="768" height="432" alt="Hero" /> */}
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                <div className="pt-20 pb-12 md:pt-48 md:pb-20">

                    <div className="text-center pb-12 md:pb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Cross-chain leveraged yield farming protocol on <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-green-400">Celo</span></h1>
                    <div className="max-w-3xl mx-auto pb-9 pt-9">
                                                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                        <div className="px-2 pb-4">
                            <a href='https://dahlia-finance.gitbook.io/dahlia-finance/' >
                                {/* <button className="text-blue-700 border border-solid border-blue-700 bg-gradient-to-r hover:to-green-300 hover:from-blue-700 hover:text-white active:bg-blue-700 font-bold uppercase px-8 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => { */}
                                <button className="text-blue-700 border border-solid border-blue-700 bg-gradient-to-br hover:to-green-300 hover:from-blue-700 hover:text-white active:bg-blue-700 font-bold px-8 py-3 rounded-3xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => {
                                    }}>Learn More</button>
                            </a>
                        </div>
                        <div className="px-2">
                            <Link to='/earn' >
                                <button className="from-blue-700 to-green-300 text-white border-blue-700 bg-gradient-to-br hover:text-white active:bg-blue-700 font-bold px-8 py-3 rounded-3xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:opacity-75" onClick={() => {
                                history.push('/earn')
                                    }}>Launch App</button>
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
