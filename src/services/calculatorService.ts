
import { 
  Department, 
  DepartmentImpact, 
  TotalImpact 
} from "@/models/calculator";
import { 
  WORK_HOURS_PER_YEAR, 
  TIME_ADOPTION_CURVE,
  getDepartmentROI
} from "@/data/industryData";

export const calculateDepartmentImpact = (
  dept: Department,
  adoptionRate: number,
  timeHorizon: number,
  industryId: string = ""
): DepartmentImpact => {
  // Calculate the hours saved per person
  const efficiencyRate = dept.efficiencyGain / 100;
  const hoursPerPerson = WORK_HOURS_PER_YEAR * efficiencyRate;
  const totalHoursSaved = hoursPerPerson * dept.headcount;
  
  // Calculate financial value
  const hourlyRate = dept.avgSalary / WORK_HOURS_PER_YEAR;
  const fullImpact = totalHoursSaved * hourlyRate;
  
  // Apply adoption rate
  const adoptionImpact = fullImpact * (adoptionRate / 100);
  
  // Find the closest time period in our curve
  const timeKeys = Object.keys(TIME_ADOPTION_CURVE).map(Number);
  let closestTime = 12;
  for (const key of timeKeys) {
    if (Math.abs(key - timeHorizon) < Math.abs(closestTime - timeHorizon)) {
      closestTime = key;
    }
  }
  
  // Apply the time-based adoption factor
  const timeFactor = TIME_ADOPTION_CURVE[closestTime] || 0.9;
  
  // Get department-specific ROI if available
  const roi = getDepartmentROI(industryId, dept.name);
  
  return {
    financialImpact: adoptionImpact * timeFactor,
    hoursSaved: totalHoursSaved * (adoptionRate / 100) * timeFactor,
    fteEquivalent: (totalHoursSaved * (adoptionRate / 100) * timeFactor) / WORK_HOURS_PER_YEAR,
    headcount: dept.headcount,
    roi: roi
  };
};

export const calculateTotalImpact = (
  departments: Department[],
  adoptionRate: number,
  timeHorizon: number,
  industryId: string = ""
): TotalImpact => {
  const initialValue = { 
    financialImpact: 0, 
    hoursSaved: 0, 
    fteEquivalent: 0, 
    headcount: 0,
    roi: 0
  };

  const result = departments.reduce((acc, dept) => {
    const impact = calculateDepartmentImpact(dept, adoptionRate, timeHorizon, industryId);
    return {
      financialImpact: acc.financialImpact + impact.financialImpact,
      hoursSaved: acc.hoursSaved + impact.hoursSaved,
      fteEquivalent: acc.fteEquivalent + impact.fteEquivalent,
      headcount: acc.headcount + dept.headcount,
      roi: (acc.roi || 0) + (impact.roi || 0) / departments.length // average ROI
    };
  }, initialValue);

  return result;
};

export const calculateROI = (investment: number, returnValue: number): number => {
  return (returnValue - investment) / investment * 100;
};
