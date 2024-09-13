import Image from "next/image"
import { useRef, useState } from "react"
import { Button } from "./ui/button"
import { Camera, X } from "lucide-react"

import { Spinner } from "./spinner"
import { toast } from "sonner"

const MAX_FILE_SIZE_MB = 4.5

export function UrMom() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageSrc, setImageSrc] = useState<string>()
  const [imageFile, setImageFile] = useState<File>()
  const [description, setDescription] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filePicked = e.target.files?.[0]

    if (filePicked && filePicked.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error("Please upload an image that is less than 4.5MB")
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      setImageSrc(reader.result as string)
    }

    if (filePicked) {
      reader.readAsDataURL(filePicked)
      setImageFile(filePicked)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (imageFile) {
      const formData = new FormData()
      formData.append("image", imageFile)
      setIsLoading(true)

      try {
        const response = await fetch("/api/identify", {
          method: "POST",
          body: formData
        })

        if (!response.ok) {
          const error = (await response.json()) as { error: string }
          throw new Error(`Failed to generate description: ${error.error}`)
        }

        const { description } = await response.json()
        setDescription(description)
      } catch (error) {
        console.error(error)
        toast.error("Ooff...Something went wrong 😢")
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!imageSrc) {
    return (
      <div className="flex size-full items-center justify-center">
        <>
          <div className="flex flex-col items-center gap-4">
            <Button onClick={() => inputRef.current?.click()}>
              <Camera size={24} className="mr-2" />
              Upload
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Identify anything, in seconds.
            </div>
          </div>
          <input
            ref={inputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-row items-center gap-2">
            <Spinner />
            Thinkin, my guy...
          </div>
          <div className="text-center text-sm text-muted-foreground">
            sorry, i can be kinda slow. damn internet.
          </div>
        </div>
      </div>
    )
  }

  if (description) {
    return (
      <div className="flex size-full items-center justify-center">
        <div className="flex max-w-[500px] flex-col gap-4">
          <div className="break-words rounded-md bg-secondary p-4 text-center text-lg font-medium leading-8 text-secondary-foreground">
            {description}
          </div>
          <Button
            onClick={() => {
              setDescription(undefined)
              setImageSrc(undefined)
            }}
          >
            Again!
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex w-4/5 max-w-[400px] flex-col gap-4">
        <Image
          src={imageSrc}
          alt="Uploaded Image"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full rounded-md"
        />
        <div className="flex w-full flex-row gap-4">
          <Button
            className="flex-1"
            variant="secondary"
            onClick={() => {
              setImageSrc(undefined)
              setDescription(undefined)
            }}
          >
            <X size={24} className="mr-1" />
            Clear
          </Button>
          {imageSrc && !isLoading && !description && (
            <Button className="flex-1" type="submit" onClick={handleSubmit}>
              Waz dat?
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
