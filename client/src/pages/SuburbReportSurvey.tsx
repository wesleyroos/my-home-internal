/*
 * Suburb Report Survey — Typeform-style, one question at a time.
 * Mobile-first, no navigation, submits to /api/survey.
 */

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Home, Search, ChevronUp, ChevronDown, ArrowRight, ArrowLeft, Send, CheckCircle2, Loader2, Mic, MicOff } from "lucide-react";

type Segment = "insider" | "homeowner" | "renter" | null;

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-full_208030e1.png";

const SEGMENTS = [
  { id: "insider" as Segment, label: "Property industry insider", description: "You work in or understand the property ecosystem", icon: <Building2 className="w-5 h-5" />, key: "A" },
  { id: "homeowner" as Segment, label: "Homeowner", description: "You own a home but don't work in the industry", icon: <Home className="w-5 h-5" />, key: "B" },
  { id: "renter" as Segment, label: "Renter / Prospective buyer", description: "You're renting or looking to buy", icon: <Search className="w-5 h-5" />, key: "C" },
];

const RANKING_ITEMS = [
  "Property values and trends",
  "Crime and safety stats",
  "Schools and education",
  "Demographics and community profile",
  "Nearby amenities (shops, restaurants, gyms)",
  "Transport and commute times",
  "Recent sales and what properties sold for",
  "Active listings / what's available now",
  "Municipal services (water, electricity reliability)",
  "Internet / fibre availability",
];

interface Question {
  id: string;
  type: "open" | "ranking" | "yesno";
  question: string;
  segments: Segment[];
  placeholder?: string;
  subtitle?: string;
}

const QUESTIONS: Question[] = [
  { id: "top3", type: "open", question: "If you were looking at a suburb to live in, what are the top 3 things you'd want to know?", segments: ["insider", "homeowner", "renter"], placeholder: "e.g. safety, schools, property prices..." },
  { id: "ranking", type: "ranking", question: "Rank these in order of importance to you.", subtitle: "Move items up or down to reorder.", segments: ["insider", "homeowner", "renter"] },
  { id: "searched", type: "open", question: "Have you ever searched for information about a suburb online?", subtitle: "What did you search for and where did you look?", segments: ["insider", "homeowner", "renter"], placeholder: "e.g. Googled crime stats, checked Property24..." },
  { id: "open_it", type: "open", question: "If a free suburb report existed, what would make you actually open it and read it?", segments: ["insider", "homeowner", "renter"], placeholder: "What would grab your attention?" },
  { id: "come_back", type: "open", question: "What would make you come back to check it again?", subtitle: "Monthly, quarterly, never?", segments: ["insider", "homeowner", "renter"], placeholder: "e.g. property value updates, new listings..." },
  { id: "share", type: "open", question: "Would you share this with someone?", subtitle: "Who and why?", segments: ["insider", "homeowner", "renter"], placeholder: "e.g. partner, estate agent, friend looking to buy..." },
  { id: "gated", type: "yesno", question: "Would you be willing to give your email or create an account to access a more detailed report?", segments: ["insider", "homeowner", "renter"] },
  { id: "wish", type: "open", question: "What's the one thing about a suburb that you wish you could easily find out but can't?", segments: ["insider", "homeowner", "renter"], placeholder: "The gap — what's missing today?" },
  { id: "insider_influence", type: "open", question: "Which data points would actually influence a property decision vs which are just \"nice to know\"?", segments: ["insider"], placeholder: "What moves the needle?" },
  { id: "insider_missing", type: "open", question: "What's missing from existing tools you use?", subtitle: "Lightstone, Property24, Loom, etc.", segments: ["insider"], placeholder: "Gaps in current tools..." },
  { id: "homeowner_value", type: "open", question: "Do you know what your property is currently worth?", subtitle: "Where did you check?", segments: ["homeowner"], placeholder: "e.g. no idea, checked Property24, asked an agent..." },
  { id: "homeowner_interest", type: "yesno", question: "Would you be interested in a report about your own suburb, even if you're not planning to sell?", segments: ["homeowner"] },
  { id: "renter_challenge", type: "open", question: "What's the biggest challenge in figuring out which suburb to live in?", segments: ["renter"], placeholder: "e.g. too many options, can't find reliable info..." },
  { id: "renter_influence", type: "yesno", question: "Would a suburb report influence where you decide to rent or buy?", segments: ["renter"] },
  { id: "renter_stage", type: "open", question: "At what stage of your search would this be most useful?", subtitle: "Browsing, shortlisting, or deciding?", segments: ["renter"], placeholder: "When would you reach for this?" },
];

export default function SuburbReportSurvey() {
  const [segment, setSegment] = useState<Segment>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [ranking, setRanking] = useState([...RANKING_ITEMS]);
  const [step, setStep] = useState(-1); // -1 = segment picker
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const setAnswer = (id: string, value: string) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const moveRanking = (from: number, to: number) => {
    if (to < 0 || to >= ranking.length) return;
    const updated = [...ranking];
    const [item] = updated.splice(from, 1);
    updated.splice(to, 0, item);
    setRanking(updated);
  };

  const visibleQuestions = QUESTIONS.filter((q) => segment && q.segments.includes(segment));
  const totalSteps = visibleQuestions.length;
  const currentQuestion = step >= 0 && step < totalSteps ? visibleQuestions[step] : null;

  const goNext = () => {
    if (step < totalSteps - 1) { setDirection(1); setStep(step + 1); }
  };
  const goPrev = () => {
    if (step > 0) { setDirection(-1); setStep(step - 1); }
    else if (step === 0) { setDirection(-1); setStep(-1); }
  };

  const handleSegmentSelect = (s: Segment) => {
    setSegment(s);
    setDirection(1);
    setStep(0);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ segment, answers, ranking }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Thank you screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <CheckCircle2 className="w-16 h-16 text-[#3DBFAD] mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-[#0C2340] mb-3">Thank you!</h1>
          <p className="text-base text-slate-500 leading-relaxed">Your responses have been recorded. We really appreciate your time — this helps us build something useful.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
        <img src={LOGO} alt="MyHome" className="h-5 opacity-60" />
        {step >= 0 && (
          <span className="text-xs font-mono text-slate-400 tabular-nums">
            {step + 1} / {totalSteps}
          </span>
        )}
      </div>

      {/* Progress bar */}
      {step >= 0 && (
        <div className="h-1 bg-slate-100 flex-shrink-0">
          <motion.div
            className="h-full bg-[#3DBFAD]"
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      )}

      {/* Content area */}
      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {/* Segment picker */}
            {step === -1 && (
              <motion.div
                key="segment"
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0C2340] mb-2 leading-tight">
                  Which best describes you?
                </h1>
                <p className="text-base text-slate-400 mb-8">This helps us tailor the questions.</p>

                <div className="space-y-3">
                  {SEGMENTS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSegmentSelect(s.id)}
                      className="w-full text-left flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-[#3DBFAD] hover:bg-[#3DBFAD]/5 transition-all group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#3DBFAD]/15 text-slate-400 group-hover:text-[#3DBFAD] flex items-center justify-center text-xs font-bold transition-colors">
                        {s.key}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#0C2340]">{s.label}</p>
                        <p className="text-xs text-slate-400">{s.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#3DBFAD] transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Question */}
            {currentQuestion && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0C2340] mb-1 leading-snug">
                  {currentQuestion.question}
                </h2>
                {currentQuestion.subtitle && (
                  <p className="text-base text-slate-400 mb-6">{currentQuestion.subtitle}</p>
                )}
                {!currentQuestion.subtitle && <div className="mb-6" />}

                {currentQuestion.type === "open" && (
                  <VoiceTextarea
                    value={answers[currentQuestion.id] ?? ""}
                    onChange={(v: string) => setAnswer(currentQuestion.id, v)}
                    placeholder={currentQuestion.placeholder}
                    onEnter={step < totalSteps - 1 ? goNext : handleSubmit}
                  />
                )}

                {currentQuestion.type === "yesno" && (
                  <div className="space-y-2">
                    {["Yes", "No", "Maybe"].map((opt, i) => (
                      <button
                        key={opt}
                        onClick={() => { setAnswer(currentQuestion.id, opt); if (step < totalSteps - 1) { setTimeout(() => goNext(), 300); } }}
                        className={`w-full text-left flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all ${
                          answers[currentQuestion.id] === opt
                            ? "border-[#3DBFAD] bg-[#3DBFAD]/5"
                            : "border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                          answers[currentQuestion.id] === opt
                            ? "bg-[#3DBFAD]/15 text-[#3DBFAD]"
                            : "bg-slate-100 text-slate-400"
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className={`text-sm font-semibold ${
                          answers[currentQuestion.id] === opt ? "text-[#3DBFAD]" : "text-[#0C2340]"
                        }`}>{opt}</span>
                      </button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "ranking" && (
                  <div className="space-y-1.5 max-h-[50vh] overflow-y-auto">
                    {ranking.map((item, i) => (
                      <div key={item} className="flex items-center gap-2 bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-100">
                        <span className="text-xs font-bold text-[#3DBFAD] w-5 text-center">{i + 1}</span>
                        <span className="text-sm text-[#0C2340] flex-1">{item}</span>
                        <div className="flex flex-col gap-0.5">
                          <button onClick={() => moveRanking(i, i - 1)} disabled={i === 0} className="text-slate-400 hover:text-[#0C2340] disabled:opacity-20 transition-colors p-0.5">
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button onClick={() => moveRanking(i, i + 1)} disabled={i === ranking.length - 1} className="text-slate-400 hover:text-[#0C2340] disabled:opacity-20 transition-colors p-0.5">
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      {step >= 0 && (
        <div className="flex items-center justify-between px-5 py-5 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={goPrev}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-[#0C2340] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {step < totalSteps - 1 ? (
            <button
              onClick={goNext}
              className="flex items-center gap-2 bg-[#3DBFAD] hover:bg-[#35a899] text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors"
            >
              OK
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 bg-[#0C2340] hover:bg-[#0C2340]/90 disabled:opacity-60 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
              ) : (
                <><Send className="w-4 h-4" /> Submit</>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Voice-enabled textarea ────────────────────────────────────────────────

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

function VoiceTextarea({
  value,
  onChange,
  placeholder,
  onEnter,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onEnter?: () => void;
}) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const supportsVoice = typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const toggleListening = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-ZA";
    recognitionRef.current = recognition;

    let finalTranscript = value;

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += (finalTranscript ? " " : "") + transcript;
          onChange(finalTranscript);
        } else {
          interim += transcript;
        }
      }
      // Show interim results while speaking
      if (interim) {
        onChange(finalTranscript + (finalTranscript ? " " : "") + interim);
      }
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognition.onerror = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
    setListening(true);
  }, [listening, value, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onEnter?.();
    }
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={4}
        autoFocus
        className="w-full border-0 border-b-2 border-slate-200 focus:border-[#3DBFAD] bg-transparent text-base text-[#0C2340] placeholder:text-slate-300 outline-none transition-colors resize-none py-2 pr-12"
      />
      {supportsVoice && (
        <button
          onClick={toggleListening}
          type="button"
          className={`absolute bottom-3 right-1 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            listening
              ? "bg-[#ef4444] text-white shadow-md shadow-[#ef4444]/30 animate-pulse"
              : "bg-slate-100 text-slate-400 hover:bg-[#3DBFAD]/10 hover:text-[#3DBFAD]"
          }`}
          title={listening ? "Stop recording" : "Start voice input"}
        >
          {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}
