export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'email' | 'date';
  required: boolean;
  default?: string;
  options?: string[];
}

export interface ContractTemplate {
  title: string;
  description: string;
  fields: FormField[];
  template: string;
}

export const CONTRACT_TEMPLATES: Record<string, ContractTemplate> = {
  'nda': {
    title: 'Non-Disclosure Agreement',
    description: 'Protect confidential information and trade secrets',
    fields: [
      { id: 'disclosingPartyName', label: 'Disclosing Party Name', type: 'text', required: true },
      { id: 'disclosingPartyCompany', label: 'Disclosing Party Company', type: 'text', required: true },
      { id: 'receivingPartyName', label: 'Receiving Party Name', type: 'text', required: true },
      { id: 'receivingPartyCompany', label: 'Receiving Party Company', type: 'text', required: false },
      { id: 'projectDescription', label: 'Purpose/Project Description', type: 'textarea', required: true },
      { id: 'confidentialityPeriod', label: 'Confidentiality Period (years)', type: 'number', required: true, default: '3' },
      { id: 'jurisdiction', label: 'Governing Law (State/Country)', type: 'text', required: true, default: 'United States' }
    ],
    template: ''
  },
  
  'service': {
    title: 'Service Agreement',
    description: 'General service contracts with payment terms',
    fields: [
      { id: 'serviceProviderName', label: 'Service Provider Name', type: 'text', required: true },
      { id: 'serviceProviderCompany', label: 'Service Provider Company', type: 'text', required: true },
      { id: 'clientName', label: 'Client Name', type: 'text', required: true },
      { id: 'clientCompany', label: 'Client Company', type: 'text', required: true },
      { id: 'serviceDescription', label: 'Scope of Work', type: 'textarea', required: true },
      { id: 'paymentAmount', label: 'Total Amount ($)', type: 'number', required: true },
      { id: 'paymentSchedule', label: 'Payment Schedule', type: 'select', required: true, options: ['Net 30', 'Net 15', '50% upfront, 50% on completion', 'Monthly installments'] },
      { id: 'projectDeadline', label: 'Project Deadline', type: 'date', required: true },
      { id: 'revisionLimit', label: 'Number of Revisions Included', type: 'number', required: true, default: '3' },
      { id: 'latePaymentPenalty', label: 'Late Payment Penalty (%)', type: 'number', required: true, default: '1.5' }
    ],
    template: ''
  },

  'freelance': {
    title: 'Freelance Contract',
    description: 'Independent contractor agreements',
    fields: [
      { id: 'freelancerName', label: 'Freelancer Name', type: 'text', required: true },
      { id: 'freelancerAddress', label: 'Freelancer Address', type: 'textarea', required: true },
      { id: 'clientName', label: 'Client Name', type: 'text', required: true },
      { id: 'clientCompany', label: 'Client Company', type: 'text', required: true },
      { id: 'projectDescription', label: 'Project Description', type: 'textarea', required: true },
      { id: 'deliverables', label: 'Deliverables', type: 'textarea', required: true },
      { id: 'paymentType', label: 'Payment Type', type: 'select', required: true, options: ['Fixed Project Rate', 'Hourly Rate'] },
      { id: 'paymentAmount', label: 'Amount ($)', type: 'number', required: true },
      { id: 'invoiceSchedule', label: 'Invoice Schedule', type: 'select', required: true, options: ['Upon completion', 'Weekly', 'Bi-weekly', 'Monthly'] },
      { id: 'intellectualPropertyRights', label: 'Intellectual Property Rights', type: 'select', required: true, options: ['Transfer to client upon payment', 'Retained by freelancer', 'Shared ownership'] }
    ],
    template: ''
  },

  'web-dev': {
    title: 'Website Development Contract',
    description: 'Web development project contracts',
    fields: [
      { id: 'developerName', label: 'Developer/Agency Name', type: 'text', required: true },
      { id: 'developerCompany', label: 'Developer/Agency Company', type: 'text', required: true },
      { id: 'clientName', label: 'Client Name', type: 'text', required: true },
      { id: 'clientCompany', label: 'Client Company', type: 'text', required: true },
      { id: 'websiteSpecs', label: 'Website Specifications', type: 'textarea', required: true },
      { id: 'numberOfPages', label: 'Number of Pages', type: 'number', required: true },
      { id: 'features', label: 'Key Features', type: 'textarea', required: true },
      { id: 'timeline', label: 'Project Timeline (weeks)', type: 'number', required: true },
      { id: 'totalCost', label: 'Total Project Cost ($)', type: 'number', required: true },
      { id: 'depositPercent', label: 'Deposit Percentage (%)', type: 'number', required: true, default: '50' },
      { id: 'hostingMaintenance', label: 'Hosting & Maintenance', type: 'select', required: true, options: ['Included for 1 year', 'Client responsibility', 'Available as add-on service'] },
      { id: 'contentResponsibility', label: 'Content Responsibility', type: 'select', required: true, options: ['Client provides all content', 'Developer creates content', 'Mixed responsibility'] }
    ],
    template: ''
  },

  'graphic-design': {
    title: 'Graphic Design Contract',
    description: 'Design services and creative work contracts',
    fields: [
      { id: 'designerName', label: 'Designer Name', type: 'text', required: true },
      { id: 'designerCompany', label: 'Designer Company', type: 'text', required: false },
      { id: 'clientName', label: 'Client Name', type: 'text', required: true },
      { id: 'clientCompany', label: 'Client Company', type: 'text', required: true },
      { id: 'designType', label: 'Type of Design Work', type: 'select', required: true, options: ['Logo Design', 'Brand Identity', 'Marketing Materials', 'Web Graphics', 'Print Design', 'Packaging Design', 'Other'] },
      { id: 'projectDescription', label: 'Project Description', type: 'textarea', required: true },
      { id: 'deliverables', label: 'Deliverables & File Formats', type: 'textarea', required: true },
      { id: 'numberOfConcepts', label: 'Number of Initial Concepts', type: 'number', required: true, default: '3' },
      { id: 'revisionRounds', label: 'Revision Rounds Included', type: 'number', required: true, default: '3' },
      { id: 'totalFee', label: 'Total Design Fee ($)', type: 'number', required: true },
      { id: 'timeline', label: 'Project Timeline (days)', type: 'number', required: true },
      { id: 'usageRights', label: 'Usage Rights', type: 'select', required: true, options: ['Unlimited usage rights', 'Limited commercial use', 'Personal use only', 'Exclusive rights'] }
    ],
    template: ''
  },

  'content-writing': {
    title: 'Content Writing Contract',
    description: 'Writing and content creation services',
    fields: [
      { id: 'writerName', label: 'Writer Name', type: 'text', required: true },
      { id: 'writerCompany', label: 'Writer Company', type: 'text', required: false },
      { id: 'clientName', label: 'Client Name', type: 'text', required: true },
      { id: 'clientCompany', label: 'Client Company', type: 'text', required: true },
      { id: 'contentType', label: 'Content Type', type: 'select', required: true, options: ['Blog Posts', 'Website Copy', 'Marketing Copy', 'Technical Writing', 'Social Media Content', 'Email Marketing', 'Product Descriptions', 'Other'] },
      { id: 'contentDescription', label: 'Content Description', type: 'textarea', required: true },
      { id: 'wordCount', label: 'Word Count per Piece', type: 'number', required: true },
      { id: 'articleCount', label: 'Number of Articles/Pieces', type: 'number', required: true },
      { id: 'researchRequired', label: 'Research Requirements', type: 'textarea', required: false },
      { id: 'revisionRounds', label: 'Revision Rounds Included', type: 'number', required: true, default: '2' },
      { id: 'paymentPerPiece', label: 'Payment per Piece ($)', type: 'number', required: true },
      { id: 'deliverySchedule', label: 'Delivery Schedule', type: 'select', required: true, options: ['All at once', 'Weekly delivery', 'Bi-weekly delivery', 'Monthly delivery'] },
      { id: 'usageRights', label: 'Usage Rights', type: 'select', required: true, options: ['Exclusive rights to client', 'Non-exclusive usage', 'Writer retains some rights'] }
    ],
    template: ''
  },

  'consulting': {
    title: 'Consulting Agreement',
    description: 'Professional consultation services',
    fields: [
      { id: 'consultantName', label: 'Consultant Name', type: 'text', required: true },
      { id: 'consultantCompany', label: 'Consulting Company', type: 'text', required: false },
      { id: 'clientName', label: 'Client Name', type: 'text', required: true },
      { id: 'clientCompany', label: 'Client Company', type: 'text', required: true },
      { id: 'consultingServices', label: 'Consulting Services Description', type: 'textarea', required: true },
      { id: 'objectives', label: 'Project Objectives', type: 'textarea', required: true },
      { id: 'paymentStructure', label: 'Payment Structure', type: 'select', required: true, options: ['Hourly Rate', 'Fixed Project Fee', 'Monthly Retainer', 'Performance-based'] },
      { id: 'rate', label: 'Rate/Fee ($)', type: 'number', required: true },
      { id: 'estimatedHours', label: 'Estimated Hours (if hourly)', type: 'number', required: false },
      { id: 'projectDuration', label: 'Project Duration', type: 'text', required: true },
      { id: 'deliverables', label: 'Expected Deliverables', type: 'textarea', required: true },
      { id: 'meetingFrequency', label: 'Meeting Frequency', type: 'select', required: true, options: ['Weekly', 'Bi-weekly', 'Monthly', 'As needed', 'Milestone-based'] }
    ],
    template: ''
  },

  'payment-terms': {
    title: 'Payment Terms Agreement',
    description: 'Standalone payment and billing agreements',
    fields: [
      { id: 'serviceProviderName', label: 'Service Provider Name', type: 'text', required: true },
      { id: 'serviceProviderCompany', label: 'Service Provider Company', type: 'text', required: true },
      { id: 'clientName', label: 'Client Name', type: 'text', required: true },
      { id: 'clientCompany', label: 'Client Company', type: 'text', required: true },
      { id: 'serviceDescription', label: 'Services/Products Description', type: 'textarea', required: true },
      { id: 'paymentTerms', label: 'Payment Terms', type: 'select', required: true, options: ['Net 15', 'Net 30', 'Net 45', 'Due on receipt', '50% upfront, 50% on completion'] },
      { id: 'latePaymentFee', label: 'Late Payment Fee (%)', type: 'number', required: true, default: '1.5' },
      { id: 'acceptedPaymentMethods', label: 'Accepted Payment Methods', type: 'textarea', required: true, default: 'Bank transfer, check, credit card' },
      { id: 'invoiceFrequency', label: 'Invoice Frequency', type: 'select', required: true, options: ['Per project', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly'] },
      { id: 'disputeResolution', label: 'Dispute Resolution', type: 'select', required: true, options: ['Direct negotiation', 'Mediation', 'Arbitration', 'Legal proceedings'] }
    ],
    template: ''
  }
};

export function generateContractContent(contractType: string, formData: Record<string, any>): string {
  // This mirrors the server-side logic for client-side preview
  const templates: Record<string, string> = {
    'nda': `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on [DATE] between [DISCLOSING_PARTY_NAME] of [DISCLOSING_PARTY_COMPANY] ("Disclosing Party") and [RECEIVING_PARTY_NAME][RECEIVING_PARTY_COMPANY_TEXT] ("Receiving Party") for the purpose of [PROJECT_DESCRIPTION].

1. DEFINITION OF CONFIDENTIAL INFORMATION
Confidential Information includes all written, electronic, or oral information disclosed by the Disclosing Party to the Receiving Party, including but not limited to: technical data, trade secrets, know-how, research, product plans, products, services, customers, customer lists, markets, software, developments, inventions, processes, formulas, technology, designs, drawings, engineering, hardware configuration information, marketing, finances, or other business information.

2. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to:
a) Hold all Confidential Information in strict confidence
b) Not disclose Confidential Information to third parties without prior written consent
c) Use Confidential Information solely for the purpose stated above
d) Take reasonable precautions to protect the confidentiality of the information

3. TERM
This Agreement shall remain in effect for [CONFIDENTIALITY_PERIOD] years from the date of signing.

4. RETURN OF MATERIALS
Upon termination of this Agreement, the Receiving Party shall return or destroy all materials containing Confidential Information.

5. GOVERNING LAW
This Agreement shall be governed by the laws of [JURISDICTION].

IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.

Disclosing Party: _________________________
[DISCLOSING_PARTY_NAME]
[DISCLOSING_PARTY_COMPANY]

Receiving Party: _________________________  
[RECEIVING_PARTY_NAME]
[RECEIVING_PARTY_COMPANY]`,

    'service': `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on [DATE] between [SERVICE_PROVIDER_NAME] of [SERVICE_PROVIDER_COMPANY] ("Service Provider") and [CLIENT_NAME] of [CLIENT_COMPANY] ("Client").

1. SERVICES
The Service Provider agrees to provide the following services:
[SERVICE_DESCRIPTION]

2. COMPENSATION
Total compensation: $[PAYMENT_AMOUNT]
Payment terms: [PAYMENT_SCHEDULE]

3. TIMELINE
Project completion deadline: [PROJECT_DEADLINE]

4. REVISIONS
The scope includes [REVISION_LIMIT] rounds of revisions. Additional revisions will be billed at the Service Provider's standard hourly rate.

5. LATE PAYMENT
Late payments are subject to a [LATE_PAYMENT_PENALTY]% monthly service charge.

6. TERMINATION
Either party may terminate this agreement with 30 days written notice.

7. INTELLECTUAL PROPERTY
Upon full payment, all work product becomes the property of the Client.

Service Provider: _________________________
[SERVICE_PROVIDER_NAME]
[SERVICE_PROVIDER_COMPANY]

Client: _________________________
[CLIENT_NAME]  
[CLIENT_COMPANY]`,

    'freelance': `FREELANCE CONTRACT

This Freelance Agreement ("Agreement") is entered into on [DATE] between [FREELANCER_NAME], located at [FREELANCER_ADDRESS] ("Freelancer") and [CLIENT_NAME] of [CLIENT_COMPANY] ("Client").

1. PROJECT DESCRIPTION
[PROJECT_DESCRIPTION]

2. DELIVERABLES
The Freelancer will provide:
[DELIVERABLES]

3. COMPENSATION
Payment structure: [PAYMENT_TYPE]
Amount: $[PAYMENT_AMOUNT]
Invoice schedule: [INVOICE_SCHEDULE]

4. INTELLECTUAL PROPERTY
[INTELLECTUAL_PROPERTY_RIGHTS]

5. INDEPENDENT CONTRACTOR STATUS
Freelancer is an independent contractor and not an employee of Client.

6. CONFIDENTIALITY
Freelancer agrees to maintain confidentiality of all Client information.

Freelancer: _________________________
[FREELANCER_NAME]

Client: _________________________
[CLIENT_NAME]
[CLIENT_COMPANY]`,
  };

  const template = templates[contractType];
  if (!template) {
    return `Contract template for ${contractType} not found.`;
  }

  let contractText = template;

  // Replace date
  contractText = contractText.replace(/\[DATE\]/g, new Date().toLocaleDateString());

  // Replace all form field placeholders
  Object.keys(formData).forEach(key => {
    const placeholder = '[' + key.toUpperCase().replace(/([A-Z])/g, '_$1').replace(/^_/, '') + ']';
    const value = formData[key] || '';
    contractText = contractText.replace(new RegExp(placeholder, 'g'), value);
  });

  // Handle special formatting
  contractText = handleSpecialFormatting(contractText, formData);

  return contractText;
}

function handleSpecialFormatting(text: string, formData: Record<string, any>): string {
  // Handle company text formatting
  if (formData.receivingPartyCompany) {
    text = text.replace('[RECEIVING_PARTY_COMPANY_TEXT]', ` of ${formData.receivingPartyCompany}`);
  } else {
    text = text.replace('[RECEIVING_PARTY_COMPANY_TEXT]', '');
  }

  // Handle other special formatting as needed...

  return text;
}
