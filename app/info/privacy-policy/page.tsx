const items = [
  {
    heading: "Information We Collect",
    items: [
      "When you create an account, we collect basic information such as your username and email address.",
      "We may collect information about your interactions with our service, including the articles you view and the actions you take.",
    ],
  },
  {
    heading: "How We Use Your Information",
    items: [
      "We use the information collected to personalize your news feed and improve your overall experience.",
      "We may send you service-related announcements, updates, or important information via the email address you provide.",
    ],
  },
  {
    heading: "Data Security",
    items: [
      "We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.",
      "We may use third-party services to analyze user behavior and improve our service. These services adhere to their own privacy policies.",
    ],
  },
  {
    heading: "Cookies",
    items: [
      "We may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.",
    ],
  },
  {
    heading: "Third-Party Links",
    items: [
      "Our service may contain links to external websites. We are not responsible for the privacy practices of these sites.",
    ],
  },
  {
    heading: "Changes to Privacy Policy",
    items: [
      "We reserve the right to update our Privacy Policy. Any changes will be posted on this page.",
    ],
  },
  {
    heading: "Your Choices",
    items: [
      "You can deactivate your account at any time. Deactivating your account will remove your personal information from our active databases.",
    ],
  },
  {
    heading: "Contact Us",
    items: [
      "If you have any questions or concerns regarding our Privacy Policy, please contact us at [Your Contact Information].",
    ],
  },
];

export default function Page() {
  return (
    <>
      <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-4">
          Privacy Policy
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Your privacy is important to us, and we are committed to protecting your
          personal information. This Privacy Policy outlines how we collect, use,
          and safeguard your data when you use our RSS reader service.
        </p>
      </div>

      <div className="space-y-8">
        {items.map(({ heading, items }, i) => (
          <div
            key={i}
            className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:shadow-sm"
          >
            <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <span className="flex-shrink-0 w-8 h-8 bg-crypto-light/10 dark:bg-crypto-light/20 text-crypto-light rounded-full flex items-center justify-center text-sm font-bold mr-3">
                {i + 1}
              </span>
              {heading}
            </h2>
            <ul className="space-y-2 ml-11">
              {items.map((item, j) => (
                <li
                  key={j}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed flex items-start"
                >
                  <span className="text-crypto-light mr-2 mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
