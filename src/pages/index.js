import Header from "../../app/components/Header";
import Banner from "../../app/components/Banner";
import IdeaCard from "../../app/components/IdeaCard";

export default function HomePage() {
  return (
    <main className="">
      <Header />
      <Banner />
      <div className="container mx-auto">
        <IdeaCard />
      </div>
    </main>
  );
}
