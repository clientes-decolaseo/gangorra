import aveLola from "../assets/parceiros/ave-lola.jpg";
import brailluMais from "../assets/parceiros/braillu-mais.png";
import ceu from "../assets/parceiros/ceu.png";
import cmqEditora from "../assets/parceiros/cmq-editora.jpg";
import contadoresDeMentira from "../assets/parceiros/contadores-de-mentira.png";
import femsa from "../assets/parceiros/femsa.png";
import proac from "../assets/parceiros/proac.png";
import rmpa from "../assets/parceiros/rmpa.png";
import rodaMundo from "../assets/parceiros/roda-mundo.jpg";
import sesc from "../assets/parceiros/sesc.png";
import tagarelas from "../assets/parceiros/tagarelas.jpg";
import teatroBradesco from "../assets/parceiros/teatro-bradesco.png";
import terra from "../assets/parceiros/terra.png";
import ufjf from "../assets/parceiros/ufjf.png";

export const partners = [
  { name: "Ave Lola", image: aveLola, width: 900, height: 900 },
  { name: "Braillu Mais", image: brailluMais, width: 1479, height: 1600 },
  { name: "CEU", image: ceu, width: 397, height: 342 },
  { name: "CMQ Editora", image: cmqEditora, width: 250, height: 250 },
  {
    name: "Contadores de Mentira",
    image: contadoresDeMentira,
    width: 1128,
    height: 320,
  },
  { name: "FEMSA", image: femsa, width: 302, height: 300 },
  { name: "ProAC", image: proac, width: 302, height: 300 },
  { name: "RMPA", image: rmpa, width: 195, height: 200 },
  { name: "Roda Mundo", image: rodaMundo, width: 150, height: 150 },
  { name: "SESC", image: sesc, width: 195, height: 195 },
  { name: "Tagarelas", image: tagarelas, width: 828, height: 786 },
  {
    name: "Teatro Bradesco",
    image: teatroBradesco,
    width: 816,
    height: 632,
  },
  { name: "Terra", image: terra, width: 300, height: 100 },
  { name: "UFJF", image: ufjf, width: 1590, height: 902 },
] as const;
