const items = [
  {
    heading: "What are Cookies?",
    items: [
      "Cookies are small text files that are placed on your device when you visit our website. They are commonly used to enhance user experience and collect information about user behavior.",
    ],
  },
  {
    heading: "Types of Cookies We Use",
    items: [
      "Essential Cookies: These cookies are necessary for the proper functioning of our service. They enable basic functions like page navigation and access to secure areas.",
      "Analytical/Performance Cookies: We may use analytical cookies to collect information about how users interact with our service. This helps us improve our service by analyzing user patterns.",
      "Functionality Cookies: These cookies allow us to remember choices you make and provide enhanced features, such as personalizing your news feed.",
    ],
  },
  {
    heading: "How to Manage Cookies",
    items: [
      "You can manage cookies through your browser settings. Most browsers allow you to control cookies, including blocking or deleting them.",
    ],
  },
  {
    heading: "Third-Party Cookies",
    items: [
      "Our service may use third-party services that may also place cookies on your device. These services have their own privacy policies.",
    ],
  },
  {
    heading: "Changes to Cookie Policy",
    items: [
      "We reserve the right to update our Cookie Policy. Any changes will be posted on this page.",
    ],
  },
  {
    heading: "Acceptance of Cookies",
    items: [
      "By using [Your Website Name], you consent to the use of cookies in accordance with this Cookie Policy. If you do not agree to our use of cookies, please adjust your browser settings accordingly.",
    ],
  },
  {
    heading: "Contact Us",
    items: [
      "If you have any questions or concerns regarding our Cookie Policy, please contact us at [Your Contact Information].",
    ],
  },
];

export default function Page() {
  return (
    <>
      <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-4">
          Cookie Policy
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          This Cookie Policy explains how we use cookies and similar technologies
          on our RSS reader service. By using our service, you consent to the use
          of cookies as described below.
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
