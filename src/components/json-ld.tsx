import type { Graph } from "schema-dts";

type JsonLdProps = {
  data: Graph;
};

/** Dati strutturati non eseguibili, serializzati senza tag HTML iniettabili. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
