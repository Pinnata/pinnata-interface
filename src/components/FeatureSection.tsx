import React, { useState } from 'react';
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps{}

export const FeatureSection: React.FC<Props> = () => {
    return (
        <section className="relative">

        <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 pointer-events-none" aria-hidden="true"></div>
        <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-100 bg-gray-200 transform translate-y-1/2"></div>
  
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
  
            <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-1 lg:grid-cols-1 items-start md:max-w-2xl lg:max-w-none">
  
              <div className="relative flex flex-col items-center p-4 bg-white rounded shadow-xl">
                {/* place images here */}
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Vaults</h4>
                <p className="text-gray-600 text-center">content</p>
              </div>
  
              <div className="relative flex flex-col items-center p-4 bg-white rounded shadow-xl">
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Lending</h4>
                <p className="text-gray-600 text-center">content</p>
              </div>
  
              <div className="relative flex flex-col items-center p-4 bg-white rounded shadow-xl">
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Leverage Yield Farming</h4>
                <p className="text-gray-600 text-center">content</p>
              </div>
  
            </div>
  
          </div>
        </div>
      </section>
    );
};  