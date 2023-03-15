import Image from "next/image";
import appPreviewImg from "../assets/preview.png";
import logoImg from "../assets/logo_yellow.svg";
import usersAvatarExampleImg from "../assets/avatares.png";
import iconCheckImg from "../assets/icon-check.svg";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";
interface HomeProps {
  pollCount: number;
  guessesCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [pollTitle, setPollTitle] = useState("");

  async function createPoll(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.post("/polls", { title: pollTitle });
      const { code } = response.data;
      await navigator.clipboard.writeText(code);
      alert("Poll created! Code copied to clipboard");
      setPollTitle("");
    } catch (err) {
      alert("Error creating poll");
    }
  }
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="BetWithYourFriends Logo" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Create your own football poll and share it with your friends!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" quality={100} />
          <strong className="text-[#e1e1e6] text-xl">
            <span className="text-[#129E57]">+{props.userCount}</span> are
            already using
          </strong>
        </div>

        <form onSubmit={createPoll} className="mt-10 flex gap-2">
          <input
            className="text-sm flex-1 px-6 py-4 rounded bg-[#282824] border border-[#323238] text-[#E1E1E6]"
            type="text"
            required
            placeholder="Whats the name of your poll game?"
            onChange={(event) => setPollTitle(event.target.value)}
            value={pollTitle}
          />
          <button
            className="bg-[#F7DD43] px-6 py-4 rounded font-[#09090A] font-bold text-sm uppercase hover:bg-[#E5CD3D]"
            type="submit"
          >
            Create my poll
          </button>
        </form>

        <p className="text-[#8d8d99] mt-4 text-sm leading-relaxed">
          After creating your poll, you will receive a unique code that you can
          use to invite other people 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-[#323238] items-center flex justify-between text-[#E1E1E6]">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.pollCount}</span>
              <p>Polls created</p>
            </div>
          </div>
          <div className="w-px h-14 bg-[#323238]" />
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessesCount}</span>
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
  const [pollCountResponse, guessesCountResponse, usersCountResponse] =
    await Promise.all([
      api.get("polls/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      pollCount: pollCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      userCount: usersCountResponse.data.count,
    },
  };
};
