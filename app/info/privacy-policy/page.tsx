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
      <p className="text-2xl font-bold mb-2">Privacy Policy</p>
      <p>
        Your privacy is important to us, and we are committed to protecting your
        personal information. This Privacy Policy outlines how we collect, use,
        and safeguard your data when you use our RSS reader service.
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
