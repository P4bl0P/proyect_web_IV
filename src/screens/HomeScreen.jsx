import NavBar from "../components/NavBar";
import HeroSlider from "../components/HeroSlider";
import img1 from "../assets/homePhoto1.jpg";
import img2 from "../assets/homePhoto2.jpg";
import img3 from "../assets/homePhoto3.jpg";

export default function HomeScreen() {

  const slides = [
    { src: img1, alt: "Paseo scouts", title: "Bienvenidos al Grupo IV", subtitle: "Actividades, aventuras y más", ctaText: "Apúntate" },
    { src: img2, alt: "Acampada", title: "Fin de semana en la sierra", subtitle: "Reserva tu plaza", ctaText: "Ver actividades" },
    { src: img3, alt: "Juego en grupo", title: "Juegos y valores", subtitle: "Diversión para todas las edades" },
  ];

  return (
    <div className="w-full">
      <NavBar />
      <HeroSlider slides={slides} interval={6000} heightClass="h-[55vh]" />

    </div>
  );
}
