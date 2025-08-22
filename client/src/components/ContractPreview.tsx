import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="border-b border-border pb-4">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-semibold text-foreground" data-testid="preview-title">
                Contract Preview
              </DialogTitle>
              <motion.button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-close-preview"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
          </DialogHeader>

          <motion.div 
            className="overflow-y-auto max-h-96 p-4" 
            data-testid="preview-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="whitespace-pre-line font-mono text-sm leading-relaxed">
              {previewContent}
            </div>
          </motion.div>

          <motion.div 
            className="border-t border-border pt-4 flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full"
                data-testid="button-close-preview-bottom"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Form
              </Button>
            </motion.div>
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleGenerate}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-generate-from-preview"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Contract
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
