interface HomeProps {
  count: number;
}

import Image from "next/image";
import appPreviewImg from "../assets/preview.png";
import logoImg from "../assets/logo_yellow.svg";
import usersAvatarExampleImg from "../assets/avatares.png";
import iconCheckImg from "../assets/icon-check.svg";

export default function Home(props: HomeProps) {
  return (
    <div>
      <main>
        <Image src={logoImg} alt="BetWithYourFriends Logo" />
        <h1>Create your own football poll and share it with your friends!</h1>
        <div>
          <Image src={usersAvatarExampleImg} alt="" quality={100} />
          <strong>
            <span>+2000</span>are already using
          </strong>
        </div>
        <form>
          <input
            type="text"
            required
            placeholder="Whats the name of your poll game?"
          />
          <button type="submit">Create my poll</button>
        </form>
        <p>
          After creating your poll, you will receive a unique code that you can
          use to invite other people 🚀
        </p>
        <div>
          <div>
            <Image src={iconCheckImg} alt="" />
            <div>
              <span>+600</span>
              <p>Polls created</p>
            </div>
          </div>
          <div>
            <Image src={iconCheckImg} alt="" />
            <div>
              <span>+600</span>
              <p>predictions sent</p>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImg}
        alt="Two phones showing a preview of the mobile app"
        quality={100}
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
