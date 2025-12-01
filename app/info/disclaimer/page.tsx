const items = [
  {
    heading: "Information Accuracy",
    items: [
      "The content provided through our RSS reader is for informational purposes only. We do not guarantee the accuracy, completeness, or reliability of any content from third-party cryptocurrency news websites.",
    ],
  },
  {
    heading: "Third-Party Links",
    items: [
      "Our service may contain links to external websites. We are not responsible for the content or practices of these sites.",
    ],
  },
  {
    heading: "User Responsibility",
    items: [
      "Users are responsible for verifying the accuracy of information obtained through our service before making any decisions based on that information.",
    ],
  },
  {
    heading: "Service Availability",
    items: [
      "We strive to provide a reliable service, but we do not guarantee uninterrupted, error-free operation. We are not liable for any disruptions or downtime.",
    ],
  },
  {
    heading: "User Conduct",
    items: [
      "Users must adhere to ethical and lawful conduct when using our service. Any misuse or disruptive behavior may result in termination of access.",
    ],
  },
  {
    heading: "Changes to Service",
    items: [
      "We reserve the right to modify, suspend, or discontinue any part of our service at any time without prior notice.",
    ],
  },
  {
    heading: "Limitation of Liability",
    items: [
      "We are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our service.",
    ],
  },
  {
    heading: "Acceptance of Terms",
    items: [
      "By using this website, you acknowledge and accept the terms outlined in this disclaimer.",
    ],
  },
];

export default function Page() {
  return (
    <>
      <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-4">
          Disclaimer
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          The following disclaimer outlines the terms of use for our RSS reader
          service. By accessing and using our service, you agree to comply with
          the following:
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
