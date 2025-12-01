const items = [
  {
    heading: "Use of Service",
    items: [
      "You must be at least 18 years old or have legal parental or guardian consent to use our service.",
      "The content provided through our RSS reader is for informational purposes only. We do not endorse or guarantee the accuracy, completeness, or reliability of any content from third-party cryptocurrency news websites.",
    ],
  },
  {
    heading: "User Conduct",
    items: [
      "You agree not to engage in any activity that may disrupt or interfere with the proper functioning of our service.",
      "You are responsible for maintaining the confidentiality of your account information and agree to notify us immediately of any unauthorized use or security breach.",
    ],
  },
  {
    heading: "Content Ownership",
    items: [
      "All content provided through our service belongs to the respective cryptocurrency news websites. We do not claim ownership over the articles or their intellectual property.",
    ],
  },
  {
    heading: "Limitation of Liability",
    items: [
      "We strive to provide a reliable service, but we do not guarantee uninterrupted, error-free operation. We are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our service.",
    ],
  },
  {
    heading: "Changes to Terms",
    items: [
      "We reserve the right to modify or update these terms at any time. Continued use of our service after changes constitute acceptance of the modified terms.",
    ],
  },
  {
    heading: "Termination",
    items: [
      "We reserve the right to terminate or suspend your access to the service without prior notice for any violation of these terms.",
    ],
  },
  {
    heading: "Governing Law",
    items: [
      "These terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].",
    ],
  },
];

export default function Page() {
  return (
    <>
      <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-4">
          Terms of Service
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          By accessing and using our RSS reader service, you agree to comply with
          and be bound by the following terms and conditions. If you do not agree
          with these terms, please do not use our service.
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
