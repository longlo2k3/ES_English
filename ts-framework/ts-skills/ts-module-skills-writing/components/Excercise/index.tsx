"use client";

import { useParams } from "next/navigation";
import React from "react";
import Intermadiate from "./Intermadiate";
import BeginnerExcercise from "./beginner";

function Excercise() {
  const params = useParams();
  const { topic, level, id } = params;

  return (
    <>
      {level === "Beginner" && <BeginnerExcercise />}
      {level === "Intermediate" && <Intermadiate />}
    </>
  );
}

export default Excercise;
