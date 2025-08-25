"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Box, Dialog, Flex, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";

const AdBanner = () => {
  const [visible, setVisible] = useState<boolean>(true);
  return (
    <Flex
      display={visible ? "flex" : "none"}
      translate={"yes"}
      className="hero-bg"
      p={"2"}
      align={"center"}
      justify={"center"}
    >
      <Text className="text-white max-w-[86vw]" size={{ initial: "2", sm: "3" }} >
        We&apos;ve added ads to help keep the platform running and improving for
        you.{" "}
        <Dialog.Root>
          <Dialog.Trigger>
            <Text className="cursor-pointer underline underline-offset-2">
              Learn More
            </Text>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="600px" maxHeight={"88vh"}>
            <Flex gap="3" justify="between" align={"start"}>
              <Dialog.Title>
                Why We Show Ads – Serving You with Authentic Spiritual Content
              </Dialog.Title>
              <Dialog.Close>
                <Box className="cursor-pointer hover:bg-black/15 transition-all" p={"1"}>
                  <Cross1Icon className="font-bold " />
                </Box>
              </Dialog.Close>
            </Flex>
            <Dialog.Description size="2" mb="4">
              <Heading as="h2" weight={"bold"} size={"3"}>
                Our Purpose
              </Heading>
              <Text as="p">
                We are dedicated to providing the most authentic lyrics of Hamd,
                Naat, Manqbat, and Darood o Salam, so that naat singers and
                reciters can access accurate content with ease and confidence.
              </Text>
              <Text as="p">
                While we understand that ads can sometimes feel disruptive, we
                deeply appreciate your patience. These ads are not placed for
                profit or personal gain; rather, they help us cover the
                essential costs of keeping this platform alive and improving.
              </Text>
              <Text as="p" weight={"bold"}>
                Ad revenue is solely used for:{" "}
              </Text>
              <ul className="list-disc pl-10">
                <li>Website development and ongoing maintenance</li>
                <li>Server hosting and related expenses</li>
                <li>Continuous improvements and feature updates</li>
                <li>Content creation and curation</li>
              </ul>
              <Text as="p">
                We strive to make this platform accessible and sustainable,
                purely <Text weight={"bold"}>Liwajhillah</Text> (for the sake of
                Allah Almighty), with the intention of serving the Ummah and
                supporting those who spread Islamic messages through their
                voices.{" "}
              </Text>
              <Text as="p">
                We are sincerely grateful for your understanding and continued
                support. Our commitment remains to provide you with
                user-friendly, accurate, and spiritually meaningful content that
                strengthens your recitation and connects you to faith in a
                seamless way.
              </Text>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Root>
      </Text>
      <Box
      position={'absolute'}
      right={{initial: '2', sm:'4'}}
        onClick={() => setVisible(false)}
        className="cursor-pointer hover:bg-black/30 transition-all"
        p={"1"}
        maxWidth={'10vw'}
      >
        <Cross1Icon className="font-bold text-white" />
      </Box>
    </Flex>
  );
};

export default AdBanner;
