import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
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

  const scrollToTemplates = () => {
    setCurrentStep('selector');
    setTimeout(() => {
      const element = document.getElementById('templates-section');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToPricing = () => {
    const element = document.getElementById('pricing-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSupport = () => {
    const element = document.getElementById('support-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSignIn = () => {
    alert('Sign In functionality - Connect to your authentication system');
  };

  const handleGetStarted = () => {
    setCurrentStep('selector');
    setTimeout(() => {
      const element = document.getElementById('templates-section');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1 
                className="text-xl font-semibold text-foreground cursor-pointer" 
                data-testid="logo"
                onClick={() => handleBackToSelector()}
              >
                ContractGen
              </h1>
            </motion.div>
            <nav className="hidden md:flex items-center space-x-8">
              <motion.button 
                onClick={() => scrollToTemplates()}
                className="text-muted-foreground hover:text-foreground transition-colors" 
                data-testid="nav-templates"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Templates
              </motion.button>
              <motion.button 
                onClick={() => scrollToPricing()}
                className="text-muted-foreground hover:text-foreground transition-colors" 
                data-testid="nav-pricing"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Pricing
              </motion.button>
              <motion.button 
                onClick={() => scrollToSupport()}
                className="text-muted-foreground hover:text-foreground transition-colors" 
                data-testid="nav-support"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Support
              </motion.button>
            </nav>
            <div className="flex items-center space-x-4">
              <motion.button 
                className="text-muted-foreground hover:text-foreground transition-colors" 
                data-testid="button-signin"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSignIn()}
              >
                Sign In
              </motion.button>
              <motion.button 
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" 
                data-testid="button-get-started"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGetStarted()}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 'selector' && (
            <motion.div
              key="selector"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              id="templates-section"
            >
              <ContractTypeSelector onSelect={handleContractTypeSelect} />
            </motion.div>
          )}

          {currentStep === 'form' && selectedContractType && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DynamicForm
                contractType={selectedContractType}
                onSubmit={handleFormSubmit}
                onBack={handleBackToSelector}
                onGenerate={handleGenerateContract}
              />
            </motion.div>
          )}

          {currentStep === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ContractPreview
                contractType={selectedContractType!}
                formData={formData}
                onBack={handleBackToForm}
                onGenerate={handleGenerateContract}
              />
            </motion.div>
          )}

          {currentStep === 'download' && (
            <motion.div
              key="download"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DownloadSection
                contract={generatedContract}
                contractId={contractId}
                onCreateNew={handleBackToSelector}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pricing Section */}
        {currentStep === 'selector' && (
          <motion.section 
            id="pricing-section" 
            className="mt-20 py-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Simple Pricing</h2>
              <p className="text-muted-foreground">No subscription required. Pay per contract generated.</p>
            </div>
            <div className="max-w-md mx-auto bg-card border border-border rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Free to Use</h3>
              <p className="text-muted-foreground mb-6">Generate unlimited contracts for free. Download as PDF or DOCX.</p>
              <motion.button 
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToTemplates()}
              >
                Start Creating
              </motion.button>
            </div>
          </motion.section>
        )}

        {/* Support Section */}
        {currentStep === 'selector' && (
          <motion.section 
            id="support-section" 
            className="mt-20 py-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-8">We're here to help you create professional contracts.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center p-6 bg-card border border-border rounded-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-muted-foreground text-sm">Learn how to use our contract templates effectively.</p>
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-card border border-border rounded-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-muted-foreground text-sm">Get help with contract customization and legal questions.</p>
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-card border border-border rounded-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground text-sm">Join our community to share templates and best practices.</p>
              </motion.div>
            </div>
          </motion.section>
        )}
      </main>

      {isLoading && <LoadingOverlay />}
    </div>
  );
}
