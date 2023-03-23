import axios from "axios";
import { GetStaticProps } from "next";
import Link from "next/link";

interface Naat {
  id: number;
  title: string;
  genre: string;
  slug: string;
}
interface Props {
  naats: Naat[];
}
function Naat({ naats }: Props) {
  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <div className="relative overflow-hidden  naat  card mb-5 md:rounded-[10px]">
        <div className="py-[60px] md:py-[150px] text-center">
          <h1 className="text-2xl md:text-5xl mb-1 text-white">
            NAAT E RASOOL
          </h1>
        </div>
      </div>
      <ul className="md:grid md:grid-cols-2 w-full">
        {naats.map((naat, index) => (
          <Link href={`/naat/${naat.slug}`} key={index}>
            <li className="flex flex-row my-1">
              <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                <div className="flex-1 pl-1 mr-16">
                  <div className="text-gray-600  ">{naat.title}</div>
                  <span className="text-gray-400  text-sm uppercase">
                    {naat.genre}
                  </span>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Naat;
export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get("http://api.midhah.com/v2/lyrics/naat");
  const naats = response.data;
  return {
    props: { naats: naats.data },
  };
};
