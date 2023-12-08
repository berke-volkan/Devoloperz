"use client"
import React, { FC, useEffect, useState } from 'react';
import { jsPDF } from "jspdf";

const ADM: FC = () => {
  const doc = new jsPDF();
  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");
};

export default ADM;
