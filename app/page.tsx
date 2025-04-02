"use client";
import React, { useEffect, useRef } from "react";
import { Clock, FileText, Sparkles, ChevronRight, Globe } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import UploadAudio from "@/components/ui/upload-audio";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { getUser, signInWithGoogle, signOutOfGoogle } from "@/lib/signIn";
import { Session } from "next-auth";
import { toast } from "sonner";

function App() {
  const [user, setUser] = React.useState<Session | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const uploadRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);

  const scrollToNavBar = () => {
    navBarRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    getUser()
      .then((user) => {
        if (user) {
          toast.success(`Welcome back, ${user?.user?.name}`);
        }

        setUser(user);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      const updatedUser = await getUser();
      setUser(updatedUser);

    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      console.log("Signing out...");
      signOutOfGoogle();
      toast.success("Signed out successfully");
      setUser(null);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error during sign-out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <nav className="fixed top-0 left-0 w-full z-50 py-2 px-4 bg-slate-900/50 backdrop-blur-lg border-b border-slate-700 flex items-center justify-between">
        <h1
          className="cursor-pointer font-bold text-2xl"
          onClick={scrollToNavBar}
        >
          <b>Capzion</b>
        </h1>
        {user ? (
          <Button onClick={handleSignOut}>
            {isLoading ? <ClipLoader color="black" size={20} /> : "Sign Out"}
          </Button>
        ) : (
          <Button onClick={handleSignIn}>
            {isLoading ? <ClipLoader color="black" size={20} /> : "Sign In"}
          </Button>
        )}
      </nav>
      <div ref={navBarRef} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Transform Audio into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Accurate Text
            </span>
          </h1>
          <div className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            <TextGenerateEffect
              words="Professional-grade audio transcription powered by cutting-edge AI technology.
            Get precise transcripts in minutes, not hours."
            ></TextGenerateEffect>
          </div>
          <button
            onClick={scrollToUpload}
            className="bg-gradient-to-r cursor-pointer from-blue-500 to-emerald-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all flex items-center gap-2 mx-auto"
          >
            Get Started Now
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">99% Accuracy</h3>
            <p className="text-slate-400">
              Industry-leading accuracy powered by advanced AI models trained on
              millions of hours of audio.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-emerald-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
              <Clock className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-slate-400">
              Get your transcripts in minutes. Perfect for time-sensitive content
              and deadlines.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-purple-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Multi-language</h3>
            <p className="text-slate-400">
              Support for 30+ languages and various accents with automatic language
              detection.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-pink-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
              <FileText className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Formatting</h3>
            <p className="text-slate-400">
              Automatic punctuation, speaker detection, and custom formatting
              options.
            </p>
          </div>
        </div>
      </div>

      <div ref={uploadRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <UploadAudio />
      </div>
      <footer className="bg-slate-900 text-slate-400 py-6 text-center border-t border-slate-700">
        <p>
          Made by{" "}
          <span className="text-white font-semibold">Pavan</span>. Follow on{" "}
          <a
            href="https://github.com/pavan-gokarla/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>.
        </p>
      </footer>
    </div>
  );
}

export default App;