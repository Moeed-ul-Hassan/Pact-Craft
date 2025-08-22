import { useState } from "react";
import ContractTypeSelector from "@/components/ContractTypeSelector";
import DynamicForm from "@/components/DynamicForm";
import ContractPreview from "@/components/ContractPreview";
import DownloadSection from "@/components/DownloadSection";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<'selector' | 'form' | 'preview' | 'download'>('selector');
  const [selectedContractType, setSelectedContractType] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [generatedContract, setGeneratedContract] = useState<string>("");
  const [contractId, setContractId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContractTypeSelect = (contractType: string) => {
    setSelectedContractType(contractType);
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: Record<string, any>) => {
    setFormData(data);
    setCurrentStep('preview');
  };

  const handleBackToSelector = () => {
    setCurrentStep('selector');
    setSelectedContractType(null);
    setFormData({});
    setGeneratedContract("");
    setContractId("");
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  const handleGenerateContract = async (data: Record<string, any>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contracts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractType: selectedContractType,
          formData: data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate contract');
      }

      const result = await response.json();
      setGeneratedContract(result.content);
      setContractId(result.contractId);
      setCurrentStep('download');
    } catch (error) {
      console.error('Contract generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-foreground" data-testid="logo">ContractGen</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-templates">Templates</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-pricing">Pricing</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-support">Support</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-signin">Sign In</button>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" data-testid="button-get-started">Get Started</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'selector' && (
          <ContractTypeSelector onSelect={handleContractTypeSelect} />
        )}

        {currentStep === 'form' && selectedContractType && (
          <DynamicForm
            contractType={selectedContractType}
            onSubmit={handleFormSubmit}
            onBack={handleBackToSelector}
            onGenerate={handleGenerateContract}
          />
        )}

        {currentStep === 'preview' && (
          <ContractPreview
            contractType={selectedContractType!}
            formData={formData}
            onBack={handleBackToForm}
            onGenerate={handleGenerateContract}
          />
        )}

        {currentStep === 'download' && (
          <DownloadSection
            contract={generatedContract}
            contractId={contractId}
            onCreateNew={handleBackToSelector}
          />
        )}
      </main>

      {isLoading && <LoadingOverlay />}
    </div>
  );
}
