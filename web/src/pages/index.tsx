interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return <h1>{props.count} Poll</h1>;
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/polls/count");
  const data = await response.json();
  console.log(data);

  return {
    props: { count: data.count },
  };
};
