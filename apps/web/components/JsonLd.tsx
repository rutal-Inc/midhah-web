type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Renders schema.org structured data as an application/ld+json script. */
export default function JsonLd({ data }: Readonly<JsonLdProps>) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must ship as a raw script body; "<" is escaped to prevent
      // "</script>" breakout from API-sourced strings.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replaceAll("<", "\\u003c"),
      }}
    />
  );
}
