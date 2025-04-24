import  { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const TermsModal = ({ onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(); // Close if click is outside the modal content
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center h-full p-1 px-6 overflow-y-auto bg-transparent modal backdrop-blur-lg md:px-0"
      id="multi-step-modal"
    >
      <div
        ref={modalRef}
        className="entry_modal z-50 overflow-y-auto mx-1 md:mx-5 lg:mx-0 transform md:w-full border border-teal-500 rounded-lg h-[92vh] w-96 lg:w-2/3 bg-slate-950/90 text-left transition-all relative"
      >
        <div className="p-5 duration-300 ease-in-out active md:p-7 rounded-2xl bg-gradient-to-t from-cyan-700 via-transparent to-transparent lg:border border-cyan-800 hover:border-cyan-500">
          <div className="lg:px-4">
            <div className="w-full mt-2 mb-10 space-y-2">
              <h3 className="text-xl font-bold text-white">Terms and Conditions</h3>
              <span className="text-sm text-white/50">Last updated: May 2024</span>
            </div>
            <hr className="mb-5 opacity-50" />

            {/* Each Article Section */}
            {sections.map(({ title, items, subContent }, index) => (
              <article className="mb-8" key={index}>
                <h4 className="pb-5 mb-2 text-base font-bold text-white border-b border-white/50">
                  {title}
                </h4>
                {items && (
                  <ul className="pl-6 mb-4 space-y-2 list-disc">
                    {items.map((item, i) => (
                      <li key={i} className="text-white first-letter:uppercase">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {subContent && (
                  <div className="bg-[#040E18] px-7 py-5 rounded-lg mb-8 text-lg text-white">
                    {subContent.map((text, j) => (
                      <p key={j} className="pb-2 text-lg rounded-lg">
                        {text}
                      </p>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const sections = [
  {
    title: "Introduction",
    items: [
      `These terms and conditions (“T&Cs”) shall govern the use of our TradeTab Software Package at https://tradetab.com (hereinafter referred to as the “Website”). The use of the Website is restricted to users who are at least 18 years of age. By registering to use the Website you warrant that you meet the conditions for use and are expressly agreeing to the T&C’s contained herein.`,
    ],
  },
  {
    title: "Definitions and Interpretation",
    items: [
      `In these T&Cs, the following words shall have the following meanings:`,
    ],
    subContent: [
      `“Agreement” means our agreement with you to provide access to the Website and shall include these T&Cs and any other important information shared with you on our Website;`,
      `“Content” means any text, graphics, images, audio, video or other forms of information that appears on or forms part of the Website, and are capable of being stored on a computer;`,
      `“Members” means subscribers to the service who have an Account with the Website;`,
      `“Persons” means and includes natural persons, partnerships, limited liability partnerships, bodies corporate and unincorporated associations of persons.`,
      `“Services” means the services provided by the Website to its Members under these T&Cs;`,
      `“We” and “Us” means the owners of the Website;`,
      `“Website” means the website that you are currently using and any subdomains of this site (unless expressly excluded by their own terms and conditions).`,
      `“You” and “Your” shall mean the person who proposes to use or is using this Website and has an Account with us.`,
    ],
    items2: [
      `Headings, titles, sub-headings are purely for ease of reference and do not form part of or affect the interpretation of these T&Cs.`,
      `Include & Including shall be deemed to mean respectively “include(s) without limitation” and “including without limitation”.`,
    ],
  },
  {
    title: "Registration with the Website",
    items: [
      `You may register for an account with our Website by completing and submitting the account registration form on our Website, and clicking on the verification link in the email that the Website will send to you.`,
    ],
    subContent: [
      `Provide true, accurate, current and complete information about yourself as prompted by the registration form; and`,
      `Maintain and promptly update the data we hold by logging into your account and updating via ‘My profile’.`,
    ],
    items2: [
      `Once you have been enrolled, you shall be regarded as a Member of the Website.`,
      `You must notify us in writing immediately if you become aware of any unauthorised use of your account.`,
      `You must not use any other person's account to access the Website, unless you have that person's express permission to do so.`,
    ],
  },
  {
    title: "Access to the Website",
    items: [
      `Access can be booked via the booking forms available on the Website at https://tradetab.com. You need to be registered with the Website before you can do this as you will be required to create your own account and log in to complete the form.`,
      `When you submit an application, your submission represents an offer made by you to access the Website. On submission of the booking form, you will receive an automated summary email of your application.`,
    ],
  },
  {
    title: "Ownership and Intellectual Property Rights",
    items: [
      `All learning material, Content included on the Website, unless stated, is the property of Website. By continuing to use the Website, you acknowledge that such material is protected by the international laws governing intellectual property.`,
      `Users may view Website pages on screen and may print or download extracts for personal use. Users may supply a copy of any such extract to any third party provided that:`,
    ],
    subContent: [
      `(a) The extract is for their and that third party’s own personal use;`,
      `(b) The extract is not supplied as part of or incorporated in another work, Website or publication;`,
      `(c) The extract is not supplied either directly or indirectly in return for commercial gain;`,
      `(d) The third party is made aware that the source of the Content is the Website and that these Terms and Conditions apply equally to them, as to You.`,
    ],
    items2: [
      `No part of the Website may be reproduced, transmitted to, or stored on any other Website or in any other form of electronic medium without our express written consent.`,
    ],
  },
  {
    title: "Website Usage",
    items: [
      `We make all reasonable effort to test Content material before placing it on our Website. In the very unlikely event of any loss, disruption, or damage, to data or your computer system, we cannot be held responsible.`,
      `You agree to indemnify us against any loss, liability, claim, demand, damage or expense (including legal fees) that may occur in connection with your use of the Website.`,
    ],
  },
  {
    title: "Availability of the Website",
    items: [
      `While we take all reasonable steps to ensure the Website is always accessible, we cannot be held liable if, for any reason, it is unavailable. The Service is provided “as is” and on an “as available” basis. We give no warranty that the Service will be free of defects and/or faults.`,
      `We accept no liability for any disruption or non-availability of the Website resulting from external causes including, but not limited to, ISP equipment failure, host equipment failure, communications network failure, power failure, natural events, acts of war or legal restrictions and censorship.`,
      `We may have to suspend access to the Website for routine or emergency updates and maintenance, but we’ll try to keep any disruption to a minimum.`,
    ],
  },
  {
    title: "Privacy Policy",
    items: [
      `Our Privacy Policy (https://tradetab.com/privacypolicy) outlines how your Membership account information is handled. It includes the methods we employ to ensure privacy.`,
      `By using the Website, you agree to the way in which we process and deal with the personal information you give to us as a Member of the Company.`,
      `We may disclose your personal information or access your account if required to do so by law, any court order, decree or any other applicable regulatory, compliance, Governmental or law enforcement agency.`,
    ],
  },
  {
    title: "Disclaimers",
    items: [
      `We make no warranty or representation that the Website will meet your requirements, that it will be of satisfactory quality, that it will be fit for a particular purpose, or that it will not infringe the rights of third parties.`,
      `This Website provides analytical data based upon the users' own proprietary trading using historic information. It is not and nor is it intended to induce any individual to engage in investment activity and does not provide investment advice.`,
    ],
  },
  {
    title: "Our Complaints Policy",
    items: [
      `Our aim is at all times to provide you with an excellent service. If you are unhappy with our Services for any reason, please email us.`,
      `Please state the name and address of the complainant, a contact telephone number, Membership ID and details of why you are unhappy. This will help us to respond to you as quickly as possible. If we do not have enough information to investigate your complaint, we will try and contact you to ask for further details.`,
    ],
  },
  {
    title: "Liability",
    items: [
      `Your attention is drawn to this section.`,
      `The Website accepts no liability for any loss or damage that arises through any use of the Website.`,
    ],
  },
  {
    title: "Jurisdiction",
    items: [
      `Your use of the Website and your Membership of the sharing network is governed by the laws of England and Wales and any dispute arising in connection with these Terms and Conditions, your use of the Website, or any of our Services shall be heard exclusively in the courts of England and Wales.`,
    ],
  },
  {
    title: "No Partnership",
    items: [
      `Nothing in these Terms and Conditions shall be construed to create a joint venture, partnership or agency relationship between you and us, and neither of us shall have the right or authority to incur any liability, debt or cost or enter into any contracts or other arrangements in the name of or on behalf of the other.`,
    ],
  },
  {
    title: "Third Party Rights",
    items: [
      `These T&Cs will only apply as between us and you. Unless as otherwise stated in these Terms and Conditions, no other person may benefit or rely upon these Terms and Conditions.`,
    ],
  },
  {
    title: "Language",
    items: [
      `These T&Cs and our correspondence with you will be communicated in the English language.`,
    ],
  },
  {
    title: "Enforceability",
    items: [
      `We may modify any of these Terms and Conditions, at any time. Any revision will be posted on the Website, on this page. If any provision of these Terms and Conditions shall be invalid or unenforceable, it shall not affect any other provision, which shall remain in full force and effect. These Terms and Conditions and the Privacy Policy (https://tradetab.com/privacypolicy) form the entire agreement between us and your Membership excludes all other documents, statement or discussions with you which may have taken place prior to your application for Membership being accepted.`,
    ],
  },
  {
    title: "Transfer of Rights",
    items: [
      `We may transfer our rights and obligations under these T&Cs to another organisation without notice, but this will not affect your rights or our obligations to you.`,
      `If any event occurs that prevents us from carrying out our obligations or displaying the Website, we will take reasonable steps to reduce the effect this has on you and your commission under the Membership sharing network. If despite our efforts, this disabling event continues for any period exceeding one week we may terminate your Membership but as a consequence will incur no liability to you.`,
    ],
  },
];

export default TermsModal;
