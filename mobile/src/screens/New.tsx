import { useState } from "react";
import { Heading, Text, VStack, useToast } from "native-base";
import { api } from "../services/api";
import { Header } from "../components/Header";
import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function New() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handlePollCreate() {
    if (!title.trim()) {
      return toast.show({
        title: "Inform the title",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true);

      await api.post("/polls", { title: title.toUpperCase() });

      toast.show({
        title: "Poll created successfully!",
        placement: "top",
        bgColor: "green.500",
      });

      setTitle("");
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Error creating poll",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

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
          Create your own poll{"\n"} and share it with friends!
        </Heading>

        <Input
          mb={2}
          placeholder="Whats the name of your poll?"
          onChangeText={setTitle}
          value={title}
        />

        <Button
          title="CREATE MY POLL"
          onPress={handlePollCreate}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          After creating your poll, you will receive a unique code that you can
          use to invite other people
        </Text>
      </VStack>
    </VStack>
  );
}
