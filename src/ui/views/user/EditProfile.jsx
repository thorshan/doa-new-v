import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Camera,
  Save,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { useLanguage } from "../../../hooks/useLanguage";
import { userApi } from "../../../api/userApi";
import { translations } from "../../../constants/translations";
import { AVATAR } from "../../avatar";
import Processing from "../../loaders/Processing";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    avatarId: 1,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userApi.getUserData(user?._id);
        const { name, username, avatarId } = res.data;
        setFormData({
          name: name || "",
          username: username || "",
          avatarId: avatarId || 1,
        });
      } catch (err) {
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchUser();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      await userApi.updateUser(user?._id, formData);
      setSuccess(true);
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Update failed. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Processing />;

  return (
    <div
      className={`min-h-screen bg-background text-text ${language === "mm" ? "font-myanmar" : "font-sans"} animate-in fade-in duration-700`}
    >
      {/* Header */}
      <header className="px-6 md:px-20 pb-24 py-6 flex justify-between items-center relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text/50 hover:text-primary group"
        >
          <div className="p-2 bg-surface rounded-xl border border-border/50">
            <ArrowLeft size={18} />
          </div>
          <span className="text-xs font-bold">
            {translations[language].go_back}
          </span>
        </button>
      </header>

      <main className="px-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Picker Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity" />
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-surface bg-surface shadow-2xl">
                <img
                  src={AVATAR[formData.avatarId]}
                  className="w-full h-full object-cover"
                  alt="Avatar Preview"
                />
              </div>
              <button
                type="button"
                onClick={() => navigate(`/${user?._id}/profile/avatars`)} // Assuming you have an avatar selection page
                className="absolute bottom-1 right-1 p-2.5 bg-primary text-white rounded-xl shadow-lg border-2 border-surface hover:scale-110 transition-transform"
              >
                <Camera size={16} />
              </button>
            </div>
            <p className="text-xs font-bold text-primary tracking-widest uppercase">
              {language === "mm" ? "ပုံပြောင်းရန်" : "Change Character"}
            </p>
          </div>

          {/* Form Inputs */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30 ml-4">
                {translations[language].name}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full h-14 px-6 bg-surface rounded-2xl border border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold"
                placeholder="Display Name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30 ml-4">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value.toLowerCase().replace(/\s/g, ""),
                  })
                }
                className="w-full h-14 px-6 bg-surface rounded-2xl border border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold"
                placeholder="username"
                required
              />
            </div>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-2xl flex items-center gap-3 text-error animate-in fade-in zoom-in duration-300">
              <AlertCircle size={20} />
              <span className="text-sm font-bold">{error}</span>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-500 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 size={20} />
              <span className="text-sm font-bold">
                Profile updated successfully!
              </span>
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full h-16 bg-primary text-white rounded-[24px] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center gap-3"
          >
            {saving ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Save size={20} />
                {translations[language].save}
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
