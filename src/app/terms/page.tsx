import fs from "node:fs";
import path from "node:path";
import { Fragment } from "react";
import Link from "next/link";

export const revalidate = false;

const SECTION_REGEX = /\n(?=\d+\.\s)/;

type Section = {
  number: string;
  title: string;
  body: Array<{ type: "p" | "ul"; content: string | string[] }>;
};

function toParagraphChunks(lines: string[]) {
  const chunks: Array<{ type: "p" | "ul"; content: string | string[] }> = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      chunks.push({ type: "p", content: paragraph.join(" ") });
      paragraph = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      return;
    }
    if (/^[\*•\-]/.test(trimmed)) {
      flushParagraph();
      chunks.push({ type: "p", content: trimmed.replace(/^[\*•\-]\s*/, "") });
      return;
    }
    paragraph.push(trimmed);
  });

  flushParagraph();

  return chunks;
}

function parseSections(content: string) {
  const parts = content.split(SECTION_REGEX);
  const intro = parts.shift() ?? "";
  const sections: Section[] = parts.map((section) => {
    const lines = section.split("\n").filter(Boolean);
    const [firstLine, ...rest] = lines;
    const match = firstLine.match(/^(\d+)\.\s*(.*)/);
    const number = match?.[1] ?? "";
    const title = match?.[2]?.trim() ?? firstLine.trim();
    const body = toParagraphChunks(rest);
    return { number, title, body };
  });

  return { intro: toParagraphChunks(intro.split("\n")), sections };
}

export default function TermsPage() {
  const tosPath = path.join(process.cwd(), "TakeNext TOS.txt");
  const rawContent = fs.readFileSync(tosPath, "utf8");
  // Remove the horizontal line separators
  const content = rawContent.replace(/_{10,}\n*/g, "");
  const { intro, sections } = parseSections(content);

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="font-black hover:opacity-80 transition" style={{ fontSize: '32px', lineHeight: '0.85', letterSpacing: '2px' }}>
            <div>TAKE</div>
            <div>NEXT</div>
          </Link>
          <Link href="/" className="text-white hover:text-gray-300 transition text-base">← Back to Home</Link>
        </div>
      </header>
      <div className="max-w-4xl mx-auto space-y-10 px-6 pt-32 pb-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">
            TakeNext — Terms of Service
          </h1>
          <p className="text-sm text-gray-400">Last updated: November 19, 2025</p>
        </header>

        <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-xs uppercase tracking-[0.35em] text-gray-400">
            Contents
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-300">
            {sections.map((section) => (
              <li key={section.number}>
                <a
                  href={`#section-${section.number}`}
                  className="hover:text-white transition"
                >
                  {section.number}. {section.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <article className="space-y-8 text-sm leading-relaxed text-gray-200">
          <section className="space-y-3">
            {intro.map((chunk, idx) => (
              <Fragment key={`intro-${idx}`}>
                {chunk.type === "p" ? (
                  <p>{chunk.content as string}</p>
                ) : (
                  <ul className="list-disc list-inside text-gray-300">
                    {(chunk.content as string[]).map((item, bulletIdx) => (
                      <li key={bulletIdx}>{item}</li>
                    ))}
                  </ul>
                )}
              </Fragment>
            ))}
          </section>

          {sections.map((section) => (
            <section
              key={section.number}
              id={`section-${section.number}`}
              className="space-y-4 border-t border-gray-800 pt-6"
            >
              <h2 className="text-sm tracking-[0.3em] uppercase text-teal-300">
                {section.number}. {section.title}
              </h2>
              {section.body.map((chunk, idx) =>
                chunk.type === "p" ? (
                  <p key={idx}>{chunk.content as string}</p>
                ) : (
                  <ul
                    key={idx}
                    className="list-disc list-inside text-gray-300 leading-normal"
                  >
                    {(chunk.content as string[]).map((item, bulletIdx) => (
                      <li key={bulletIdx}>{item}</li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}

