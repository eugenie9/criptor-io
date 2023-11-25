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
      <p className="text-2xl font-bold mb-2">Cookie Policy</p>
      <p>
        This Cookie Policy explains how we use cookies and similar technologies
        on our RSS reader service. By using our service, you consent to the use
        of cookies as described below.
      </p>

      {items.map(({ heading, items }, i) => (
        <div key={i} className="py-2">
          <p className="font-semibold text-lg">
            {i + 1}. {heading}
          </p>
          <ul className="list-disc list-inside">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
