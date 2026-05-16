import { useState } from "react";

const LOGO_URL =
  "https://i.ibb.co/7JcTg9Pd/Blue-and-Black-Minimalist-Brand-Logo-2.png";

export default function App2() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <TrustedBy />
      <Features />
      <StatsBanner />
    </div>
  );
}

function Nav() {
  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <img src={LOGO_URL} className="h-9" />

        <div className="flex gap-6 font-semibold text-gray-700">
          <a>Subjects</a>
          <a>For schools</a>
          <a>Past papers</a>
          <a>Pricing</a>
        </div>

        <div className="flex gap-3">
          <button>Log in</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">
      <div>
        <h1 className="text-5xl font-extrabold">
          GCSE Religious Studies{" "}
          <span className="text-green-500">made simple</span>
        </h1>
        <p className="mt-6 text-gray-600">
          Spec-mapped notes, AI tutor, past papers, and exam simulator.
        </p>

        <div className="mt-8 flex gap-3">
          <button className="bg-green-500 text-white px-6 py-3 rounded-full">
            Start free
          </button>
          <button className="border px-6 py-3 rounded-full">
            See how it works
          </button>
        </div>
      </div>

      <VideoPlayer />
    </section>
  );
}

function VideoPlayer() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video controls autoPlay className="rounded-3xl w-full">
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" />
      </video>
    );
  }

  return (
    <div
      onClick={() => setPlaying(true)}
      className="bg-green-100 rounded-3xl h-80 flex items-center justify-center cursor-pointer"
    >
      ▶ Play demo
    </div>
  );
}

function TrustedBy() {
  return (
    <div className="text-center py-10 text-gray-500">
      AQA • Edexcel • OCR • Eduqas • WJEC
    </div>
  );
}

function Features() {
  const items = [
    "Study notes",
    "Exam simulator",
    "Question bank",
    "AI tutor",
    "Past papers",
    "Homework tools",
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
      {items.map((i) => (
        <div key={i} className="p-6 border rounded-2xl">
          <h3 className="font-bold">{i}</h3>
          <p className="text-gray-500 mt-2">Feature description here.</p>
        </div>
      ))}
    </section>
  );
}

function StatsBanner() {
  return (
    <div className="bg-green-500 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 text-center">
        <div>50K+ Students</div>
        <div>9K+ Questions</div>
        <div>+1.4 Grades</div>
        <div>4.9★ Rating</div>
      </div>
    </div>
  );
}