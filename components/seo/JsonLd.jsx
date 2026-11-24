// Reusable, safe JSON-LD structured data renderer for Next.js Server Components

export default function JsonLd({ data }) {
  if (!data) return null;

  const payloads = Array.isArray(data) ? data : [data];

  return (
    <>
      {payloads.filter(Boolean).map((schema, index) => (
        <script
          key={schema["@id"] || schema["@type"] || index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
