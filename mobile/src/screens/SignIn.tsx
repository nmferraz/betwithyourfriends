import { Center, Icon, Text } from "native-base";
import { Fontisto } from "@expo/vector-icons";
import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";

export function SignIn() {
  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button
        title="ENTER WITH GOOGLE"
        type="SECONDARY"
        mt={12}
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
      />
      <Text color="white" textAlign="center" mt={4}>
        We do not use any information other than{"\n"} your email to create your
        account.
      </Text>
    </Center>
  );
}
