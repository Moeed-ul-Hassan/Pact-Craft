import { Shield, Handshake, Bus, Code, Palette, PenTool, Lightbulb, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      data-testid="contract-selector"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold text-foreground mb-4" data-testid="title-main">Generate Professional Contracts</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-description">
          Create legally-sound contracts in minutes. Choose from our comprehensive template library designed for freelancers, agencies, and consultants.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {contractTypes.map((type, index) => {
          const IconComponent = type.icon;
          return (
            <motion.div
              key={type.id}
              variants={cardVariants}
              className="bg-card border border-border rounded-xl p-6 cursor-pointer transition-colors duration-200"
              onClick={() => onSelect(type.id)}
              data-testid={`card-contract-${type.id}`}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <IconComponent className="text-foreground mb-4 h-8 w-8 mx-auto" />
                </motion.div>
                <h3 className="font-medium text-foreground mb-2" data-testid={`title-${type.id}`}>{type.title}</h3>
                <p className="text-sm text-muted-foreground" data-testid={`description-${type.id}`}>{type.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
