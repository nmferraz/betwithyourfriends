import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPoll() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        toast.show({
          title: "Inform the code",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/polls/join", { code });

      toast.show({
        title: "You joined the poll successfully!",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("polls");
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.message === "Poll not found.") {
        toast.show({
          title: "Poll not found",
          placement: "top",
          bgColor: "red.500",
        });
        return;
      }

      if (error.response?.data?.message === "You already joined this poll.") {
        toast.show({
          title: "You already joined this poll",
          placement: "top",
          bgColor: "red.500",
        });
        return;
      }
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Search by code" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Find poll by unique code
        </Heading>

        <Input
          mb={2}
          placeholder="Whats the poll code?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />

        <Button title="SEARCH POLL" onPress={handleJoinPoll} />
      </VStack>
    </VStack>
  );
}
