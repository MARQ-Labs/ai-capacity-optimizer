
import React from "react";
import { Industry } from "@/models/calculator";
import Icon from "@/components/Icon";

interface HeaderProps {
  selectedIndustry: string;
  currentIndustry: Industry;
  handleIndustryChange: (industry: string) => void;
  roiData: any;
}

const Header: React.FC<HeaderProps> = ({
  selectedIndustry,
  currentIndustry,
  handleIndustryChange,
  roiData,
}) => {
  return (
    <div className="mb-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-teal-800 mb-2">AI Capacity & ROI Calculator</h1>
          <p className="text-gray-600">
            See how strategic AI adoption creates additional team capacity and ROI for your organization
          </p>
        </div>
        <div className="md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            value={selectedIndustry}
            onChange={(e) => handleIndustryChange(e.target.value)}
          >
            <option value="technology">Information & Communication Technology</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="finance">Financial Services</option>
            <option value="healthcare">Healthcare</option>
            <option value="retail">Retail & Consumer Goods</option>
            <option value="media">Media & Telecommunications</option>
            <option value="professional">Professional Services</option>
            <option value="energy">Energy & Utilities</option>
            <option value="logistics">Transportation & Logistics</option>
            <option value="insurance">Insurance</option>
            <option value="tourism">Tourism & Hospitality</option>
          </select>
        </div>
      </div>
      
      <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-md mb-4 animate-blur-in">
        <div className="flex">
          <div className="flex-1">
            <h2 className="font-semibold text-teal-800">{currentIndustry.name}</h2>
            <p className="text-sm text-teal-600">{currentIndustry.description}</p>
            <div className="mt-2 text-sm text-teal-700">
              <span className="font-medium">Industry Average ROI: </span>
              <span className="font-bold">{currentIndustry.overallROI}%</span>
              <span className="ml-4 font-medium">AI Leaders ROI: </span>
              <span className="font-bold">{roiData.leadersROI}</span>
              <span className="ml-4 font-medium">Maturity Timeline: </span>
              <span className="font-bold">{roiData.maturityTimeline}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
