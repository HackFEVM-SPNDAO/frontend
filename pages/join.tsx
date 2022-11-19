import { useRouter } from "next/router"
import { ChangeEvent, useRef, useState } from "react"
import { BiUpload } from "react-icons/bi"
import PageLayout from "../components/layouts/PageLayout"
import Spinner from "../components/Spinner"

type LoadingState = "not-loaded" | "loading" | "loaded" | "error"

export default function Join() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement | null>()

  const [loadingState, setLoadingState] = useState<LoadingState>("not-loaded")

  async function onChangeInputFile(file: File) {
    if (!file) return

    console.log(file)

    uploadToServer(file)
  }

  function clickFileInput() {
    fileRef?.current?.click()
  }

  const uploadToServer = async (file: File) => {
    setLoadingState("loading")

    try {
      const body = new FormData()
      body.append("file", file!)
      // body.append("field", file.name)

      await fetch("/api/uploadFile", {
        method: "POST",
        body,
      })
      setLoadingState("loaded")
    } catch (e: any) {
      console.error(`An error occured during uploading the file: ${e.message}`)
      setLoadingState("error")
    }
  }

  function showTitle() {
    let title = null
    switch (loadingState) {
      case "not-loaded":
        title = "Upload a CSV file"
        break
      case "loading":
        title = "Uploading your files..."
        break
      case "loaded":
        title = "URL encrypted. You can mint your token now"

      case "error":
        title = (
          <>
            <p>We&apos;re really sorry.</p>
            <p>An error occured, please refresh the page and try again.</p>
          </>
        )

      default:
        break
    }

    return title
  }

  function showContent() {
    let content = null

    switch (loadingState) {
      case "not-loaded":
        content = (
          <div className="mx-auto w-1/2 mt-24 py-24 px-8 py-2 border-2 border-dashed border-gray-500 rounded-xl">
            <button
              className="mx-auto flex flex-col items-center rounded-xl"
              onClick={() => clickFileInput()}
            >
              <div className="text-violet-600 text-bold text-5xl ">
                <BiUpload />
              </div>

              <p>
                <span className="text-violet-600 text-bold">Browse</span> your
                files
              </p>
            </button>

            <input
              ref={(ref) => (fileRef.current = ref)}
              type="file"
              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="hidden"
              // className="flex justify-center mt-10 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-600 hover:file:bg-violet-100"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e?.target?.files?.[0]
                if (!file) return
                onChangeInputFile(file)
              }}
            />
          </div>
        )
        break
      case "loading":
        content = (
          <div className="mx-auto w-1/2 mt-24 py-24 px-8 py-2 border-2 border-dashed border-gray-500 rounded-xl">
            <div className="mx-auto flex flex-col items-center rounded-xl">
              <Spinner />

              <p className="mt-4">This may take a while...</p>
              <p>Please do not close your browser</p>
            </div>
          </div>
        )
        break
      case "loaded":
        break
      case "error":
        break
      default:
        break
    }

    return content
  }

  return (
    <PageLayout>
      <div className="w-full min-h-screen bg-cover">
        <div className="text-center mt-32">
          <h1 className="font-bold text-4xl leading-tight">{showTitle()}</h1>

          <div className="mt-10">Explanatory text, lorem ipsum...</div>

          {showContent()}
        </div>
      </div>
    </PageLayout>
  )
}
