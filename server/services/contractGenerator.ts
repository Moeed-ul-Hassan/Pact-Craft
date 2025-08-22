export function generateContract(contractType: string, formData: Record<string, any>): string {
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

    'web-dev': `WEBSITE DEVELOPMENT CONTRACT

This Website Development Agreement ("Agreement") is entered into on [DATE] between [DEVELOPER_NAME] of [DEVELOPER_COMPANY] ("Developer") and [CLIENT_NAME] of [CLIENT_COMPANY] ("Client").

1. PROJECT SCOPE
Website specifications: [WEBSITE_SPECS]
Number of pages: [NUMBER_OF_PAGES]
Key features: [FEATURES]

2. TIMELINE
Estimated completion: [TIMELINE] weeks from project start date

3. PAYMENT TERMS
Total cost: $[TOTAL_COST]
Deposit: [DEPOSIT_PERCENT]% ($[DEPOSIT_AMOUNT]) due upon signing
Remaining balance due upon completion

4. HOSTING AND MAINTENANCE
[HOSTING_MAINTENANCE]

5. CONTENT
[CONTENT_RESPONSIBILITY]

6. TESTING AND APPROVAL
Client has 7 days to test and approve deliverables. Silence is deemed acceptance.

7. WARRANTY
Developer provides 30-day warranty on functionality bugs.

Developer: _________________________
[DEVELOPER_NAME]
[DEVELOPER_COMPANY]

Client: _________________________
[CLIENT_NAME]
[CLIENT_COMPANY]`,

    'graphic-design': `GRAPHIC DESIGN CONTRACT

This Graphic Design Agreement ("Agreement") is entered into on [DATE] between [DESIGNER_NAME][DESIGNER_COMPANY_TEXT] ("Designer") and [CLIENT_NAME] of [CLIENT_COMPANY] ("Client").

1. PROJECT DETAILS
Type of work: [DESIGN_TYPE]
Description: [PROJECT_DESCRIPTION]

2. DELIVERABLES
[DELIVERABLES]

3. DESIGN PROCESS
Initial concepts: [NUMBER_OF_CONCEPTS]
Revision rounds: [REVISION_ROUNDS]
Additional revisions will be billed at $75/hour

4. TIMELINE
Project completion: [TIMELINE] days from approval of this contract

5. PAYMENT
Total fee: $[TOTAL_FEE]
Payment schedule: 50% deposit, 50% upon completion

6. USAGE RIGHTS
[USAGE_RIGHTS]

7. COPYRIGHT
Designer retains copyright until final payment is received.

Designer: _________________________
[DESIGNER_NAME]
[DESIGNER_COMPANY]

Client: _________________________
[CLIENT_NAME]
[CLIENT_COMPANY]`,

    'content-writing': `CONTENT WRITING CONTRACT

This Content Writing Agreement ("Agreement") is entered into on [DATE] between [WRITER_NAME][WRITER_COMPANY_TEXT] ("Writer") and [CLIENT_NAME] of [CLIENT_COMPANY] ("Client").

1. CONTENT SPECIFICATIONS
Content type: [CONTENT_TYPE]
Description: [CONTENT_DESCRIPTION]
Word count per piece: [WORD_COUNT] words
Total pieces: [ARTICLE_COUNT]

2. RESEARCH REQUIREMENTS
[RESEARCH_REQUIREMENTS]

3. DELIVERY SCHEDULE
[DELIVERY_SCHEDULE]

4. REVISIONS
[REVISION_ROUNDS] rounds of revisions included per piece
Additional revisions: $50 per round

5. PAYMENT TERMS
Rate: $[PAYMENT_PER_PIECE] per piece
Total project value: $[TOTAL_PROJECT_VALUE]
Payment: Net 15 terms

6. USAGE RIGHTS
[USAGE_RIGHTS]

7. CONTENT STANDARDS
All content will be original, grammatically correct, and optimized for the intended audience.

Writer: _________________________
[WRITER_NAME]
[WRITER_COMPANY]

Client: _________________________
[CLIENT_NAME]
[CLIENT_COMPANY]`,

    'consulting': `CONSULTING AGREEMENT

This Consulting Agreement ("Agreement") is entered into on [DATE] between [CONSULTANT_NAME][CONSULTANT_COMPANY_TEXT] ("Consultant") and [CLIENT_NAME] of [CLIENT_COMPANY] ("Client").

1. CONSULTING SERVICES
The Consultant agrees to provide the following services:
[CONSULTING_SERVICES]

2. PROJECT OBJECTIVES
[OBJECTIVES]

3. DELIVERABLES
[DELIVERABLES]

4. COMPENSATION
Payment structure: [PAYMENT_STRUCTURE]
Rate/Fee: $[RATE][ESTIMATED_HOURS_TEXT]

5. PROJECT DURATION
[PROJECT_DURATION]

6. MEETINGS AND COMMUNICATION
Meeting frequency: [MEETING_FREQUENCY]

7. INDEPENDENT CONTRACTOR
Consultant is an independent contractor and not an employee of Client.

8. CONFIDENTIALITY
Consultant agrees to maintain strict confidentiality of all Client information and business matters.

9. TERMINATION
Either party may terminate this agreement with 30 days written notice.

Consultant: _________________________
[CONSULTANT_NAME]
[CONSULTANT_COMPANY]

Client: _________________________
[CLIENT_NAME]
[CLIENT_COMPANY]`,

    'payment-terms': `PAYMENT TERMS AGREEMENT

This Payment Terms Agreement ("Agreement") is entered into on [DATE] between [SERVICE_PROVIDER_NAME] of [SERVICE_PROVIDER_COMPANY] ("Provider") and [CLIENT_NAME] of [CLIENT_COMPANY] ("Client").

1. SERVICES/PRODUCTS
[SERVICE_DESCRIPTION]

2. PAYMENT TERMS
Standard payment terms: [PAYMENT_TERMS]
Invoice frequency: [INVOICE_FREQUENCY]

3. ACCEPTED PAYMENT METHODS
[ACCEPTED_PAYMENT_METHODS]

4. LATE PAYMENT
Late payment fee: [LATE_PAYMENT_FEE]% per month on outstanding balances
Accounts over 60 days overdue may be subject to collection proceedings

5. DISPUTE RESOLUTION
Payment disputes will be resolved through: [DISPUTE_RESOLUTION]

6. MODIFICATION
Payment terms may only be modified in writing with both parties' consent.

7. GOVERNING LAW
This agreement is governed by applicable commercial law.

Service Provider: _________________________
[SERVICE_PROVIDER_NAME]
[SERVICE_PROVIDER_COMPANY]

Client: _________________________
[CLIENT_NAME]
[CLIENT_COMPANY]`
  };

  const template = templates[contractType];
  if (!template) {
    throw new Error(`Unknown contract type: ${contractType}`);
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

  if (formData.designerCompany) {
    text = text.replace('[DESIGNER_COMPANY_TEXT]', ` of ${formData.designerCompany}`);
  } else {
    text = text.replace('[DESIGNER_COMPANY_TEXT]', '');
  }

  if (formData.writerCompany) {
    text = text.replace('[WRITER_COMPANY_TEXT]', ` of ${formData.writerCompany}`);
  } else {
    text = text.replace('[WRITER_COMPANY_TEXT]', '');
  }

  if (formData.consultantCompany) {
    text = text.replace('[CONSULTANT_COMPANY_TEXT]', ` of ${formData.consultantCompany}`);
  } else {
    text = text.replace('[CONSULTANT_COMPANY_TEXT]', '');
  }

  // Calculate deposit amount for web development
  if (formData.totalCost && formData.depositPercent) {
    const depositAmount = (parseFloat(formData.totalCost) * parseFloat(formData.depositPercent) / 100).toFixed(2);
    text = text.replace('[DEPOSIT_AMOUNT]', depositAmount);
  }

  // Calculate total project value for content writing
  if (formData.paymentPerPiece && formData.articleCount) {
    const totalValue = (parseFloat(formData.paymentPerPiece) * parseInt(formData.articleCount)).toFixed(2);
    text = text.replace('[TOTAL_PROJECT_VALUE]', totalValue);
  }

  // Handle estimated hours text for consulting
  if (formData.estimatedHours && formData.paymentStructure === 'Hourly Rate') {
    text = text.replace('[ESTIMATED_HOURS_TEXT]', ` (Est. ${formData.estimatedHours} hours)`);
  } else {
    text = text.replace('[ESTIMATED_HOURS_TEXT]', '');
  }

  // Handle research requirements
  if (formData.researchRequired) {
    text = text.replace('[RESEARCH_REQUIREMENTS]', formData.researchRequired);
  } else {
    text = text.replace('[RESEARCH_REQUIREMENTS]', 'No specific research requirements specified.');
  }

  return text;
}