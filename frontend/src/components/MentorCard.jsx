import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import AlertLogout from "./AlertLogout";
import { API } from "@/constants/RoutesName";
import { useState } from "react";

export default function MentorCard({ mentor, selected, onSelect }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

 
  return (
    <Card
      onClick={onSelect}
      className={cn(
        "cursor-pointer transition-all duration-300 hover:border-primary",
        selected &&
          "border-primary ring-2 ring-primary shadow-lg shadow-primary/20",
      )}
    >
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="h-14 w-14 rounded-full object-cover"
            />

            <div>
              <h3 className="font-semibold text-lg">{mentor.name}</h3>

              <p className="text-sm text-muted-foreground">AI Mentor</p>
            </div>
          </div>

          <span>⭐⭐⭐⭐⭐</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{mentor.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {mentor.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Button */}

        {isAuthenticated ? (
          <Link to={mentor.link} onClick={(e) => e.stopPropagation()}>
            <Button className="w-full">
              Start Talking with {mentor.firstName}
              <FaArrowRightLong />
            </Button>
          </Link>
        ) : (
         <>
          <Button onClick={() => setOpen(true)} className="w-full">
            Start Talking with {mentor.firstName}
            <FaArrowRightLong />
          </Button>
          <AlertLogout
              open={open}
              setOpen={setOpen}
              onConfirm={() => {
                navigate(API.LOCAL.LOGIN)
              }}
            ></AlertLogout>
          </>
        )}
      </CardContent>
    </Card>
  );
}
