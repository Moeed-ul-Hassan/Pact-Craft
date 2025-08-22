import { useState, useEffect } from "react";
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

  const renderField = (field: any) => {
    const hasError = errors[field.id];
    const suggestions = grammarSuggestions[field.id] || [];

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium text-black">
              {field.label} {field.required && '*'}
            </Label>
            <Textarea
              id={field.id}
              value={formData[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={`resize-vertical ${hasError ? 'border-red-500 focus:ring-red-500' : ''}`}
              rows={4}
              data-testid={`input-${field.id}`}
            />
            {hasError && (
              <p className="text-red-600 text-sm" data-testid={`error-${field.id}`}>{hasError}</p>
            )}
            {suggestions.length > 0 && (
              <div className="text-sm text-orange-600" data-testid={`suggestions-${field.id}`}>
                Grammar suggestions: {suggestions.map(s => s.message).join(', ')}
              </div>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium text-black">
              {field.label} {field.required && '*'}
            </Label>
            <Select
              value={formData[field.id] || ''}
              onValueChange={(value) => handleInputChange(field.id, value)}
            >
              <SelectTrigger className={hasError ? 'border-red-500 focus:ring-red-500' : ''} data-testid={`select-${field.id}`}>
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
            {hasError && (
              <p className="text-red-600 text-sm" data-testid={`error-${field.id}`}>{hasError}</p>
            )}
          </div>
        );

      default:
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium text-black">
              {field.label} {field.required && '*'}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              value={formData[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={hasError ? 'border-red-500 focus:ring-red-500' : ''}
              data-testid={`input-${field.id}`}
            />
            {hasError && (
              <p className="text-red-600 text-sm" data-testid={`error-${field.id}`}>{hasError}</p>
            )}
            {suggestions.length > 0 && (
              <div className="text-sm text-orange-600" data-testid={`suggestions-${field.id}`}>
                Grammar suggestions: {suggestions.map(s => s.message).join(', ')}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div data-testid="dynamic-form">
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-black transition-colors mb-4 flex items-center gap-2"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Contract Types
          </button>
          <h3 className="text-2xl font-semibold text-black mb-2" data-testid="form-title">
            {template.title}
          </h3>
          <p className="text-gray-600" data-testid="form-description">
            {template.description}
          </p>
        </div>

        <form className="space-y-6" data-testid="contract-form">
          {template.fields.map(renderField)}

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handlePreview}
              className="flex-1"
              data-testid="button-preview"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Contract
            </Button>
            <Button
              type="button"
              onClick={handleGenerate}
              className="flex-1 bg-black text-white hover:bg-gray-800"
              data-testid="button-generate"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Contract
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
