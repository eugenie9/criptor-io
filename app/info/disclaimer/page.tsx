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
      <p className="text-2xl font-bold mb-2">Disclaimer</p>
      <p>
        The following disclaimer outlines the terms of use for our RSS reader
        service. By accessing and using our service, you agree to comply with
        the following:
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
