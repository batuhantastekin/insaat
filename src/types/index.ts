export interface ProjectBasics {
  location: {
    city: string;
    district: string;
  };
  area: number;
  buildingType: 'residential' | 'commercial' | 'industrial';
  qualityLevel: 'economic' | 'standard' | 'luxury';
  startDate: string;
  completionDate: string;
  specialRequirements: string;
}

export interface TechnicalSpecs {
  floors: number;
  foundationType: 'shallow' | 'deep' | 'pile';
  structuralSystem: 'concrete' | 'steel' | 'mixed';
  facadeType: 'brick' | 'curtain-wall' | 'composite';
  hvacSystem: 'central' | 'split' | 'vrf';
  specialInstallations: string[];
}

export interface CostBreakdown {
  construction: {
    materials: number;
    labor: number;
    equipment: number;
  };
  softCosts: {
    permits: number;
    design: number;
    consulting: number;
  };
  siteSpecific: number;
  contingency: number;
  total: number;
}

export interface MaterialData {
  category: string;
  price: number;
  unit: string;
  suppliers: string[];
  deliveryTime: string;
  lastUpdated: string;
}

export interface Language {
  code: 'tr' | 'en';
  name: string;
}

// Advanced features interfaces
export interface ProjectScenario {
  id: string;
  name: string;
  basics: ProjectBasics;
  specs: TechnicalSpecs;
  costs: CostBreakdown;
  createdAt: string;
}

export interface ROIAnalysis {
  totalInvestment: number;
  expectedRevenue: number;
  netProfit: number;
  roiPercentage: number;
  paybackPeriod: number;
  irr: number;
  npv: number;
}

export interface RiskFactor {
  id: string;
  category: 'financial' | 'technical' | 'environmental' | 'regulatory';
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  riskScore: number;
  mitigation: string;
}

export interface TrendData {
  period: string;
  materialCosts: number;
  laborCosts: number;
  totalCosts: number;
  inflationRate: number;
}

export interface ComparisonProject {
  id: string;
  name: string;
  location: string;
  area: number;
  costPerM2: number;
  buildingType: string;
  qualityLevel: string;
  completionDate: string;
}

// Project Management interfaces
export interface ProjectTask {
  id: string;
  name: string;
  description: string;
  phase: ProjectPhase;
  startDate: string;
  endDate: string;
  duration: number;
  dependencies: string[];
  progress: number;
  assignedTeam: string[];
  cost: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  milestones: ProjectMilestone[];
}

export interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  color: string;
  tasks: string[];
}

export interface ProjectMilestone {
  id: string;
  name: string;
  description: string;
  date: string;
  completed: boolean;
  critical: boolean;
}

export interface ResourceAllocation {
  id: string;
  resourceType: 'labor' | 'equipment' | 'material';
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
  startDate: string;
  endDate: string;
  utilization: number;
  availability: 'available' | 'allocated' | 'overallocated';
}

export interface ProjectSchedule {
  id: string;
  projectId: string;
  phases: ProjectPhase[];
  tasks: ProjectTask[];
  milestones: ProjectMilestone[];
  resources: ResourceAllocation[];
  criticalPath: string[];
  totalDuration: number;
  bufferTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string[];
  dailyRate: number;
  availability: number;
  assignedTasks: string[];
  workload: number;
  contact: {
    email: string;
    phone: string;
  };
}

export interface ProjectProgress {
  overallProgress: number;
  phaseProgress: Record<string, number>;
  tasksCompleted: number;
  totalTasks: number;
  milestonesAchieved: number;
  totalMilestones: number;
  budgetSpent: number;
  budgetRemaining: number;
  daysElapsed: number;
  daysRemaining: number;
  isOnSchedule: boolean;
  isOnBudget: boolean;
}

// Financial Tools interfaces
export interface CashFlowProjection {
  month: number;
  period: string;
  inflows: {
    equity: number;
    loan: number;
    sales: number;
    other: number;
    total: number;
  };
  outflows: {
    materials: number;
    labor: number;
    equipment: number;
    permits: number;
    other: number;
    total: number;
  };
  netCashFlow: number;
  cumulativeCashFlow: number;
  minimumBalance: number;
}

export interface FinancingOption {
  id: string;
  type: 'bank-loan' | 'construction-loan' | 'equity' | 'government-incentive' | 'private-investor';
  name: string;
  provider: string;
  amount: number;
  interestRate: number;
  term: number; // months
  monthlyPayment: number;
  totalInterest: number;
  requirements: string[];
  advantages: string[];
  disadvantages: string[];
  processingTime: string;
  fees: {
    application: number;
    processing: number;
    insurance: number;
    other: number;
  };
  collateral: string;
  eligibility: string[];
}

export interface LoanCalculation {
  principal: number;
  interestRate: number;
  term: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  paymentSchedule: LoanPayment[];
}

export interface LoanPayment {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface InvestmentAnalysis {
  initialInvestment: number;
  projectedRevenue: number;
  operatingCosts: number;
  netIncome: number;
  roi: number;
  paybackPeriod: number;
  irr: number;
  npv: number;
  profitabilityIndex: number;
  breakEvenPoint: number;
  sensitivityAnalysis: {
    scenario: string;
    revenueChange: number;
    costChange: number;
    resultingROI: number;
    resultingNPV: number;
  }[];
}

export interface TaxCalculation {
  constructionValue: number;
  landValue: number;
  totalValue: number;
  kdv: number; // VAT
  harçlar: number; // Fees
  emlakVergisi: number; // Property tax
  gelirVergisi: number; // Income tax
  kurumlarVergisi: number; // Corporate tax
  totalTaxes: number;
  netProfit: number;
}

export interface FinancialRisk {
  id: string;
  category: 'interest-rate' | 'inflation' | 'currency' | 'market' | 'credit';
  description: string;
  probability: number;
  impact: number;
  riskScore: number;
  mitigation: string;
  cost: number;
}

export interface BudgetTracking {
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercentage: number;
  status: 'under-budget' | 'on-budget' | 'over-budget';
  forecast: number;
  explanation: string;
}

export interface FinancialReport {
  projectId: string;
  reportDate: string;
  cashFlow: CashFlowProjection[];
  financing: FinancingOption[];
  investment: InvestmentAnalysis;
  taxes: TaxCalculation;
  risks: FinancialRisk[];
  budget: BudgetTracking[];
  recommendations: string[];
  alerts: string[];
}

// Supplier and Procurement Management interfaces
export interface Supplier {
  id: string;
  name: string;
  companyName: string;
  category: 'materials' | 'labor' | 'equipment' | 'services';
  specialization: string[];
  contact: {
    email: string;
    phone: string;
    address: string;
    website?: string;
  };
  rating: {
    overall: number;
    quality: number;
    delivery: number;
    price: number;
    service: number;
  };
  certifications: string[];
  experience: number; // years
  capacity: {
    maxProjectValue: number;
    simultaneousProjects: number;
    geographicCoverage: string[];
  };
  financialInfo: {
    annualRevenue: number;
    creditRating: string;
    paymentTerms: string;
    insuranceCoverage: number;
  };
  performance: {
    completedProjects: number;
    onTimeDelivery: number; // percentage
    qualityScore: number;
    customerSatisfaction: number;
  };
  documents: {
    taxCertificate: boolean;
    insurancePolicy: boolean;
    qualityCertificates: boolean;
    references: boolean;
  };
  status: 'active' | 'inactive' | 'blacklisted' | 'pending-approval';
  lastUpdated: string;
  createdAt: string;
}

export interface TenderProcess {
  id: string;
  title: string;
  description: string;
  category: 'materials' | 'labor' | 'equipment' | 'services';
  projectId: string;
  estimatedValue: number;
  currency: string;
  tenderType: 'open' | 'restricted' | 'negotiated' | 'competitive-dialogue';
  status: 'draft' | 'published' | 'submission-period' | 'evaluation' | 'awarded' | 'cancelled';
  timeline: {
    publishDate: string;
    submissionDeadline: string;
    evaluationPeriod: string;
    awardDate: string;
    contractStart: string;
  };
  requirements: {
    technical: string[];
    financial: string[];
    legal: string[];
    experience: string[];
  };
  evaluationCriteria: {
    price: number; // percentage weight
    quality: number;
    delivery: number;
    experience: number;
    technical: number;
  };
  documents: {
    specifications: string[];
    drawings: string[];
    conditions: string[];
    forms: string[];
  };
  invitedSuppliers: string[]; // supplier IDs
  submissions: TenderSubmission[];
  winner?: string; // supplier ID
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TenderSubmission {
  id: string;
  tenderId: string;
  supplierId: string;
  submissionDate: string;
  totalPrice: number;
  currency: string;
  deliveryTime: number; // days
  validityPeriod: number; // days
  technicalProposal: {
    methodology: string;
    timeline: string;
    resources: string;
    qualityPlan: string;
  };
  financialProposal: {
    breakdown: {
      category: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }[];
    paymentTerms: string;
    warranties: string;
    penalties: string;
  };
  documents: {
    technicalSpecs: boolean;
    financialOffer: boolean;
    certificates: boolean;
    references: boolean;
  };
  evaluation: {
    technicalScore: number;
    financialScore: number;
    overallScore: number;
    comments: string;
    evaluatedBy: string;
    evaluatedAt: string;
  };
  status: 'submitted' | 'under-review' | 'clarification-needed' | 'accepted' | 'rejected';
}

export interface Contract {
  id: string;
  contractNumber: string;
  title: string;
  projectId: string;
  supplierId: string;
  tenderId?: string;
  type: 'supply' | 'service' | 'construction' | 'consulting';
  value: number;
  currency: string;
  status: 'draft' | 'active' | 'completed' | 'terminated' | 'suspended';
  timeline: {
    startDate: string;
    endDate: string;
    duration: number; // days
  };
  terms: {
    paymentTerms: string;
    deliveryTerms: string;
    qualityStandards: string;
    penalties: string;
    warranties: string;
  };
  milestones: ContractMilestone[];
  payments: ContractPayment[];
  performance: {
    qualityRating: number;
    timelyDelivery: number;
    budgetCompliance: number;
    overallSatisfaction: number;
  };
  documents: {
    signedContract: boolean;
    specifications: boolean;
    insurancePolicies: boolean;
    guarantees: boolean;
  };
  risks: {
    identified: string[];
    mitigation: string[];
    contingency: string[];
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContractMilestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  value: number;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
  deliverables: string[];
  acceptanceCriteria: string[];
  completedDate?: string;
  notes?: string;
}

export interface ContractPayment {
  id: string;
  milestoneId?: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'approved' | 'paid' | 'overdue' | 'disputed';
  paymentDate?: string;
  invoiceNumber?: string;
  notes?: string;
}

export interface SupplierPerformance {
  supplierId: string;
  period: string;
  metrics: {
    onTimeDelivery: number;
    qualityScore: number;
    costPerformance: number;
    responsiveness: number;
    compliance: number;
  };
  projects: {
    projectId: string;
    projectName: string;
    contractValue: number;
    performance: number;
    issues: string[];
  }[];
  trends: {
    improving: string[];
    declining: string[];
    stable: string[];
  };
  recommendations: string[];
  nextReviewDate: string;
}

export interface ProcurementPlan {
  id: string;
  projectId: string;
  title: string;
  description: string;
  totalBudget: number;
  categories: {
    category: string;
    budget: number;
    priority: 'high' | 'medium' | 'low';
    timeline: string;
    procurementMethod: 'tender' | 'direct' | 'framework';
    approvalRequired: boolean;
  }[];
  timeline: {
    planningPhase: string;
    tenderPhase: string;
    evaluationPhase: string;
    contractPhase: string;
    deliveryPhase: string;
  };
  approvals: {
    level: string;
    approver: string;
    status: 'pending' | 'approved' | 'rejected';
    date?: string;
    comments?: string;
  }[];
  risks: {
    risk: string;
    probability: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    mitigation: string;
  }[];
  status: 'draft' | 'approved' | 'in-progress' | 'completed';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Quality and Safety Management interfaces
export interface QualityCheckpoint {
  id: string;
  name: string;
  phase: string;
  description: string;
  inspector: string;
  scheduledDate: string;
  completedDate?: string;
  status: 'pending' | 'in-progress' | 'passed' | 'failed';
  score: number;
  criteria: {
    name: string;
    required: string;
    actual: string;
    passed: boolean;
  }[];
  photos: string[];
  notes: string;
}

export interface QualityTest {
  id: string;
  name: string;
  type: string;
  laboratory: string;
  sampleDate: string;
  resultDate?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  specification: string;
  actualValue: string;
  result: 'pending' | 'passed' | 'failed';
  testStandard: string;
  sampleLocation: string;
  testCost: number;
  certificate?: string;
}

export interface QualityIssue {
  id: string;
  title: string;
  description: string;
  category: 'materials' | 'workmanship' | 'design' | 'safety' | 'environmental';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  reportedBy: string;
  reportedDate: string;
  assignedTo: string;
  dueDate: string;
  resolvedDate?: string;
  location: string;
  photos: string[];
  estimatedCost: number;
  actualCost: number;
  resolution: string;
}

export interface SafetyIncident {
  id: string;
  type: 'accident' | 'near-miss' | 'unsafe' | 'violation';
  title: string;
  description: string;
  severity: 'minor' | 'major' | 'critical';
  date: string;
  time: string;
  location: string;
  reportedBy: string;
  involvedPersons: string[];
  witnesses: string[];
  status: 'open' | 'investigating' | 'closed';
  investigation: {
    investigator: string;
    startDate: string;
    endDate?: string;
    findings: string;
    rootCause: string;
  };
  correctiveActions: string[];
  preventiveActions: string[];
  photos: string[];
  estimatedCost: number;
  actualCost: number;
}

export interface SafetyTraining {
  id: string;
  title: string;
  description: string;
  trainer: string;
  date: string;
  duration: number; // hours
  participants: {
    name: string;
    position: string;
    attended: boolean;
    score: number;
  }[];
  topics: string[];
  materials: string[];
  certificate: boolean;
  status: 'scheduled' | 'completed' | 'cancelled';
  cost: number;
  effectiveness?: number; // percentage
}

export interface SafetyInspection {
  id: string;
  title: string;
  description: string;
  inspector: string;
  date: string;
  duration: number; // hours
  areas: string[];
  checklist: {
    item: string;
    compliant: boolean;
    score: number;
  }[];
  overallScore: number;
  findings: string[];
  recommendations: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  followUpDate: string;
}

export interface ComplianceItem {
  id: string;
  requirement: string;
  description: string;
  category: 'building' | 'environmental' | 'safety' | 'fire' | 'electrical';
  regulationReference: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'in-progress';
  dueDate: string;
  responsible: string;
  completedDate?: string;
  evidence: string[];
  notes: string;
}

export interface Regulation {
  id: string;
  title: string;
  authority: string;
  category: 'building' | 'environmental' | 'safety' | 'fire' | 'electrical';
  effectiveDate: string;
  lastUpdate: string;
  applicability: 'high' | 'medium' | 'low';
  description: string;
  requirements: string[];
  penalties?: string;
  url?: string;
}

export interface Permit {
  id: string;
  title: string;
  permitNumber: string;
  category: 'building' | 'environmental' | 'safety' | 'fire' | 'electrical';
  authority: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'inactive' | 'expired';
  description: string;
  conditions: string[];
  documents: string[];
  renewalRequired: boolean;
  renewalDate?: string;
  cost: number;
}

export interface InspectionReport {
  id: string;
  title: string;
  inspector: string;
  inspectionDate: string;
  inspectionType: 'quality' | 'safety' | 'compliance' | 'technical' | 'financial';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scope: string[];
  methodology: string;
  overallScore: number;
  findings: InspectionFinding[];
  summary: string;
  recommendations: string[];
  followUpDate: string;
  photos: string[];
  documents: string[];
  duration: number; // hours
  cost: number;
}

export interface InspectionFinding {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'major' | 'minor' | 'observation';
  category: 'materials' | 'workmanship' | 'design' | 'safety' | 'environmental';
  location: string;
  correctiveAction: string;
  responsible: string;
  dueDate?: string;
  status: 'open' | 'in-progress' | 'closed';
  photos: string[];
  estimatedCost?: number;
}

export interface Certification {
  id: string;
  name: string;
  issuingBody: string;
  certificateNumber: string;
  category: 'quality' | 'environmental' | 'safety' | 'management' | 'technical';
  scope: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending' | 'suspended';
  description: string;
  requirements: string[];
  renewalDate?: string;
  cost: number;
  auditDate: string;
  nextAuditDate: string;
  documents: string[];
}

export interface CertificationRequirement {
  id: string;
  title: string;
  description: string;
  category: 'quality' | 'environmental' | 'safety' | 'management' | 'technical';
  mandatoryBy: string;
  dueDate: string;
  responsible: string;
  priority: 'high' | 'medium' | 'low';
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number; // percentage
  estimatedCost: number;
  actualCost: number;
  requirements: string[];
  evidence: string[];
  milestones: {
    name: string;
    dueDate: string;
    completed: boolean;
  }[];
}