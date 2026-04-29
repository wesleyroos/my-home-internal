/*
 * Suburb Report Survey — Typeform-style, one question at a time.
 * Mobile-first, no navigation, submits to /api/survey.
 */

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Building2, Home, Search, GripVertical, ArrowRight, ArrowLeft, Send, CheckCircle2, Loader2, Mic, MicOff } from "lucide-react";
import confetti from "canvas-confetti";

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
  type: "open" | "ranking" | "yesno" | "email";
  question: string;
  segments: Segment[];
  placeholder?: string;
  subtitle?: string;
  showIf?: (answers: Record<string, string>) => boolean;
}

const QUESTIONS: Question[] = [
  // Core — what do people want?
  { id: "top3", type: "open", question: "If you were looking at a suburb to live in, what are the top 3 things you'd want to know?", segments: ["insider", "homeowner", "renter"], placeholder: "e.g. safety, schools, property prices..." },
  { id: "expect", type: "open", question: "If you received a report about a suburb, what sections or information would you expect to see in it?", segments: ["insider", "homeowner", "renter"], placeholder: "What would the report contain?" },
  { id: "ranking", type: "ranking", question: "Rank these in order of importance to you.", subtitle: "Drag to reorder.", segments: ["insider", "homeowner", "renter"] },
  { id: "never_seen", type: "open", question: "Is there anything you'd want in a suburb report that you've never seen offered before?", segments: ["insider", "homeowner", "renter"], placeholder: "What's missing from everything out there?" },
  { id: "searched", type: "open", question: "Have you ever searched for information about a suburb online?", subtitle: "What did you search for and where did you look?", segments: ["insider", "homeowner", "renter"], placeholder: "e.g. Googled crime stats, checked Property24..." },
  { id: "wish", type: "open", question: "What's the one thing about a suburb that you wish you could easily find out but can't?", segments: ["insider", "homeowner", "renter"], placeholder: "The gap — what's missing today?" },

  // Gated + email capture
  { id: "gated", type: "yesno", question: "Would you be willing to give your email to access a more detailed report?", segments: ["insider", "homeowner", "renter"] },
  { id: "email", type: "email", question: "Great — what's your email address?", subtitle: "We'll only use this to send you the report.", segments: ["insider", "homeowner", "renter"], placeholder: "your@email.com", showIf: (a) => a.gated === "Yes" },

  // Insider-specific
  { id: "insider_influence", type: "open", question: "Which data points would actually influence a property decision vs which are just \"nice to know\"?", segments: ["insider"], placeholder: "What moves the needle?" },
  { id: "insider_missing", type: "open", question: "What's missing from existing tools you use?", subtitle: "Lightstone, Property24, Loom, etc.", segments: ["insider"], placeholder: "Gaps in current tools..." },

  // Homeowner-specific
  { id: "homeowner_value", type: "open", question: "Do you know what your property is currently worth?", subtitle: "Where did you check?", segments: ["homeowner"], placeholder: "e.g. no idea, checked Property24, asked an agent..." },
  { id: "homeowner_interest", type: "yesno", question: "Would you be interested in a report about your own suburb, even if you're not planning to sell?", segments: ["homeowner"] },

  // Renter-specific
  { id: "renter_challenge", type: "open", question: "What's the biggest challenge in figuring out which suburb to live in?", segments: ["renter"], placeholder: "e.g. too many options, can't find reliable info..." },
  { id: "renter_influence", type: "yesno", question: "Would a suburb report influence where you decide to rent or buy?", segments: ["renter"] },
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

  const visibleQuestions = QUESTIONS.filter((q) => {
    if (!segment || !q.segments.includes(segment)) return false;
    if (q.showIf && !q.showIf(answers)) return false;
    return true;
  });
  const totalSteps = visibleQuestions.length;
  const currentQuestion = step >= 0 && step < totalSteps ? visibleQuestions[step] : null;
  const [showError, setShowError] = useState(false);

  const isCurrentAnswered = (): boolean => {
    if (!currentQuestion) return true;
    if (currentQuestion.type === "ranking") return true; // ranking is always "answered" (it has a default order)
    const val = answers[currentQuestion.id];
    return !!val && val.trim().length > 0;
  };

  const goNext = () => {
    if (!isCurrentAnswered()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
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
    if (!isCurrentAnswered()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ segment, answers, ranking }),
      });
      setSubmitted(true);
      const end = Date.now() + 2500;
      const colors = ["#3DBFAD", "#0C2340", "#f59e0b", "#6366f1"];
      (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
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
    <div className="h-[100dvh] bg-white flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-2 flex-shrink-0">
        <img src={LOGO} alt="MyHome" className="h-4 opacity-60" />
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
      <div className="flex-1 overflow-y-auto px-5 pt-3 sm:pt-6 pb-4 flex justify-center">
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

                {currentQuestion.type === "email" && (
                  <input
                    type="email"
                    value={answers[currentQuestion.id] ?? ""}
                    onChange={(e) => setAnswer(currentQuestion.id, e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); step < totalSteps - 1 ? goNext() : handleSubmit(); } }}
                    placeholder={currentQuestion.placeholder}
                    autoFocus
                    className="w-full border-0 border-b-2 border-slate-200 focus:border-[#3DBFAD] bg-transparent text-base text-[#0C2340] placeholder:text-slate-300 outline-none transition-colors py-2"
                  />
                )}

                {currentQuestion.type === "ranking" && (
                  <Reorder.Group axis="y" values={ranking} onReorder={setRanking} className="space-y-1.5">
                    {ranking.map((item, i) => (
                      <Reorder.Item
                        key={item}
                        value={item}
                        className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-slate-200 cursor-grab active:cursor-grabbing active:shadow-md active:border-[#3DBFAD] active:z-10 transition-shadow select-none"
                        whileDrag={{ scale: 1.02, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
                        dragListener={true}
                      >
                        <GripVertical className="w-4 h-4 text-slate-300 flex-shrink-0" />
                        <span className="text-xs font-bold text-[#3DBFAD] w-5 text-center">{i + 1}</span>
                        <span className="text-[13px] text-[#0C2340] flex-1">{item}</span>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                )}

                {showError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#ef4444] font-medium mt-3"
                  >
                    Please answer this question to continue.
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      {step >= 0 && (
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-slate-100 flex-shrink-0">
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
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const [bars, setBars] = useState<number[]>(new Array(24).fill(4));

  const supportsVoice = typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const startRecording = useCallback(async () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    setTranscript("");
    setRecording(true);

    // Audio analyser for visualisation
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(dataArray);
        const slice = Array.from(dataArray).slice(0, 24).map((v) => Math.max(4, (v / 255) * 40));
        setBars(slice);
        animFrameRef.current = requestAnimationFrame(tick);
      };
      tick();

      // Clean up stream on stop
      (analyserRef as any)._stream = stream;
      (analyserRef as any)._ctx = ctx;
    } catch {}

    // Speech recognition
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-ZA";
    recognitionRef.current = recognition;

    let final = "";

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += (final ? " " : "") + event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setTranscript(final + (interim ? (final ? " " : "") + interim : ""));
    };

    recognition.onend = () => {};
    recognition.onerror = () => {};
    recognition.start();
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    cancelAnimationFrame(animFrameRef.current);
    setBars(new Array(24).fill(4));

    // Clean up audio
    if (analyserRef.current) {
      try {
        (analyserRef as any)._stream?.getTracks().forEach((t: any) => t.stop());
        (analyserRef as any)._ctx?.close();
      } catch {}
      analyserRef.current = null;
    }

    // Apply transcript
    if (transcript.trim()) {
      onChange(value ? value + " " + transcript.trim() : transcript.trim());
    }
    setTranscript("");
    setRecording(false);
  }, [transcript, value, onChange]);

  const cancelRecording = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    cancelAnimationFrame(animFrameRef.current);
    setBars(new Array(24).fill(4));
    if (analyserRef.current) {
      try {
        (analyserRef as any)._stream?.getTracks().forEach((t: any) => t.stop());
        (analyserRef as any)._ctx?.close();
      } catch {}
      analyserRef.current = null;
    }
    setTranscript("");
    setRecording(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onEnter?.();
    }
  };

  return (
    <>
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
        {supportsVoice && !recording && (
          <button
            onClick={startRecording}
            type="button"
            className="absolute bottom-3 right-1 w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 text-slate-400 hover:bg-[#3DBFAD]/10 hover:text-[#3DBFAD] transition-all"
            title="Voice input"
          >
            <Mic className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Full-screen recording overlay */}
      <AnimatePresence>
        {recording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center px-6"
          >
            {/* Listening label */}
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8"
            >
              Listening...
            </motion.p>

            {/* Sound bars */}
            <div className="flex items-center gap-[3px] h-16 mb-8">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: h }}
                  transition={{ duration: 0.08, ease: "easeOut" }}
                  className="w-[3px] rounded-full bg-[#3DBFAD]"
                  style={{ minHeight: 4 }}
                />
              ))}
            </div>

            {/* Live transcript preview */}
            {transcript && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-base text-[#0C2340] text-center max-w-md mb-8 leading-relaxed"
              >
                {transcript}
              </motion.p>
            )}

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={cancelRecording}
                className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors"
                title="Cancel"
              >
                <MicOff className="w-5 h-5" />
              </button>
              <button
                onClick={stopRecording}
                className="w-16 h-16 rounded-full bg-[#3DBFAD] text-white flex items-center justify-center shadow-lg shadow-[#3DBFAD]/30 hover:bg-[#35a899] transition-colors"
                title="Done"
              >
                <CheckCircle2 className="w-7 h-7" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-6">Tap the checkmark when you're done speaking</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
