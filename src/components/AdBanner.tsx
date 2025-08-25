"use client";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";

const AdBanner = () => {
  const [visible, setVisible] = useState<boolean>(true);
  return (
    <Flex
      display={visible ? "flex" : "none"}
      translate={"yes"}
      className="bg-cyan-700"
      p={"2"}
      align={"center"}
      justify={"center"}
      gap={'3'}
    >
      <Text className="text-white" size={{initial: "2", sm: "3"}}>
        We&apos;ve added ads to help keep the platform running and improving for
        you.{" "}
        <Dialog.Root>
          <Dialog.Trigger>
            <Text className="cursor-pointer underline">Learn More</Text>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="600px">
            <Dialog.Title>Why Ads</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Our Purpose is to serve you with the most authentic lyrics of
              Hamd, Naat, Manqbat and Darood o Salam to encourage you towards
              your spiritual journey.
              <br />
              We understand that ads can sometimes be disruptive and we truly
              appreciate your patience. The ads displayed in this website are
              not meant for profit or personal gain. Instead, they help us cover
              the necessary expenses required for Hosting servers, developing
              new features & updates to keep the website running smoothly.
              <br />
              <br />
              The amount generated from ads are strictly used to accomplish app
              needs as:
              <br />
              <ul className="list-disc pl-10">
                <li>Web development and maintenance costs</li>
                <li>Server and hoisting expenses</li>
                <li>Ongoing improvements and new features</li>
                <li>Content creation costs</li>
              </ul>
              <br />
              We want to make this platform is accessible and sustainabel.{" "}
              <span className="font-bold">Liwajhillah</span> (for the sake of
              Allah Almighty).
              <br />
              <br />
              We are sincerely grateful that you understand our aim and continue
              supporting us in our journey. We&apos;re always focused on
              providing you with user-friendly and meaningful spiritual content
              that seamlessly connects you with religious boundaries. Kindly
              stay with us to stay true to our mission.
            </Dialog.Description>

            <Flex gap="3" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="cyan">
                  Close
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Text>
      <Text className="text-white cursor-pointer" onClick={() => setVisible(false)} size={{initial: "2", sm: "3"}}>X</Text>
    </Flex>
  );
};

export default AdBanner;
