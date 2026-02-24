import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check, Loader2 } from "lucide-react";
import { AVATAR } from "../../avatar";
import { useAuth } from "../../../hooks/useAuth";
import { useLanguage } from "../../../hooks/useLanguage";
import { userApi } from "../../../api/userApi";

const AvatarPicker = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Initialize with user's current avatar ID
  const [selectedId, setSelectedId] = useState(user?.avatarId || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Convert your AVATAR object/array into a list for mapping
  // If AVATAR is an object like {1: img, 2: img}, we map the keys
  const avatarList = Object.keys(AVATAR).map((key) => ({
    id: Number(key),
    img: AVATAR[key],
  }));

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      await userApi.updateUser(user?._id, { avatarId: selectedId });
      // Redirect back to profile edit or dashboard
      navigate(-1);
    } catch (err) {
      console.error("Failed to update avatar:", err);
      setError("Failed to save avatar. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-background text-text p-6 flex flex-col ${language === "mm" ? "font-myanmar" : "font-sans"}`}
    >
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-surface rounded-full transition-colors"
        >
          <X size={28} className="text-text/40" />
        </button>
        <h1 className="text-xl font-black tracking-tight">
          {language === "mm" ? "ကာရိုက်တာရွေးချယ်ပါ" : "Choose Your Avatar"}
        </h1>
        <div className="w-10" /> {/* Balance spacer */}
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 pb-32">
          {avatarList.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`
                relative aspect-square rounded-[32px] border-4 transition-all duration-300
                flex items-center justify-center p-4 group
                ${
                  selectedId === item.id
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-105"
                    : "border-transparent bg-surface hover:bg-primary/5 hover:border-primary/20"
                }
              `}
            >
              <img
                src={item.img}
                alt={`Avatar ${item.id}`}
                className="w-full h-full object-contain transition-transform group-hover:scale-110"
              />

              {/* Checkmark Badge */}
              {selectedId === item.id && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-background animate-in zoom-in duration-300">
                  <Check size={16} className="text-white" strokeWidth={4} />
                </div>
              )}
            </button>
          ))}
        </div>
      </main>

      {/* Sticky Footer Action */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent pt-12">
        <div className="max-w-xl mx-auto">
          {error && (
            <p className="text-error text-center mb-4 text-sm font-bold">
              {error}
            </p>
          )}

          <button
            onClick={handleSave}
            disabled={loading}
            className={`
              w-full h-16 rounded-[24px] font-black text-lg transition-all
              flex items-center justify-center gap-3 shadow-xl
              ${loading ? "bg-primary/50 cursor-not-allowed" : "bg-primary text-white hover:scale-[1.02] active:scale-95 shadow-primary/20"}
            `}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : language === "mm" ? (
              "အတည်ပြုမည်"
            ) : (
              "Confirm Selection"
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AvatarPicker;
