import Image from "next/image";

export default function Home() {

  return (
    <div className="CenteredTopLayout">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
      <Image src="/favicon.png" alt="pokemon" width={5000} height={50000} />
      {/* <Segment raised stacked color='red'>
        <Header as="h1">Welcome to the Pokeverse!</Header>
        <Header as="h1"></Header>
        <Link to="/card">
          <Button primary animated>
            <Button.Content visible>Let's GO!</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Link>
      </Segment> */}
    </div>
  );
}
