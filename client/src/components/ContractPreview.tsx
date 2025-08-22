import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, FileText, X } from "lucide-react";
import { generateContractContent } from "@/lib/contractTemplates";

interface ContractPreviewProps {
  contractType: string;
  formData: Record<string, any>;
  onBack: () => void;
  onGenerate: (data: Record<string, any>) => void;
}

export default function ContractPreview({ contractType, formData, onBack, onGenerate }: ContractPreviewProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [previewContent, setPreviewContent] = useState("");

  useEffect(() => {
    const content = generateContractContent(contractType, formData);
    setPreviewContent(content);
  }, [contractType, formData]);

  const handleGenerate = () => {
    setIsOpen(false);
    onGenerate(formData);
  };

  const handleClose = () => {
    setIsOpen(false);
    onBack();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden" data-testid="preview-modal">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold text-black" data-testid="preview-title">
              Contract Preview
            </DialogTitle>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-black transition-colors"
              data-testid="button-close-preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-96 p-4" data-testid="preview-content">
          <div className="whitespace-pre-line font-mono text-sm leading-relaxed">
            {previewContent}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 flex gap-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
            data-testid="button-close-preview-bottom"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Form
          </Button>
          <Button
            onClick={handleGenerate}
            className="flex-1 bg-black text-white hover:bg-gray-800"
            data-testid="button-generate-from-preview"
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Contract
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
