import Lyrics from "@/models/Lyrics";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface Props {
  lyrics: Lyrics;
}

const Bayan = ({ lyrics }: Props) => {
  return (
    <div className="container mx-auto  w-full md:w-[85%] ">
      <div className="relative overflow-hidden naat card md:rounded-[10px]">
        <div className="py-[60px] md:py-[150px] text-center">
          <h1 className="text-2xl md:text-5xl mb-1 text-white">
            {lyrics.title}
          </h1>
        </div>
      </div>
      <p className="whitespace-pre-wrap text-2xl md:text-4xl text-center py-10 poetry leading-10 md:leading-[55px]">
        {lyrics.lyrics}
      </p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async ({ params }: GetServerSidePropsContext) => {
  const { data } = await axios.get(
    `http://api.midhah.com/v2/lyrics/hamd/${params?.slug}`
  );
  return {
    props: {
      lyrics: data.data[0],
    },
  };
};

export default Bayan;
