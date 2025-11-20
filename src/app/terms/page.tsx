import fs from "node:fs";
import path from "node:path";

export const revalidate = false;

function splitIntoBlocks(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export default function TermsPage() {
  const tosPath = path.join(process.cwd(), "TakeNext TOS.txt");
  const content = fs.readFileSync(tosPath, "utf8");
  const blocks = splitIntoBlocks(content);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">
            TakeNext — Terms of Service
          </h1>
          <p className="text-sm text-gray-400">
            Last updated: November 19, 2025
          </p>
        </div>
        <article className="space-y-6 text-sm leading-relaxed text-gray-200">
          {blocks.map((block, idx) => {
            const lines = block.split("\n").filter(Boolean);
            return (
              <section key={idx} className="space-y-2">
                {lines.map((line, lineIdx) => {
                  const trimmed = line.trim();
                  const isHeading =
                    lineIdx === 0 &&
                    (/^\d+\./.test(trimmed) ||
                      trimmed.startsWith("TAKE NEXT") ||
                      trimmed.startsWith("Privacy Policy") ||
                      trimmed === trimmed.toUpperCase());
                  const isBullet = trimmed.startsWith("*");
                  const text = isBullet ? trimmed.replace(/^\*\s*/, "• ") : trimmed;

                  return (
                    <p
                      key={lineIdx}
                      className={
                        isHeading
                          ? "text-white font-semibold tracking-wide uppercase text-xs"
                          : isBullet
                          ? "text-gray-200 pl-4 text-[13px] leading-snug"
                          : "text-gray-200 leading-relaxed"
                      }
                    >
                      {text}
                    </p>
                  );
                })}
              </section>
            );
          })}
        </article>
      </div>
    </main>
  );
}

