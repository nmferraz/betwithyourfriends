import { createContext, ReactNode, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "501996354317-mr5e9tm3a4rn7mcgjuo5j61j5dnno4u0.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user: {
          name: "John Doe",
          avatarUrl: "https://github.com/nmferraz.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
