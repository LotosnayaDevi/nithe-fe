import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";

interface Section {
  heading: string;
  content: string;
}

function LegalPage({ title, sections }: { title: string; sections: Section[] }) {
  return (
    <article style="max-width: 1440px; margin: 0 auto; padding: 120px 320px var(--space-24) 320px; text-align: center;">
      <h1
        style="font-size: var(--font-size-xl); font-weight: var(--font-weight-light); letter-spacing: 0; margin-bottom: 100px;"
      >
        {title}
      </h1>

      <div style="display: flex; flex-direction: column; gap: 60px; text-align: left;">
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
  { heading: "Personal Information We Collect", content: "When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site." },
  { heading: "How We Use Your Personal Information", content: "We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to communicate with you.\n\nWe use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site.\n\nWe use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns)." },
  { heading: "Sharing Your Personal Information", content: "We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store.\n\nWe also use Google Analytics to help us understand how our customers use the Site.\n\nFinally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights." },
  { heading: "Your Rights", content: "If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us.\n\nAdditionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States." },
  { heading: "Data Retention", content: "When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information." },
  { heading: "Changes", content: "We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons." },
  { heading: "Contact us", content: "If you have any questions about our refund policy, please do not hesitate to reach out to us at hello@nythestudio.com. We are happy to assist you." },
];

const TERMS_SECTIONS: Section[] = [
  { heading: "Agreement to Terms", content: "By accessing or using the Site, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to all of these Terms and our Privacy Policy, you may not access or use the Site." },
  { heading: "Online Store Terms", content: "By agreeing to these Terms, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.\n\nYou may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws)." },
  { heading: "Intellectual Property", content: "The Site and its original content, features, and functionality are owned by Nyat Studio and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws." },
  { heading: "User Accounts", content: "If you create an account on the Site, you are responsible for maintaining the security of your account and for all activities that occur under the account. You must not describe or assign keywords to your account misleadingly or unlawfully, including in a manner intended to trade on the name or reputation of others." },
  { heading: "Limitation of Liability", content: "In no event shall Nyat Studio, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Site; (ii) any conduct or content of any third party on the Site; (iii) any content obtained from the Site; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose." },
  { heading: "Governing Law", content: "These Terms shall be governed and construed per the laws of The United Kingdom, without regard to its conflict of law provisions." },
  { heading: "Changes", content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 130 days' notice before any new terms take effect. What constitutes a material change will be determined at our sole discretion." },
  { heading: "Contact us", content: "If you have any questions about our refund policy, please do not hesitate to reach out to us at hello@nythestudio.com. We are happy to assist you." },
];

const REFUND_SECTIONS: Section[] = [
  { heading: "Overview", content: "We want you to be completely satisfied with your NYTHE purchase. If for any reason you are not happy with your order, we offer a straightforward return and refund process." },
  { heading: "Return eligibility", content: "Items must be returned within 14 days of delivery. Products must be unworn, unwashed, and in their original condition with all tags attached. Custom-made items are final sale and cannot be returned unless they arrive damaged or defective." },
  { heading: "How to initiate a return", content: "To start a return, please contact us at hello@nythestudio.com with your order number and reason for the return. We will provide you with return shipping instructions and a return authorization number." },
  { heading: "Refund process", content: "Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed to your original payment method within 5-10 business days. Please note that shipping costs are non-refundable." },
  { heading: "Exchanges", content: "We offer exchanges for items of equal value. If you would like to exchange an item for a different size or color, please contact us within 14 days of receiving your order. The exchanged item must meet the same conditions as returns." },
  { heading: "Damaged or defective items", content: "If you receive a damaged or defective item, please contact us immediately at hello@nythestudio.com with photos of the damage. We will arrange a replacement or full refund, including shipping costs, at no additional charge." },
  { heading: "Late or missing refunds", content: "If it has been more than 10 business days after the stated processing time, please check your bank account again and contact your credit card company or bank. If you have done all of this and still have not received your refund, please contact us at hello@nythestudio.com." },
  { heading: "Contact us", content: "If you have any questions about our refund policy, please do not hesitate to reach out to us at hello@nythestudio.com. We are happy to assist you." },
];

const SHIPPING_SECTIONS: Section[] = [
  { heading: "Processing Time", content: "All orders are processed within 3-4 business days (excluding weekends and holidays) after receiving your payment confirmation. You will receive another notification when your order has shipped." },
  { heading: "Shipping Rates and Delivery Estimates", content: "Shipping charges for your order will be calculated and displayed at checkout. We offer various shipping options, including standard and expedited shipping.\nDelivery estimates will be provided at checkout based on your location and the shipping option you select. Please note that delivery times are estimates and are not guaranteed, as they depend on the shipping carrier and other factors beyond our control." },
  { heading: "Shipping Destinations", content: "We currently ship Worldwide we do not ship to P.O. boxes or APO/FPO addresses." },
  { heading: "Customs, Duties, and Taxes", content: "NYTHE is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.)." },
  { heading: "Damages", content: "NYTHE is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier or our support team directly to file a claim. Please save all packaging material and damaged goods before filing a claim." },
  { heading: "International Shipping Policy", content: "We Ship World wide." },
  { heading: "Returns Policy", content: "Please refer to our Returns Policy for information about returning items purchased online." },
  { heading: "Contact us", content: "If you have any questions about our refund policy, please do not hesitate to reach out to us at hello@nythestudio.com. We are happy to assist you." },
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
