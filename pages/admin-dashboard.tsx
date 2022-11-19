import Image from "next/image"
import { useRouter } from "next/router"
import PageLayout from "../components/layouts/PageLayout"

export default function Home() {
  const router = useRouter()

  return (
    <PageLayout containerClassName="bg-gray-50">
      <div className="w-full min-h-screen bg-cover">
        <div className="text-center mt-32">
          <h1 className="font-bold text-6xl leading-tight">
            Decrypted Data
          </h1>

          <div className="mt-8 flex flex-col items-center mx-auto">
            <Image
              src="/assets/data_analysis_i.png"
              alt="data analysis visualization"
              width={800}
              height={800}
            />
            <Image
              src="/assets/data_analysis_ii.png"
              alt="data analysis visualization"
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
