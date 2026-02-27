import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import SEO from "../../components/SEO";
import Circles from "../../components/Circles";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const DAY_NAMES_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDateLocal(isoString, timezone) {
  try {
    return new Date(isoString).toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

function formatDateLong(isoString, timezone) {
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      timeZone: timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return isoString;
  }
}

function formatDateTimeLong(isoString, timezone) {
  try {
    return new Date(isoString).toLocaleString("en-US", {
      timeZone: timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return isoString;
  }
}

function buildGcalLink(startIso, endIso, meetingLink) {
  const fmt = (iso) => iso.replace(/[-:]/g, "").split(".")[0] + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Meeting with Diego Rodriguez",
    dates: `${fmt(startIso)}/${fmt(endIso)}`,
    details: `Meeting link: ${meetingLink}`,
    location: meetingLink,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Mini Calendar component
function MiniCalendar({ onSelectDate, selectedDate }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [availableDates, setAvailableDates] = useState(new Set());
  const [loadingMonth, setLoadingMonth] = useState(false);

  const fetchMonthAvailability = useCallback(async (year, month) => {
    setLoadingMonth(true);
    try {
      // month+1 because viewMonth is 0-indexed but API expects 1-12
      const res = await fetch(`/api/schedule/availability?year=${year}&month=${month + 1}`);
      const data = await res.json();
      setAvailableDates(new Set(data.availableDates || []));
    } catch (err) {
      console.error("Error fetching month availability:", err);
    } finally {
      setLoadingMonth(false);
    }
  }, []);

  useEffect(() => {
    fetchMonthAvailability(viewYear, viewMonth);
  }, [viewYear, viewMonth, fetchMonthAvailability]);

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const handleDayClick = (day) => {
    const yyyy = viewYear;
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    const key = `${yyyy}-${mm}-${dd}`;
    if (availableDates.has(key)) {
      onSelectDate(key);
    }
  };

  const todayKey = (() => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  })();

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 hover:text-accent transition-colors">
          <BsArrowLeft />
        </button>
        <h3 className="text-white font-semibold text-lg">
          {MONTH_NAMES_EN[viewMonth]} {viewYear}
        </h3>
        <button onClick={nextMonth} className="p-2 hover:text-accent transition-colors">
          <BsArrowRight />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES_EN.map((d) => (
          <div key={d} className="text-center text-white/40 text-xs py-1">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className={`grid grid-cols-7 gap-1 transition-opacity ${loadingMonth ? "opacity-50" : ""}`}>
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const yyyy = viewYear;
          const mm = String(viewMonth + 1).padStart(2, "0");
          const dd = String(day).padStart(2, "0");
          const key = `${yyyy}-${mm}-${dd}`;
          const isAvailable = availableDates.has(key);
          const isToday = key === todayKey;
          const isSelected = key === selectedDate;
          const isPast = key < todayKey;

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={!isAvailable || isPast}
              className={`
                aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200
                ${isSelected ? "bg-accent text-white" : ""}
                ${isAvailable && !isSelected ? "bg-white/10 text-white hover:bg-accent/80 cursor-pointer" : ""}
                ${!isAvailable && !isPast ? "text-white/20 cursor-not-allowed" : ""}
                ${isPast ? "text-white/10 cursor-not-allowed" : ""}
                ${isToday && !isSelected ? "ring-1 ring-accent/50" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {loadingMonth && (
        <p className="text-center text-white/40 text-xs mt-2">Loading availability...</p>
      )}
    </div>
  );
}

export default function SchedulePage() {
  const { t } = useTranslation(["schedule", "common"]);
  const [step, setStep] = useState("calendar"); // calendar | slots | form | success
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(null);
  const [formData, setFormData] = useState({ clientName: "", clientEmail: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [bookError, setBookError] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);
  const [clientTimezone, setClientTimezone] = useState("UTC");

  useEffect(() => {
    try {
      setClientTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch {
      setClientTimezone("UTC");
    }
  }, []);

  const handleSelectDate = async (dateKey) => {
    setSelectedDate(dateKey);
    setStep("slots");
    setLoadingSlots(true);
    setSlotsError(null);
    setSelectedSlot(null);

    try {
      const res = await fetch(`/api/schedule/slots?date=${dateKey}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error loading slots");
      setSlots(data.slots || []);
    } catch (err) {
      setSlotsError(t("schedule:errors.loadSlots"));
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setStep("form");
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setBookError(null);

    try {
      const res = await fetch("/api/schedule/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          message: formData.message,
          startIso: selectedSlot.startIso,
          clientTimezone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          setBookError(t("schedule:errors.slotTaken"));
          setStep("slots");
          // Reload slots
          handleSelectDate(selectedDate);
        } else {
          throw new Error(data.error || "Error booking");
        }
        return;
      }
      setBookingResult(data);
      setStep("success");
    } catch (err) {
      setBookError(t("schedule:errors.book"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep("calendar");
    setSelectedDate(null);
    setSlots([]);
    setSelectedSlot(null);
    setFormData({ clientName: "", clientEmail: "", message: "" });
    setBookingResult(null);
    setBookError(null);
  };

  const displayDate = selectedDate
    ? new Date(selectedDate + "T00:00:00Z").toLocaleDateString("en-US", {
        timeZone: "UTC",
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      <SEO
        title={t("schedule:seo.title")}
        description={t("schedule:seo.description")}
        keywords={t("schedule:seo.keywords")}
      />
      <div className="h-full bg-primary/30">
        <Circles />
        <div className="container mx-auto py-32 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-[600px] px-4">
            {/* Avatar */}
            <motion.div
              variants={fadeIn("up", 0.15)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex justify-center mb-6"
            >
              <img
                src="/work/author.mini.png"
                alt="Diego Rodriguez"
                className="w-40 h-40 rounded-full object-cover border-2 border-accent/50"
              />
            </motion.div>

            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 text-center mb-4"
            >
              {t("schedule:heading").split(/<accent>(.*?)<\/accent>/).map((part, i) =>
                i % 2 === 1 ? (
                  <span key={i} className="text-accent">{part}</span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </motion.h2>

            <motion.p
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-center text-white/60 mb-10"
            >
              {t("schedule:subheading")}
            </motion.p>

            {/* Step indicator */}
            <motion.div
              variants={fadeIn("up", 0.35)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex items-center justify-center gap-2 mb-8"
            >
              {["calendar", "slots", "form", "success"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full transition-all ${step === s ? "bg-accent w-4" : "bg-white/20"}`} />
                </div>
              ))}
            </motion.div>

            {/* STEP: Calendar */}
            {step === "calendar" && (
              <motion.div
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-white font-semibold text-center mb-6">{t("schedule:steps.calendar")}</h3>
                <MiniCalendar onSelectDate={handleSelectDate} selectedDate={selectedDate} />
              </motion.div>
            )}

            {/* STEP: Slots */}
            {step === "slots" && (
              <motion.div
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-6">
                  <button
                    onClick={() => setStep("calendar")}
                    className="p-2 hover:text-accent transition-colors"
                  >
                    <BsArrowLeft />
                  </button>
                  <h3 className="text-white font-semibold">
                    {t("schedule:slots.title")} {displayDate}
                  </h3>
                </div>

                <p className="text-white/40 text-sm mb-4">
                  {t("schedule:slots.timezone")}: <span className="text-white/70">{clientTimezone}</span>
                </p>

                {loadingSlots && (
                  <div className="text-center text-white/60 py-8">Loading...</div>
                )}

                {!loadingSlots && slotsError && (
                  <p className="text-red-400 text-center py-4">{slotsError}</p>
                )}

                {!loadingSlots && !slotsError && slots.length === 0 && (
                  <p className="text-white/60 text-center py-8">{t("schedule:slots.noSlots")}</p>
                )}

                {!loadingSlots && slots.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {slots.map((slot, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectSlot(slot)}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:border-accent hover:bg-accent/10 transition-all duration-200 text-center font-medium"
                      >
                        {formatDateLocal(slot.startIso, clientTimezone)}
                        <span className="block text-white/40 text-xs mt-1">
                          — {formatDateLocal(slot.endIso, clientTimezone)}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP: Form */}
            {step === "form" && (
              <motion.div
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <button onClick={() => setStep("slots")} className="p-2 hover:text-accent transition-colors">
                    <BsArrowLeft />
                  </button>
                  <h3 className="text-white font-semibold">{t("schedule:steps.form")}</h3>
                </div>

                {selectedSlot && (
                  <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-xl">
                    <p className="text-accent font-medium text-sm">
                      {formatDateTimeLong(selectedSlot.startIso, clientTimezone)}
                    </p>
                  </div>
                )}

                {bookError && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{bookError}</p>
                  </div>
                )}

                <form onSubmit={handleBook} className="flex flex-col gap-4 items-center">
                  <input
                    type="text"
                    placeholder={t("schedule:form.name")}
                    className="input w-full"
                    value={formData.clientName}
                    onChange={(e) => setFormData((p) => ({ ...p, clientName: e.target.value }))}
                    required
                  />
                  <input
                    type="email"
                    placeholder={t("schedule:form.email")}
                    className="input w-full"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData((p) => ({ ...p, clientEmail: e.target.value }))}
                    required
                  />
                  <textarea
                    placeholder={t("schedule:form.messagePlaceholder")}
                    className="textarea w-full"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`mt-2 px-10 py-3 rounded-full border border-white/50 text-white font-medium transition-all duration-300 hover:border-accent hover:text-accent ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {submitting ? t("schedule:form.confirming") : t("schedule:form.confirm")}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP: Success */}
            {step === "success" && bookingResult && (
              <motion.div
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-white font-bold text-2xl mb-2">{t("schedule:success.title")}</h3>
                <p className="text-white/60 mb-3">{t("schedule:success.subtitle")}</p>
                <p className="text-white/40 text-sm mb-6">📬 {t("schedule:success.checkSpam")}</p>

                <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-6 text-left">
                  <p className="text-white/60 text-sm mb-1">{t("schedule:success.yourTime")}</p>
                  <p className="text-white font-medium">
                    {formatDateTimeLong(bookingResult.startIso, clientTimezone)}
                  </p>
                </div>

                {bookingResult.meetingLink && (
                  <div className="mb-6">
                    <p className="text-white/60 text-sm mb-2">{t("schedule:success.meetingLink")}</p>
                    <a
                      href={bookingResult.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline break-all"
                    >
                      {bookingResult.meetingLink}
                    </a>
                  </div>
                )}

                <div className="flex flex-col gap-3 items-center">
                  {bookingResult.meetingLink && (
                    <a
                      href={buildGcalLink(bookingResult.startIso, bookingResult.endIso, bookingResult.meetingLink)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-accent/50 text-white font-medium hover:bg-accent/20 hover:border-accent transition-all duration-200"
                    >
                      {t("schedule:success.addToCalendar")}
                    </a>
                  )}
                  <button
                    onClick={handleReset}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {t("schedule:success.bookAnother")}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "schedule"])),
    },
  };
}
