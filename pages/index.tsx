import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  Heading,
  Flex,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  MenuDivider,
  Card,
  CardBody,
  Stack,
  IconButton,
  Image,
  Icon,
} from '@chakra-ui/react';
import { FiShare } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { SpotifyApi, getCurrentlyPlaying, getTopTracks } from '@/spotify';

export default function Home() {
  const { data: session, status } = useSession();
  const [topTracks, setTopTracks] =
    useState<SpotifyApi.UsersTopTracksResponse | null>(null);

  const [currentlyPlaying, setCurrentlyPlyaing] =
    useState<SpotifyApi.CurrentlyPlayingResponse | null>(null);

  useEffect(() => {
    if (session) {
      SpotifyApi.setAccessToken(session.user.accessToken);
      (async () => {
        const x = await getTopTracks();
        console.log(x);
        setTopTracks(x);
        const y = await getCurrentlyPlaying();
        console.log(y);
        setCurrentlyPlyaing(y);
      })();
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Tonz</title>
      </Head>
      <nav>
        <Flex w="100%" p={4} justify="evenly">
          <Heading size="md">Tonz</Heading>
          <Spacer />
          {status == 'unauthenticated' || status == 'loading' ? (
            <Button onClick={() => signIn()}>Login</Button>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar
                  name={session!.user?.name || ''}
                  src={session!.user?.picture || ''}
                  size={'sm'}
                />
              </MenuButton>
              <MenuList>
                <Text px={3}>{session!.user?.name}</Text>
                <MenuDivider />
                <MenuItem>Connect Account</MenuItem>
                <MenuItem>Generate Recommendations</MenuItem>
                <MenuItem onClick={() => signOut()}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </nav>
      <div>
        {session ? (
          <>
            {currentlyPlaying && (
              <Card maxW="sm" m="auto">
                <CardBody>
                  <Heading size="md" mb="4">
                    Listening To
                  </Heading>
                  <Image
                    src={currentlyPlaying?.item?.album?.images[0]?.url}
                    alt="Album Cover"
                    borderRadius="lg"
                  />
                  <Stack mt="6" mb={1} spacing="3">
                    <Heading size="md">{currentlyPlaying?.item?.name}</Heading>
                    <Text>{currentlyPlaying.item?.artists[0].name}</Text>
                  </Stack>
                  <IconButton
                    h="auto"
                    minW={0}
                    p={1}
                    aria-label="Share with friends"
                    icon={<Icon p={0} as={FiShare} />}
                    colorScheme="blue"
                    variant="ghost"
                  />
                </CardBody>
              </Card>
            )}
            {topTracks?.items.map((track) => (
              <Card maxW="sm" m="auto">
                <CardBody>
                  <Stack direction="row">
                    <Image src={track?.album?.images[0]?.url} boxSize={50} />
                    <Text>{track.name}</Text>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </>
        ) : (
          <Heading textAlign="center">What is Tonz?</Heading>
        )}
      </div>
    </>
  );
}
