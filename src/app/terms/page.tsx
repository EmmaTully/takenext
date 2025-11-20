import fs from "node:fs";
import path from "node:path";

export const revalidate = false;

export default function TermsPage() {
  const tosPath = path.join(process.cwd(), "TakeNext TOS.txt");
  const content = fs.readFileSync(tosPath, "utf8");

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">TakeNext — Terms of Service</h1>
        <article className="prose prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-gray-200">
          {content}
        </article>
      </div>
    </main>
  );
}

