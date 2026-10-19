/** Seed + public fallback content for legal pages (from Oriana Word docs). Editable in Admin → Pages. */

export type LegalSection = { heading: string; body: string }

export type LegalPageContent = {
  title: string
  description: string
  sections: readonly LegalSection[]
}

export const privacyLegalPage = {
  title: "Privacy Policy",
  description: "Effective Date: 19 October 2026 \u00b7 Last Updated: 19 October 2026",
  sections: [
    {
      heading: "Introduction",
      body: `ORIANA INVERTERS TECHNOLOGY PRIVATE LIMITED, having its registered office at S No. 119, Flat No. 1003, Saarrthi Serenity, Nav-Nam, Kothrud, Pune, Pune City, Maharashtra, India - 411038 ("Company", "Oriana", "we", "us" or "our"), respects the privacy of individuals who visit or interact with the Company's website, communicate with the Company, enquire about or purchase the Company's products or services, register products or warranties, seek installation or after-sales support, or otherwise provide information to the Company.

This Privacy Policy explains the manner in which the Company may collect, receive, use, process, store, disclose, transfer, retain and protect personal data and other information in connection with the Company's website ("Website"), products, services and business operations.

The Company shall process personal data in accordance with applicable privacy and data-protection laws and regulations, as applicable from time to time. India's Digital Personal Data Protection framework is being implemented through phased commencement. The Digital Personal Data Protection Rules, 2025, and provisions of both the Rules and the Digital Personal Data Protection Act, 2023 are subject to staged commencement.

By accessing or using the Website, submitting information through the Website, contacting the Company or otherwise interacting with the Company, the user acknowledges this Privacy Policy, subject to applicable law.`,
    },
    {
      heading: "Information We May Collect",
      body: `Depending upon the nature of the user's interaction with the Company, the Company may collect personal and business information including the user's name, mobile or telephone number, email address, residential or business address, billing address, delivery or installation address, organisation or business name, GST or other business-related details where necessary, dealer or distributor details, product enquiries, quotation requests, purchase and transaction details, warranty information, product serial numbers, installation information, service requests, complaints, feedback and communications with the Company.

Where applicable, the Company may also collect technical information concerning products installed, registered or serviced, including product model, serial number, battery or inverter configuration, installation location, operating information, service history and other technical information reasonably required for warranty, maintenance, troubleshooting, repair or after-sales support.

When users access the Website, the Company or its authorised technology providers may automatically receive certain technical information, including IP address, browser type, device information, operating system, referring URLs, pages visited, Website usage information, cookies and similar technical data.

The Company shall endeavour to collect only such information as is reasonably necessary for a lawful business purpose or as otherwise permitted or required under applicable law.`,
    },
    {
      heading: "Sources of Personal Data",
      body: `The Company may collect personal data directly from the individual concerned when the individual visits the Website, communicates with the Company, purchases or registers a product, requests installation or servicing, submits a complaint or otherwise interacts with the Company.

Where permitted under applicable law, the Company may also receive relevant information from authorised dealers, distributors, channel partners, installation partners, service partners, business associates, logistics providers or other lawful sources in connection with product enquiries, sales, delivery, installation, product registration, warranty, servicing or customer support.

Where personal information is received from another person or entity, the Company shall endeavour to process such information only for lawful and legitimate purposes connected with the Company's business and in accordance with applicable law.`,
    },
    {
      heading: "Purpose of Processing",
      body: `The Company may process personal information for responding to product and service enquiries, providing quotations, processing and fulfilling orders, managing customer relationships, communicating with customers, registering products, administering warranty support, arranging installation and servicing, resolving complaints, providing technical and after-sales support, managing dealers and distributors, managing suppliers and service providers, processing business transactions, maintaining accounting and statutory records, improving products and services, improving Website functionality, carrying out analytics, preventing fraud or misuse, maintaining security, protecting the Company's legitimate business interests, complying with applicable legal and regulatory requirements, establishing or defending legal claims and carrying out other lawful purposes connected with the Company's business.

Where permitted under applicable law and subject to required consent or preferences, the Company may also process relevant information for communicating product updates, service reminders, offers, promotional information and information concerning new products or services.`,
    },
    {
      heading: "Consent and Withdrawal of Consent",
      body: `Where the processing of personal data is based upon consent, the Company shall seek to obtain consent in accordance with applicable law. Where permitted under applicable law, a person who has provided consent may withdraw such consent through the mechanism made available by the Company or by contacting the Company using the details specified in this Privacy Policy.

Withdrawal of consent shall not affect the lawfulness of personal-data processing undertaken before such withdrawal. Withdrawal may, however, affect the Company's ability to provide a product, service, warranty facility, technical support or other facility where the relevant personal information is reasonably necessary for providing such facility.`,
    },
    {
      heading: "Cookies and Similar Technologies",
      body: `The Website may use cookies, log files, analytics technologies and similar tools to facilitate Website functionality, improve user experience, analyse Website usage, understand visitor preferences, diagnose technical problems and maintain Website security.

Such technologies may collect technical information concerning the user's browser, device, IP address, pages visited, duration of Website usage, referring source and related information. Users may manage or disable cookies through their browser settings, although disabling certain cookies may affect Website functionality.

Where consent is required for particular types of cookies under applicable law, the Company may provide an appropriate consent or preference-management mechanism.`,
    },
    {
      heading: "Disclosure and Sharing of Personal Information",
      body: `The Company may disclose personal information, where reasonably necessary and permitted under applicable law, to the Company's employees, authorised personnel, dealers, distributors, channel partners, installation partners, after-sales service providers, logistics providers, technology providers, Website hosting providers, cloud-service providers, communication providers, professional advisers, auditors, consultants, banks, payment-processing providers and other persons engaged for legitimate business purposes.

Information may also be disclosed to government authorities, regulators, courts, judicial bodies, law-enforcement authorities or other persons where disclosure is required or permitted by applicable law or is reasonably necessary for establishing, exercising or defending legal rights.

In the event of a merger, acquisition, reconstruction, restructuring, reorganisation, sale or transfer of all or any material portion of the Company's business or assets, relevant information may be disclosed or transferred to the proposed or actual successor, purchaser, acquirer or other participating entity, subject to applicable law.

The Company does not sell personal data as a business activity.`,
    },
    {
      heading: "Third-Party Service Providers",
      body: `The Company may engage third parties to provide Website hosting, cloud storage, communications, analytics, payment processing, logistics, installation, customer support, marketing, technical or other services. Such parties may process relevant information to the extent reasonably necessary to perform their functions.

Where appropriate and required under applicable law, the Company shall endeavour to require service providers processing personal data on its behalf to maintain reasonable confidentiality, security and data-protection standards.`,
    },
    {
      heading: "Data Security",
      body: `The Company endeavours to implement appropriate technical, organisational and administrative safeguards having regard to the nature of the personal information processed and associated risks. Such safeguards may include reasonable access controls, information-security procedures, restricted access, monitoring, backup arrangements and other measures intended to protect information against unauthorised access, alteration, disclosure, loss, misuse or destruction.

However, no Website, internet transmission, computer system, server, database or electronic storage arrangement can be guaranteed to be completely secure, and users should exercise reasonable care when transmitting information electronically.`,
    },
    {
      heading: "Personal Data Breach and Security Incidents",
      body: `In the event of a personal data breach or information-security incident affecting personal information, the Company shall endeavour to take such reasonable containment, investigation, assessment, remediation, notification and other measures as may be required under applicable law.`,
    },
    {
      heading: "Retention and Deletion of Personal Information",
      body: `The Company shall endeavour to retain personal information only for as long as reasonably necessary for the purpose for which the information was collected, for fulfilling contractual, warranty or service obligations, for maintaining necessary business and transaction records, for complying with applicable legal, regulatory, accounting or taxation requirements or for establishing, exercising or defending legal claims.

Where personal information is no longer required to be retained for a legitimate or legally mandated purpose, the Company may delete, anonymise, de-identify or otherwise dispose of such information in accordance with applicable law and the Company's internal practices.`,
    },
    {
      heading: "Rights of Individuals",
      body: `Subject to applicable law and the commencement and applicability of relevant statutory provisions, individuals may have rights concerning their personal data, including rights relating to access, correction, updating, completion, erasure and grievance redressal.

Requests concerning personal data may be submitted to the Company through the contact details specified in this Privacy Policy. The Company may require reasonable information or verification of identity before acting upon a request in order to safeguard personal information against unauthorised access, disclosure or alteration.`,
    },
    {
      heading: "Accuracy of Information",
      body: `Users are responsible for ensuring that personal information supplied to the Company is, to the best of their knowledge, accurate, complete and current. Users are requested to notify the Company where material information changes and an update is reasonably required for the purpose for which such information is being processed.`,
    },
    {
      heading: "Children's Personal Data",
      body: `The Website and the Company's products and services are primarily intended for adults, businesses, dealers, distributors and commercial customers and are not specifically directed towards children.

Where the Company knowingly processes personal data relating to a child, the Company shall comply with requirements applicable to such processing under applicable law, including obtaining appropriate consent from a parent or lawful guardian where legally required.`,
    },
    {
      heading: "Marketing Communications",
      body: `Subject to applicable law and user preferences, the Company may communicate information concerning products, services, offers, product launches, maintenance reminders and other business updates. A recipient may request discontinuation of non-essential promotional communications by using the unsubscribe facility provided in the relevant communication, where available, or by contacting the Company.

Opting out of promotional communications shall not prevent the Company from sending essential transactional, warranty, customer-service, safety, security, legal or regulatory communications where reasonably necessary.`,
    },
    {
      heading: "Third-Party Websites and Platforms",
      body: `The Website may contain links to third-party websites, maps, social-media platforms, payment services or other external platforms. Such services may be independently operated and may maintain their own privacy policies and terms.

The Company does not control independent third-party websites and shall not be responsible for their privacy, security or information-processing practices except to the extent responsibility is imposed upon the Company under applicable law. Users are encouraged to review applicable third-party policies before providing information through such services.`,
    },
    {
      heading: "Cross-Border Processing",
      body: `The Company's technology, hosting, cloud or other service arrangements may involve storage or processing of information at locations outside India. Where personal information is processed outside India, the Company shall endeavour to comply with the restrictions, conditions and safeguards applicable to such processing or transfer under applicable law.`,
    },
    {
      heading: "Relationship with Website Terms",
      body: `This Privacy Policy should be read together with the Company's Terms of Use, Disclaimer and other applicable Website policies. In relation to personal-data processing, this Privacy Policy shall govern the Company's privacy practices, subject to applicable law.`,
    },
    {
      heading: "Changes to This Privacy Policy",
      body: `The Company may modify this Privacy Policy from time to time to reflect changes in applicable law, regulatory requirements, technology, Website functionality or the Company's business practices. The revised Privacy Policy shall be made available on the Website with an updated "Last Updated" date.

Users are encouraged to review this Privacy Policy periodically.`,
    },
    {
      heading: "Governing Law and Jurisdiction",
      body: `This Privacy Policy and matters relating to the Company's processing of personal information shall be governed by and construed in accordance with the laws of India. Subject to any rights, remedies, complaint mechanisms or jurisdiction available to an individual under applicable data-protection, consumer-protection or other mandatory provisions of law, the courts and other competent judicial authorities at Pune, Maharashtra, India shall have jurisdiction in relation to disputes arising out of or concerning this Privacy Policy.`,
    },
    {
      heading: "Contact and Grievance Redressal",
      body: `For any privacy-related question, request, complaint or grievance, users may contact:

ORIANA INVERTERS TECHNOLOGY PRIVATE LIMITED
S No. 119, Flat No. 1003, Saarrthi Serenity,
Nav-Nam, Kothrud, Pune, Pune City,
Maharashtra, India - 411038.
Email: sales@orianainverters.com
Phone: +91 91452 28222
Grievance Contact/Officer: Grievance Officer`,
    },
  ],
} as const

export const termsLegalPage = {
  title: "Terms of Use",
  description: "Effective Date: 19 October 2026 \u00b7 Last Updated: 19 October 2026",
  sections: [
    {
      heading: "Introduction and Acceptance",
      body: `These Terms of Use ("Terms") govern access to and use of the website operated by ORIANA INVERTERS TECHNOLOGY PRIVATE LIMITED, having its registered office at S No. 119, Flat No. 1003, Saarrthi Serenity, Nav-Nam, Kothrud, Pune, Pune City, Maharashtra, India - 411038 ("Company", "Oriana", "we", "us" or "our"). By accessing, browsing or using the Website, the user agrees to use the Website in accordance with these Terms and applicable law. A user who does not agree with these Terms should discontinue use of the Website.`,
    },
    {
      heading: "Electronic Record",
      body: `These Terms, together with the Privacy Policy, Disclaimer and other policies made available on the Website, constitute electronic terms governing access to and use of the Website. Subject to applicable law, these Terms do not require a physical, electronic or digital signature merely for their acceptance through use of the Website.`,
    },
    {
      heading: "Eligibility and Authority",
      body: `By using transactional functions of the Website, submitting a commercial request, placing an order where such facility is available, or entering into a transaction with the Company through the Website, the user represents that the user possesses legal capacity to enter into the relevant transaction under applicable law.

Where the Website is accessed or used on behalf of a company, partnership, firm, organisation or other entity, the person accessing or using the Website represents that the person possesses appropriate authority to act on behalf of such entity.`,
    },
    {
      heading: "Nature and Purpose of the Website",
      body: `The Website is intended to provide information concerning the Company and its products and services, which may include inverters, batteries, UPS systems, power-backup products, solar or energy-related products, power-electronic equipment, accessories, installation services, servicing and other related products and services.

The Website may also permit users to submit enquiries, request quotations, submit service or support requests, make dealership or distributorship enquiries, register products or warranties or otherwise communicate with the Company.`,
    },
    {
      heading: "Permitted and Prohibited Use",
      body: `Users shall access and use the Website only for lawful purposes. Users shall not misuse the Website, attempt unauthorised access to the Website or Company's information systems, introduce viruses or malicious code, interfere with Website functionality or security, systematically scrape or harvest Website information without authorisation, impersonate another person or entity, knowingly submit materially false or misleading information, infringe intellectual-property or other legal rights or commercially exploit Website content without appropriate permission.

The Company may restrict or terminate access where it reasonably believes that the Website is being used unlawfully, fraudulently or materially contrary to these Terms, subject to applicable law.`,
    },
    {
      heading: "Product Information and Specifications",
      body: `The Company endeavours to provide accurate product and service information. Nevertheless, photographs, illustrations, specifications, technical data, features, dimensions, capacities, configurations, appearance and colour displayed on the Website may be indicative and subject to change.

Users should confirm the latest product specifications, capacity, compatibility, configuration, availability, installation requirements, warranty conditions and price with the Company or an authorised representative before making a purchase or installation decision.`,
    },
    {
      heading: "Enquiries, Quotations and Formation of Contract",
      body: `Submission of an enquiry, contact form, request for quotation, service request, dealership request or other communication through the Website shall not, by itself, constitute acceptance of an order or formation of a binding contract.

A commercial transaction shall become binding only in accordance with the applicable quotation, purchase order, written order acceptance, invoice, payment terms, supply conditions or other contractual documentation applicable to the relevant transaction.

Where there is any inconsistency between general information displayed on the Website and the specific terms contained in an accepted quotation, purchase order, invoice, warranty, service agreement or other written contract, the specific contractual documentation applicable to the transaction shall prevail to the extent of such inconsistency, subject to applicable law.`,
    },
    {
      heading: "Prices, Taxes and Product Availability",
      body: `Where prices are displayed on the Website, such prices may be subject to applicable GST or other taxes, freight, delivery, installation or other charges unless expressly stated otherwise.

Prices, offers and product availability may change from time to time, subject to applicable law and existing binding commitments. Product availability and delivery estimates may depend upon inventory, manufacturing schedules, geographical location, supply chains, distribution arrangements and logistics.`,
    },
    {
      heading: "Product Installation, Operation and Maintenance",
      body: `Products should be selected, installed, operated, serviced and maintained in accordance with applicable technical specifications, user manuals, installation requirements, safety instructions and warranty conditions.

Improper installation, unauthorised modification, misuse, operation outside specified technical parameters, use of incompatible components or failure to undertake required maintenance may affect the product's performance, safety or applicable warranty coverage in accordance with the relevant warranty terms.`,
    },
    {
      heading: "Product Performance",
      body: `The actual performance, output, efficiency, charging time and backup duration of inverters, batteries, UPS systems, solar systems and related equipment may vary depending upon connected load, battery capacity and condition, electricity-supply conditions, installation, wiring, operating temperature, environment, usage pattern, maintenance and other technical variables.

Performance information appearing on the Website should therefore be read together with the relevant technical documentation and product-specific terms.`,
    },
    {
      heading: "Warranty and After-Sales Service",
      body: `Warranty coverage shall be governed by the warranty terms applicable to the relevant product. Warranty entitlement may be subject to requirements concerning proof of purchase, product serial number, warranty registration where applicable, installation, operating conditions and other conditions stated in applicable warranty documentation.

Nothing in these Terms shall restrict a statutory right or remedy available to a consumer where that right or remedy cannot lawfully be excluded or waived.`,
    },
    {
      heading: "Product and Warranty Registration",
      body: `Where the Website permits product registration, warranty registration, warranty-status verification, service requests or complaint registration, users shall provide accurate product, purchase and contact information.

Submission of a warranty registration, service request or warranty claim through the Website shall not by itself constitute confirmation of warranty eligibility or acceptance of a warranty claim. Eligibility and claims may be subject to verification in accordance with applicable warranty conditions.`,
    },
    {
      heading: "Dealers, Distributors and Other Partners",
      body: `The Company may market, distribute, install or service its products through authorised dealers, distributors, channel partners, installers, service partners or other independent persons.

Unless expressly authorised by the Company in writing, no dealer, distributor, service provider or other third party possesses authority to make a warranty, representation, commitment or undertaking on behalf of the Company beyond the scope of authority expressly conferred upon such person.

Subject to applicable law, independent representations made by third parties which are inconsistent with the Company's official specifications, written warranty or contractual documentation shall not alter the Company's documented product or warranty obligations.`,
    },
    {
      heading: "Intellectual Property Rights",
      body: `The Website and its contents, including the Company's trade name, trademarks, logos, designs, photographs, graphics, product literature, catalogues, text, Website layout and other proprietary materials, are owned by or lawfully licensed to the Company unless otherwise indicated.

Users are granted a limited, revocable, non-exclusive and non-transferable right to access the Website for legitimate personal or business informational purposes. Website content may not be copied, reproduced, republished, modified, distributed, sold, commercially exploited or incorporated into another publication without appropriate permission, except where such use is permitted by applicable law.`,
    },
    {
      heading: "Third-Party Websites and Services",
      body: `The Website may contain links to external websites, payment providers, social-media platforms, maps, dealer platforms or other third-party services.

Such platforms may be independently operated and governed by their own terms and policies. The Company shall not be responsible for the content, practices, security, terms or availability of independent third-party services except to the extent responsibility is imposed on the Company under applicable law.`,
    },
    {
      heading: "User-Submitted Information",
      body: `Users are responsible for ensuring that information submitted to the Company is accurate and that the user possesses appropriate authority to provide such information.

Users shall not knowingly submit unlawful, defamatory, fraudulent, malicious, misleading or rights-infringing material through the Website.

Personal information provided through the Website shall be processed in accordance with the Company's Privacy Policy and applicable law.`,
    },
    {
      heading: "Website Security and Availability",
      body: `Users shall not attempt to circumvent Website security, obtain unauthorised access, test vulnerabilities without authorisation or otherwise impair the Website's operation.

The Company does not guarantee continuous or error-free availability of the Website. The Company may modify, maintain, update, suspend, restrict or discontinue all or part of the Website where reasonably required for operational, technological, security, legal or business reasons.`,
    },
    {
      heading: "Limitation of Liability",
      body: `To the maximum extent permitted under applicable law, the Company shall not be responsible for indirect, incidental, special or consequential losses resulting solely from temporary Website unavailability, reliance upon general Website information, independent third-party services, unauthorised Website misuse or technological failures outside the Company's reasonable control.

Nothing in these Terms shall exclude or restrict a liability, statutory right or remedy where such exclusion or restriction is prohibited by applicable law.`,
    },
    {
      heading: "Indemnification",
      body: `To the extent permitted under applicable law, a user who unlawfully misuses the Website, materially violates these Terms or infringes the rights of the Company or a third party shall be responsible for losses, liabilities, claims and reasonable expenses directly arising from such unlawful conduct, violation or infringement.`,
    },
    {
      heading: "Force Majeure",
      body: `Subject to applicable law and the provisions of any specific contract, the Company shall not be responsible for delay or failure arising from circumstances beyond its reasonable control, including natural disasters, fire, flood, earthquake, governmental restrictions or actions, war, civil disturbance, industrial disputes, epidemic or pandemic conditions, major infrastructure failures, transportation disruption, supply-chain interruption, power failure, telecommunications failure or comparable circumstances outside the Company's reasonable control.`,
    },
    {
      heading: "Privacy",
      body: `Personal information submitted through or in connection with the Website shall be handled in accordance with the Company's Privacy Policy and applicable law.`,
    },
    {
      heading: "Relationship with Other Website Policies",
      body: `These Terms shall be read together with the Company's Privacy Policy, Disclaimer and other policies, notices or terms expressly displayed or incorporated by reference on the Website. The Privacy Policy and Disclaimer shall, to the extent relevant to use of the Website, form part of the general terms governing Website usage.

Where specific written terms apply to a product, quotation, purchase order, warranty, service arrangement, dealership, distributorship or other commercial transaction, those specific terms shall prevail over these general Website Terms to the extent of any inconsistency relating to that transaction, subject to applicable law.`,
    },
    {
      heading: "Modification of Website and Terms",
      body: `The Company may update or modify the Website and these Terms from time to time in order to reflect changes in applicable law, business operations, Website functionality, products, services, technologies or security requirements.

Revised Terms shall be published on the Website together with an updated "Last Updated" date and shall apply in accordance with applicable law.`,
    },
    {
      heading: "Severability",
      body: `If any provision of these Terms is determined by a competent court or authority to be invalid, unlawful or unenforceable, that provision shall be limited or severed to the extent necessary without affecting the validity and enforceability of the remaining provisions.`,
    },
    {
      heading: "No Waiver",
      body: `Failure or delay by the Company in exercising a right or remedy under these Terms shall not constitute a waiver of that right or remedy.`,
    },
    {
      heading: "Entire Website Terms",
      body: `These Terms, together with the Privacy Policy, Disclaimer and other Website policies expressly incorporated by reference, constitute the general terms applicable to access to and use of the Website.

Specific sale, supply, warranty, dealership, distributorship, installation, service or other commercial contracts may contain separate or additional terms governing the particular transaction or business relationship.`,
    },
    {
      heading: "Governing Law and Jurisdiction",
      body: `These Terms, the use of the Website and matters arising out of or relating thereto shall be governed by and construed in accordance with the laws of India.

Subject to any rights, remedies or jurisdiction available to a user under applicable consumer-protection laws or other mandatory provisions of applicable law, the courts and other competent judicial authorities at Pune, Maharashtra, India shall have jurisdiction in respect of disputes arising out of or relating to the Website or these Terms.`,
    },
    {
      heading: "Contact Information",
      body: `For questions regarding these Terms, please contact:

ORIANA INVERTERS TECHNOLOGY PRIVATE LIMITED
S No. 119, Flat No. 1003, Saarrthi Serenity,
Nav-Nam, Kothrud, Pune, Pune City,
Maharashtra, India - 411038.
Email: sales@orianainverters.com
Phone: +91 91452 28222`,
    },
  ],
} as const

export const disclaimerLegalPage = {
  title: "Disclaimer",
  description: "Effective Date: 19 October 2026 \u00b7 Last Updated: 19 October 2026",
  sections: [
    {
      heading: "General Disclaimer",
      body: `The content and information available on the website of ORIANA INVERTERS TECHNOLOGY PRIVATE LIMITED ("Company", "Oriana", "we", "us" or "our") are provided primarily for general informational and business purposes concerning the Company, its products, technologies and services.

While the Company endeavours to ensure that information displayed on the Website is accurate and current, the Company does not represent or warrant that every item of information shall at all times be complete, accurate, current, error-free or suitable for every particular purpose.

Users should independently verify material product, commercial and technical information before making purchase, installation, investment or other decisions based upon Website information.`,
    },
    {
      heading: "Product Information and Specifications",
      body: `Information relating to inverters, batteries, UPS systems, solar products, power-backup systems, power-electronic equipment, accessories and other products displayed on the Website is intended primarily for general information.

Product photographs, illustrations, specifications, descriptions, dimensions, appearance, design, colour, capacity, technical parameters, features, configurations and accessories may be indicative and may vary from actual products. The Company reserves the right to improve or modify its products, technology, specifications, design or configurations from time to time, subject to applicable law and existing contractual commitments.

Users should verify the latest specifications, compatibility, configuration and suitability of a product with the Company or its authorised representative before purchasing, selecting or installing such product.`,
    },
    {
      heading: "Performance, Capacity and Backup Time",
      body: `Actual performance, efficiency, charging time, output and backup time of inverters, batteries, UPS systems, solar systems and other power equipment may vary according to connected electrical load, battery type and capacity, battery age and health, charging conditions, electricity-supply conditions, wiring and installation quality, operating temperature, environmental conditions, frequency and manner of use, maintenance and other technical factors.

Accordingly, any stated or estimated backup time, charging time, energy saving, efficiency, output, performance or similar parameter displayed on the Website should be treated as indicative unless expressly guaranteed under applicable written product specifications, warranty terms or contractual documentation.`,
    },
    {
      heading: "Product Suitability",
      body: `Suitability of an inverter, battery, UPS, solar equipment or other power solution depends upon the customer's particular load, application, electrical infrastructure, installation environment, equipment compatibility and technical requirements.

Information appearing on the Website is general in nature and should not be treated as a substitute for appropriate technical assessment. Users should obtain suitable technical assistance before selecting, configuring or installing equipment where necessary.`,
    },
    {
      heading: "Installation and Electrical Safety",
      body: `Inverters, batteries, solar systems, UPS systems and other electrical equipment may create electrical, fire or other safety risks when incorrectly selected, installed, connected, operated, modified, repaired or maintained.

Products should be installed, operated, serviced and maintained strictly in accordance with applicable product manuals, safety instructions, technical specifications and applicable electrical requirements. Installation, inspection, servicing and repair should be undertaken by appropriately qualified or authorised personnel wherever required.

Website information does not constitute a substitute for professional electrical or technical advice.`,
    },
    {
      heading: "Warranty Disclaimer",
      body: `Any warranty applicable to a product shall be governed by the particular warranty card, warranty policy, invoice, product documentation, contractual terms or other written warranty conditions applicable to that product.

Information appearing on the Website shall not enlarge, amend or replace an express written product warranty unless the Company specifically confirms the variation in writing.

Nothing contained in this Disclaimer is intended to exclude or restrict statutory warranty rights or consumer remedies that cannot lawfully be excluded or restricted.`,
    },
    {
      heading: "Product Registration and Warranty Claims",
      body: `Where the Website provides facilities for product registration, warranty registration, warranty-status verification, service requests or complaint registration, submission of information through such facility shall not in itself constitute confirmation or acceptance of warranty eligibility or a warranty claim.

Warranty eligibility and claims shall remain subject to verification of the product, proof of purchase, applicable warranty period, product serial number, installation and usage conditions and the applicable product-specific warranty terms.`,
    },
    {
      heading: "Dealers, Distributors and Service Partners",
      body: `The Company may market, distribute, install or service products through authorised dealers, distributors, channel partners, installation partners or service partners. Unless expressly authorised by the Company in writing, no dealer, distributor, service provider or other independent third party shall have authority to make representations, warranties, commitments or undertakings on behalf of the Company beyond the scope of authority granted by the Company.

Subject to applicable law, a representation or assurance independently made by a third party which is inconsistent with the Company's official product documentation, written warranty or contractual terms shall not alter the Company's documented specifications or warranty obligations.`,
    },
    {
      heading: "Website Accuracy and Availability",
      body: `The Company does not guarantee that the Website will operate continuously, uninterrupted or error-free. The Website may be temporarily unavailable because of maintenance, technological issues, upgrades, security measures or circumstances outside the Company's reasonable control.

The Company reserves the right to correct typographical, technical, pricing or factual errors appearing on the Website, subject to applicable law and any binding transaction already concluded.`,
    },
    {
      heading: "Third-Party Links and Information",
      body: `The Website may contain links to third-party websites, social-media platforms, maps, payment platforms or other external services for convenience or informational purposes.

The inclusion of a link does not necessarily constitute endorsement by the Company. The Company does not control independent third-party websites and shall not be responsible for their content, policies, availability or security except to the extent required under applicable law.`,
    },
    {
      heading: "Intellectual Property",
      body: `Names, logos, trademarks, trade names, photographs, product literature, graphics, Website designs and other intellectual property displayed on the Website are owned by or lawfully licensed to the Company or belong to the respective rights holders.

Access to the Website does not confer any licence or right to reproduce, distribute or commercially exploit such intellectual property except with appropriate authorisation or as otherwise permitted by applicable law.`,
    },
    {
      heading: "Limitation of Liability",
      body: `To the maximum extent permitted under applicable law, the Company shall not be liable for indirect, incidental, special, consequential or similar losses resulting solely from reliance upon general Website information, temporary Website unavailability, independent third-party services or circumstances outside the Company's reasonable control.

Nothing contained in this Disclaimer shall exclude or restrict any liability, right or remedy where such exclusion or restriction is prohibited under applicable law.`,
    },
    {
      heading: "Force Majeure",
      body: `Subject to applicable law and specific contractual obligations, the Company shall not be responsible for delay or failure attributable to circumstances beyond the Company's reasonable control, including natural disasters, fire, flood, earthquake, governmental restrictions or actions, war, civil disturbance, industrial dispute, epidemic or pandemic conditions, major infrastructure failure, transportation disruption, supply-chain interruption, power interruption, telecommunications failure or other comparable events outside the Company's reasonable control.`,
    },
    {
      heading: "Governing Law and Jurisdiction",
      body: `This Disclaimer and matters arising out of or relating to the use of the Website shall be governed by and construed in accordance with the laws of India.

Subject to rights, remedies or jurisdiction available under applicable consumer-protection legislation or other mandatory provisions of law, the courts and other competent judicial authorities at Pune, Maharashtra, India shall have jurisdiction in respect of disputes arising out of or relating to the Website or this Disclaimer.`,
    },
    {
      heading: "Contact Information",
      body: `ORIANA INVERTERS TECHNOLOGY PRIVATE LIMITED
S No. 119, Flat No. 1003, Saarrthi Serenity,
Nav-Nam, Kothrud, Pune, Pune City,
Maharashtra, India - 411038.
Email: sales@orianainverters.com
Phone: +91 91452 28222`,
    },
  ],
} as const

export const legalPagesBySlug = {
  privacy: privacyLegalPage,
  terms: termsLegalPage,
  disclaimer: disclaimerLegalPage,
} as const
