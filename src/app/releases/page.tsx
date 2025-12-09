import Link from "next/link";

type ReleaseItem = {
  type: "feature" | "improvement" | "fix";
  description: string;
};

type WeeklyRelease = {
  weekOf: string;
  version: string;
  items: ReleaseItem[];
};

// Sample release data - you can replace this with actual data later
const releases: WeeklyRelease[] = [
  {
    weekOf: "December 4, 2024",
    version: "v2.4.1",
    items: [
      { type: "feature", description: "Universal Lead Import - TakeNext now automatically processes and imports leads from any source" },
      { type: "feature", description: "Voicemail Option for Declined Calls - Send customers directly to voicemail instead of losing them" },
      { type: "feature", description: "Bulk Contact Import - Upload hundreds of contacts at once using a simple CSV file" },
      { type: "improvement", description: "Smarter AI Conversations - Updates to AI instructions now apply to all ongoing conversations" },
      { type: "improvement", description: "More Natural AI Responses - Refined AI writing to sound more human and less robotic" },
    ],
  },
  {
    weekOf: "November 27, 2024",
    version: "v2.3.1",
    items: [
      { type: "feature", description: "Call Summaries at a Glance - Every completed call and voicemail now shows a quick 1-2 sentence summary" },
      { type: "feature", description: "Send Videos via Text - Share video files directly through text messages with your customers" },
      { type: "feature", description: "Smart Conversation Filters - Filter your conversations by lead source and status" },
      { type: "feature", description: "Automatic Human Handoff - When AI is turned off, all inbound messages automatically route to your team" },
      { type: "improvement", description: "Faster AI-to-Human Transitions - Handoffs now happen instantly with no delays" },
      { type: "improvement", description: "Better Notification Management - Notifications stay visible even after clicking them" },
      { type: "fix", description: "Fixed issues with adding new phone numbers to accounts" },
      { type: "fix", description: "Prevented duplicate contact creation" },
      { type: "fix", description: "Resolved display issues with long contact names" },
      { type: "fix", description: "Fixed various connection and authentication bugs" },
    ],
  },
  {
    weekOf: "November 20, 2024",
    version: "v2.2.1",
    items: [
      { type: "feature", description: "Manual Contact Creation - Add new contacts directly from the app with our new quick-entry form" },
      { type: "improvement", description: "Clearer Phone Number Selection - Easier display and selection of phone numbers in your inbox" },
      { type: "improvement", description: "AI Message Indicators - Clear visual markers show when AI is generating messages" },
      { type: "fix", description: "Fixed export issues for statistics and calendar data" },
      { type: "fix", description: "Resolved AI message processing interruptions" },
      { type: "fix", description: "Corrected buyer status tracking in conversations" },
      { type: "fix", description: "Fixed excessive follow-up messages" },
      { type: "fix", description: "Restored call recording retrieval functionality" },
    ],
  },
];

const typeConfig = {
  feature: { label: "New Features", emoji: "", color: "text-gray-400" },
  improvement: { label: "Improvements", emoji: "", color: "text-gray-400" },
  fix: { label: "Bug Fixes", emoji: "", color: "text-gray-400" },
};

export default function ReleasesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition">
            <img src="/takenext_logo.png" alt="TakeNext" className="h-12 w-auto" />
          </Link>
          <Link href="https://app.takenext.ai" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-gray-300 transition text-base">
            ← Back to App
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        {/* Page Header */}
        <header className="space-y-4 mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
            Product Updates
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">
            Weekly Releases
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Stay up to date with the latest features, improvements, and fixes we ship every week.
          </p>
        </header>

        {/* Release Timeline */}
        <div className="space-y-8">
          {releases.map((release, releaseIdx) => (
            <div key={releaseIdx} className="relative">
              {/* Timeline line */}
              {releaseIdx !== releases.length - 1 && (
                <div className="absolute top-8 left-6 w-0.5 h-full bg-gray-800" />
              )}
              
              {/* Release Card */}
              <div className="relative bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
                {/* Timeline dot */}
                <div className="absolute -left-6 top-8 w-3 h-3 bg-gray-600 rounded-full border-2 border-black" />
                
                {/* Release Header */}
                <div className="mb-6">
                  <div className="mb-2">
                    <h2 className="text-lg font-medium text-gray-200">Week of {release.weekOf}</h2>
                    <span className="text-xs text-gray-600">{release.version}</span>
                  </div>
                </div>

                {/* Group items by type */}
                {Object.entries(typeConfig).map(([type, config]) => {
                  const items = release.items.filter(item => item.type === type);
                  if (items.length === 0) return null;

                  return (
                    <div key={type} className="mb-6 last:mb-0">
                    <h3 className={`text-xs uppercase tracking-wider mb-3 ${config.color} font-normal`}>
                      {config.label}
                    </h3>
                      <ul className="space-y-3">
                        {items.map((item, idx) => (
                          <li key={idx} className="text-gray-300 text-sm leading-relaxed pl-4 relative">
                            <span className="absolute left-0 text-gray-700">•</span>
                            {item.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            We ship updates every week. Check back soon for more!
          </p>
        </div>
      </div>
    </main>
  );
}
