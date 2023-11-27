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
      <p className="text-2xl font-bold mb-2 text-neutral-900">
        Terms of Service
      </p>
      <p className="text-neutral-700">
        By accessing and using our RSS reader service, you agree to comply with
        and be bound by the following terms and conditions. If you do not agree
        with these terms, please do not use our service.
      </p>

      {items.map(({ heading, items }, i) => (
        <div key={i} className="py-2">
          <p className="font-semibold text-lg text-neutral-900">
            {i + 1}. {heading}
          </p>
          <ul className="list-disc list-inside text-neutral-700">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
