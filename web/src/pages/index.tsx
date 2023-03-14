export default function Home() {
  return <h1>Hello World</h1>;
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/polls/count");
  const data = await response.json();
  console.log(data);

  return {
    props: {},
  };
};
