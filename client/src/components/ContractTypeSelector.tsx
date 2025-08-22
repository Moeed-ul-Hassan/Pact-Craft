import { Shield, Handshake, Bus, Code, Palette, PenTool, Lightbulb, CreditCard } from "lucide-react";

interface ContractTypeCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const contractTypes: ContractTypeCard[] = [
  {
    id: 'nda',
    title: 'Non-Disclosure Agreement',
    description: 'Protect confidential information and trade secrets',
    icon: Shield,
  },
  {
    id: 'service',
    title: 'Service Agreement',
    description: 'General service contracts with payment terms',
    icon: Handshake,
  },
  {
    id: 'freelance',
    title: 'Freelance Contract',
    description: 'Independent contractor agreements',
    icon: Bus,
  },
  {
    id: 'web-dev',
    title: 'Website Development',
    description: 'Web development project contracts',
    icon: Code,
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Design services and creative work',
    icon: Palette,
  },
  {
    id: 'content-writing',
    title: 'Content Writing',
    description: 'Writing and content creation services',
    icon: PenTool,
  },
  {
    id: 'consulting',
    title: 'Consulting Agreement',
    description: 'Professional consultation services',
    icon: Lightbulb,
  },
  {
    id: 'payment-terms',
    title: 'Payment Terms',
    description: 'Standalone payment and billing agreements',
    icon: CreditCard,
  },
];

interface ContractTypeSelectorProps {
  onSelect: (contractType: string) => void;
}

export default function ContractTypeSelector({ onSelect }: ContractTypeSelectorProps) {
  return (
    <div data-testid="contract-selector">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-black mb-4" data-testid="title-main">Generate Professional Contracts</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto" data-testid="text-description">
          Create legally-sound contracts in minutes. Choose from our comprehensive template library designed for freelancers, agencies, and consultants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {contractTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <div
              key={type.id}
              className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer hover:border-black hover:shadow-md transition-all duration-200"
              onClick={() => onSelect(type.id)}
              data-testid={`card-contract-${type.id}`}
            >
              <div className="text-center">
                <IconComponent className="text-2xl text-black mb-4 h-8 w-8 mx-auto" />
                <h3 className="font-medium text-black mb-2" data-testid={`title-${type.id}`}>{type.title}</h3>
                <p className="text-sm text-gray-600" data-testid={`description-${type.id}`}>{type.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
