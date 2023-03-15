interface HomeProps {
  count: number;
}

import Image from "next/image";
import appPreviewImg from "../assets/preview.png";

export default function Home(props: HomeProps) {
  return (
    <div>
      <main></main>
      <Image
        src={appPreviewImg}
        alt="Two phones showing a preview of the mobile app"
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/polls/count");
  const data = await response.json();
  console.log(data);

  return {
    props: { count: data.count },
  };
};
