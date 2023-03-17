import { Heading, VStack, Text } from "native-base";
import { Header } from "../components/Header";
import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function New() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Create new Poll" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Create your own poll{'\n'} and share it with friends!
        </Heading>

        <Input mb={2} placeholder="Whats the name of your poll?" />

        <Button title="CREATE MY POLL" />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          After creating your poll, you will receive a unique code that you can
          use to invite other people
        </Text>
      </VStack>
    </VStack>
  );
}
