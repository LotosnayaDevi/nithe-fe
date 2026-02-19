import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";

interface Section {
  heading: string;
  content: string;
}

function LegalPage({ title, sections }: { title: string; sections: Section[] }) {
  return (
    <article style="max-width: 48rem; margin: 0 auto; padding: var(--space-24) var(--page-padding);">
      <h1
        className="uppercase"
        style="font-size: var(--font-size-xl); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-widest); margin-bottom: var(--space-12);"
      >
        {title}
      </h1>

      <div style="display: flex; flex-direction: column; gap: var(--space-8);">
        {sections.map((section) => (
          <div>
            <h2 style="font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); margin-bottom: var(--space-4);">
              {section.heading}
            </h2>
            <p style="font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.7;">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function renderLegal(title: string, activePath: string, sections: Section[]): string {
  return Page({
    title: `${title} — NYTHE`,
    bodyClass: "woocommerce page",
    children: (
      <>
        <Nav activePath={activePath} />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">
          <LegalPage title={title} sections={sections} />
        </main>
        <Footer />
      </>
    ),
  });
}

const PRIVACY_SECTIONS: Section[] = [
  { heading: "Personal Information We Collect", content: "When you visit our site, we automatically collect certain information about your device, including your browser type, IP address, time zone, and some of the cookies installed on your device." },
  { heading: "How We Use Your Personal Information", content: "We use the order information we collect to fulfill any orders placed through the site, including processing payment, arranging shipping, and providing order confirmations." },
  { heading: "Sharing Your Personal Information", content: "We share your personal information with third parties to help us use your data as described above. We use analytics services to understand how customers use our store." },
  { heading: "Your Rights", content: "If you are a European resident, you have the right to access the personal information we hold about you and to ask that it be corrected, updated, or deleted." },
  { heading: "Data Retention", content: "When you place an order through our site, we will maintain your order information for our records unless and until you ask us to delete this information." },
  { heading: "Changes", content: "We may update this privacy policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons." },
  { heading: "Contact us", content: "For more information about our privacy practices or if you have questions, please contact us by email at Nythe@brand.com." },
];

const TERMS_SECTIONS: Section[] = [
  { heading: "Agreement to Terms", content: "By accessing or using our website you agree to be bound by these terms of service and all applicable laws and regulations. If you do not agree, you are prohibited from using this site." },
  { heading: "Online Store Terms", content: "By agreeing to these terms, you represent that you are at least the age of majority in your jurisdiction. You may not use our products for any illegal or unauthorized purpose." },
  { heading: "Intellectual Property", content: "All content on this site, including text, graphics, logos, images, and software, is the property of NYTHE and is protected by international copyright laws." },
  { heading: "User Accounts", content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account." },
  { heading: "Limitation of Liability", content: "In no case shall NYTHE, our directors, officers, employees, or agents be liable for any injury, loss, claim, or direct, indirect, incidental, or consequential damages of any kind." },
  { heading: "Governing Law", content: "These terms and conditions are governed by and construed in accordance with the laws of Ukraine, and you irrevocably submit to the exclusive jurisdiction of the courts in that location." },
  { heading: "Changes", content: "We reserve the right to update, change, or replace any part of these terms of service by posting updates to our website. Continued use constitutes acceptance." },
  { heading: "Contact us", content: "Questions about the terms of service should be sent to us at Nythe@brand.com." },
];

const REFUND_SECTIONS: Section[] = [
  { heading: "Overview", content: "We want you to be completely satisfied with your purchase. If you are not happy with your order, we are here to help with returns and exchanges within our policy guidelines." },
  { heading: "Return eligibility", content: "Items must be returned within 14 days of delivery. They must be unworn, unwashed, and in their original packaging with all tags attached." },
  { heading: "How to initiate a return", content: "To start a return, please contact us at Nythe@brand.com with your order number and the reason for return. We will provide you with a return shipping label and instructions." },
  { heading: "Refund process", content: "Once your return is received and inspected, we will notify you of the approval or rejection. Approved refunds are processed within 5-10 business days to your original payment method." },
  { heading: "Exchanges", content: "If you need a different size or color, please contact us. We will arrange the exchange once we receive the original item back at our warehouse." },
  { heading: "Damaged or defective items", content: "If you receive a damaged or defective item, please contact us immediately with photos. We will arrange a replacement or full refund at no additional cost to you." },
  { heading: "Late or missing refunds", content: "If you have not received your refund yet, first check with your bank or credit card company. There is often a processing period before a refund is posted." },
  { heading: "Contact us", content: "If you have any further questions about refunds, please reach out to us at Nythe@brand.com." },
];

const SHIPPING_SECTIONS: Section[] = [
  { heading: "Processing Time", content: "Orders are processed within 2-5 business days. During high-demand periods, processing may take up to 7 business days. You will receive a confirmation email once your order ships." },
  { heading: "Shipping Rates and Delivery Estimates", content: "Shipping charges are calculated at checkout based on weight, dimensions, and destination. Estimated delivery times vary by location and are provided during the checkout process." },
  { heading: "Shipping Destinations", content: "We currently ship to most countries worldwide. Some remote locations may have limited shipping options or longer delivery estimates." },
  { heading: "Customs, Duties, and Taxes", content: "International orders may be subject to import taxes, customs duties, and fees levied by the destination country. These charges are the responsibility of the recipient." },
  { heading: "Damages", content: "If your order arrives damaged, please contact us within 48 hours of delivery with photos of the damage. We will work with you to resolve the issue promptly." },
  { heading: "International Shipping Policy", content: "We are not responsible for delays caused by customs processing. Delivery estimates for international orders do not include potential customs delays." },
  { heading: "Returns Policy", content: "For information on returning shipped items, please refer to our refund policy page. Return shipping costs are the responsibility of the customer unless the item is defective." },
  { heading: "Contact us", content: "For shipping inquiries, please contact us at Nythe@brand.com." },
];

export function renderPrivacy(): string {
  return renderLegal("Privacy Policy", "/privacy", PRIVACY_SECTIONS);
}

export function renderTerms(): string {
  return renderLegal("Terms of Service", "/terms", TERMS_SECTIONS);
}

export function renderRefund(): string {
  return renderLegal("Refund Policy", "/refund", REFUND_SECTIONS);
}

export function renderShipping(): string {
  return renderLegal("Shipping Policy", "/shipping", SHIPPING_SECTIONS);
}
