// components/faq/FAQPage.tsx
import AlertBanner from "./alertbanner";
import ContactMap from "./contactmap";
import FAQAccordion from "./faqaccordion";
import { alertMessage, showroom, quickHelp, socialLinks } from "./faqData";
import QuickHelp from "./quickhelp";
import SendMessage from "./sendmessage";
import ShowroomInfo from "./showroominfo";
import SocialLinks from "./sociallinks";

export default function FAQPage() {
  return (
    <div className="section-padding-y">
      <span className="inline-block bg-primary text-background font-medium px-3 py-1 rounded mb-3">
        FAQ
      </span>

      <h1 className="mb-6">
        Frequently Asked Questions (FAQ)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <AlertBanner message={alertMessage} />
          <FAQAccordion />
          <SocialLinks links={socialLinks} />
        </div>

        {/* ── Right */}
        <div>
          <ContactMap />

          <div className="grid grid-cols-2 gap-6 mt-6">
            <ShowroomInfo address={showroom.address} phones={showroom.phones} />
            <QuickHelp
              description={quickHelp.description}
              emails={quickHelp.emails}
            />
          </div>

          <SendMessage />
        </div>
      </div>
    </div>
  );
}
