import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Eye, FileText } from "lucide-react";
import { CONTRACT_TEMPLATES } from "@/lib/contractTemplates";

interface DynamicFormProps {
  contractType: string;
  onSubmit: (data: Record<string, any>) => void;
  onBack: () => void;
  onGenerate: (data: Record<string, any>) => void;
}

export default function DynamicForm({ contractType, onSubmit, onBack, onGenerate }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [grammarSuggestions, setGrammarSuggestions] = useState<Record<string, any[]>>({});

  const template = CONTRACT_TEMPLATES[contractType];

  useEffect(() => {
    // Initialize form with default values
    const initialData: Record<string, any> = {};
    template.fields.forEach(field => {
      if (field.default) {
        initialData[field.id] = field.default;
      }
    });
    setFormData(initialData);
  }, [template]);

  const validateField = (field: any, value: string) => {
    if (field.required && !value.trim()) {
      return 'This field is required.';
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address.';
      }
    }

    if (field.type === 'number' && value) {
      if (isNaN(Number(value)) || Number(value) < 0) {
        return 'Please enter a valid positive number.';
      }
    }

    return '';
  };

  const handleInputChange = async (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));

    // Validate field
    const field = template.fields.find(f => f.id === fieldId);
    if (field) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [fieldId]: error }));
    }

    // Grammar check for text fields
    if ((field?.type === 'text' || field?.type === 'textarea') && value.length > 10) {
      try {
        const response = await fetch('/api/grammar-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: value }),
        });

        if (response.ok) {
          const result = await response.json();
          setGrammarSuggestions(prev => ({ ...prev, [fieldId]: result.suggestions }));
        }
      } catch (error) {
        console.error('Grammar check failed:', error);
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    template.fields.forEach(field => {
      const value = formData[field.id] || '';
      const error = validateField(field, value);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleGenerate = () => {
    if (validateForm()) {
      onGenerate(formData);
    }
  };

  const renderField = (field: any, index: number) => {
    const hasError = errors[field.id];
    const suggestions = grammarSuggestions[field.id] || [];

    const fieldVariants = {
      hidden: { opacity: 0, x: -20 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration: 0.5,
          delay: index * 0.1
        }
      }
    };

    switch (field.type) {
      case 'textarea':
        return (
          <motion.div 
            key={field.id} 
            className="space-y-2"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <Label htmlFor={field.id} className="text-sm font-medium text-foreground">
              {field.label} {field.required && '*'}
            </Label>
            <motion.div
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Textarea
                id={field.id}
                value={formData[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={`resize-vertical transition-all duration-200 ${hasError ? 'border-destructive focus:ring-destructive' : ''}`}
                rows={4}
                data-testid={`input-${field.id}`}
              />
            </motion.div>
            {hasError && (
              <motion.p 
                className="text-destructive text-sm" 
                data-testid={`error-${field.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {hasError}
              </motion.p>
            )}
            {suggestions.length > 0 && (
              <motion.div 
                className="text-sm text-orange-600" 
                data-testid={`suggestions-${field.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Grammar suggestions: {suggestions.map(s => s.message).join(', ')}
              </motion.div>
            )}
          </motion.div>
        );

      case 'select':
        return (
          <motion.div 
            key={field.id} 
            className="space-y-2"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <Label htmlFor={field.id} className="text-sm font-medium text-foreground">
              {field.label} {field.required && '*'}
            </Label>
            <motion.div
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Select
                value={formData[field.id] || ''}
                onValueChange={(value) => handleInputChange(field.id, value)}
              >
                <SelectTrigger className={`transition-all duration-200 ${hasError ? 'border-destructive focus:ring-destructive' : ''}`} data-testid={`select-${field.id}`}>
                  <SelectValue placeholder={`Select ${field.label.toLowerCase()}...`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option: string) => (
                    <SelectItem key={option} value={option} data-testid={`option-${field.id}-${option.replace(/\s+/g, '-').toLowerCase()}`}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
            {hasError && (
              <motion.p 
                className="text-destructive text-sm" 
                data-testid={`error-${field.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {hasError}
              </motion.p>
            )}
          </motion.div>
        );

      default:
        return (
          <motion.div 
            key={field.id} 
            className="space-y-2"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <Label htmlFor={field.id} className="text-sm font-medium text-foreground">
              {field.label} {field.required && '*'}
            </Label>
            <motion.div
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                id={field.id}
                type={field.type}
                value={formData[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={`transition-all duration-200 ${hasError ? 'border-destructive focus:ring-destructive' : ''}`}
                data-testid={`input-${field.id}`}
              />
            </motion.div>
            {hasError && (
              <motion.p 
                className="text-destructive text-sm" 
                data-testid={`error-${field.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {hasError}
              </motion.p>
            )}
            {suggestions.length > 0 && (
              <motion.div 
                className="text-sm text-orange-600" 
                data-testid={`suggestions-${field.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Grammar suggestions: {suggestions.map(s => s.message).join(', ')}
              </motion.div>
            )}
          </motion.div>
        );
    }
  };

  return (
    <motion.div 
      data-testid="dynamic-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-card rounded-xl border border-border p-8 mb-8">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors mb-4 flex items-center gap-2"
            data-testid="button-back"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Contract Types
          </motion.button>
          <h3 className="text-2xl font-semibold text-foreground mb-2" data-testid="form-title">
            {template.title}
          </h3>
          <p className="text-muted-foreground" data-testid="form-description">
            {template.description}
          </p>
        </motion.div>

        <motion.form 
          className="space-y-6" 
          data-testid="contract-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {template.fields.map((field, index) => renderField(field, index))}

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                variant="outline"
                onClick={handlePreview}
                className="w-full"
                data-testid="button-preview"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Contract
              </Button>
            </motion.div>
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                onClick={handleGenerate}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-generate"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Contract
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}
