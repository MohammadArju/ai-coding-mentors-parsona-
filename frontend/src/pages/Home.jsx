import HomeTopbar from "@/components/HomeTopbar";
import hiteshImag from "../assets/hitesh.jpeg"
import piyushImage from "../assets/piyush.png"
import { Separator } from "@/components/ui/separator";
import { HiOutlineSparkles } from "react-icons/hi";
import { Languages, Code2, UserRound, Heart } from "lucide-react";
import MentorCard from "@/components/MentorCard";
import { useState } from "react";

const Home = () => {
  const [selected, setSelected] = useState("hitesh");
  const mentors = [
    {
      id: "hitesh",
      firstName: "Hitesh",
      name: "Hitesh Choudhary",
      image: hiteshImag,
      description: "Friendly, practical tech mentor who loves chai and coding.",
      tags: ["Friendly", "Motivational", "Real-world"],
      link: "/mentor/hitesh",
    },
    {
      id: "piyush",
      firstName: "Piyush",
      name: "Piyush Garg",
      image: piyushImage,
      description: "Precise, calm educator with structured teaching approach.",
      tags: ["Structured", "Step-by-step", "Fundamentals"],
      link: "/mentor/piyush",
    },
  ];
  return (
    <div className="mx-4 sm:mx-6 md:mx-10">
      <HomeTopbar></HomeTopbar>
      <Separator />
      <div className="flex flex-col w-full max-w-5xl mx-auto m-4 gap-6">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center justify-center gap-3  rounded-xl py-1 px-2 font-bold ">
            <HiOutlineSparkles />
            <span>Powered by Ai</span>
          </div>
          <div className="flex items-center justify-center flex-col flex-wrap gap-6">
            <h1 className="text-5xl font-bold text-center">
              Learn Coding with Your{" "}
              <span className="bg-linear-to-br from-purple-500 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-bold">
                Favorite Mentors
              </span>
            </h1>

            <p className="text-gray-400 text-center max-w-2xl">
              Get personalized coding guidance from AI versions of Hitesh
              Choudhary and Piyush Garg in Hindi, Hinglish, or English.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <span>Multilingual</span>
            </div>

            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              <span>Code Examples</span>
            </div>

            <div className="flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              <span>Personalized</span>
            </div>

            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Beginner Friendly</span>
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {mentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              selected={selected === mentor.id}
              onSelect={() => setSelected(mentor.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
