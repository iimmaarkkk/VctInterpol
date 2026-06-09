export type Imagen = {
  url: string
  esInterpol: boolean
  nombre?: string
}

export const niveles = {
  facil: [
    { url: "/players/p1.png", esInterpol: true, nombre: "Sujeto #1" },
    { url: "/players/p2.jpg", esInterpol: true, nombre: "Sujeto #2" },
    { url: "/players/p3.jpg", esInterpol: true, nombre: "Sujeto #3" },
    { url: "/players/p4.png", esInterpol: false, nombre: "Sujeto #4" },
    { url: "/players/p5.png", esInterpol: false, nombre: "Sujeto #5" },
    { url: "/players/p6.png", esInterpol: true, nombre: "Sujeto #6" },
  ],
  medio: [
    { url: "/players/p7.jpg", esInterpol: true, nombre: "Sujeto #7" },
    { url: "/players/p8.jpg", esInterpol: false, nombre: "Sujeto #8" },
    { url: "/players/p9.png", esInterpol: false, nombre: "Sujeto #9" },
    { url: "/players/p10.jpg", esInterpol: true, nombre: "Sujeto #10" },
    { url: "/players/p11.jpg", esInterpol: true, nombre: "Sujeto #11" },
    { url: "/players/p12.jpg", esInterpol: false, nombre: "Sujeto #12" },
  ],
}