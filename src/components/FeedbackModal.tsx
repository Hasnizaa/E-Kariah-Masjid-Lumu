import { useState } from "react";
import { Star, X } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface FeedbackModalProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const FeedbackModal = ({ onSubmit, onCancel }: FeedbackModalProps) => {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [improvement, setImprovement] = useState("");
  const [weekly, setWeekly] = useState<boolean | null>(null);

  const handleSubmit = () => {
    const feedback = { rating, improvement, weekly, timestamp: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("ekariah-feedback") || "[]");
    existing.push(feedback);
    localStorage.setItem("ekariah-feedback", JSON.stringify(existing));
    onSubmit();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-background border border-border p-6 animate-fade-in">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold">{t("feedback.title")}</h3>
          <button onClick={onCancel} className="rounded-lg p-1 hover:bg-muted">
            <X size={20} />
          </button>
        </div>

        {/* Rating */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-3">{t("feedback.rate")}</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={`${
                    star <= (hover || rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Improvement */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">{t("feedback.improve")}</label>
          <textarea
            value={improvement}
            onChange={(e) => setImprovement(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        {/* Weekly */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3">{t("feedback.weekly")}</label>
          <div className="flex gap-3">
            {[true, false].map((val) => (
              <button
                key={String(val)}
                type="button"
                onClick={() => setWeekly(val)}
                className={`flex-1 rounded-xl border py-3 text-sm font-semibold transition-colors ${
                  weekly === val
                    ? "border-primary bg-primary/15 text-accent-foreground"
                    : "border-border hover:bg-muted"
                }`}
              >
                {val ? t("feedback.yes") : t("feedback.no")}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-border py-3.5 text-sm font-semibold hover:bg-muted transition-colors"
          >
            {t("feedback.cancel")}
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t("feedback.submitLogout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
