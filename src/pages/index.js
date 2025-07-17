import Header from "../../app/components/Header";
import Banner from "../../app/components/Banner";
import IdeaCard from "../../app/components/IdeaCard";

export default function Ideas() {
  return (
    <main className="">
      <Header />
      <Banner />
      <div className="container mx-auto px-24">
        <IdeaCard />
      </div>
    </main>
  );
}
