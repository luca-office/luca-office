import {Binary, BinaryFile} from "../models"

export const convertFileToBase64 = (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => (reader.result ? resolve(reader.result as string) : reject(new Error("Couldn't read file.")))
    reader.onerror = error => reject(error)
  })

export const convertBinaryFileToBinary = (binaryFile: BinaryFile): Binary => ({
  id: binaryFile.id,
  path: binaryFile.url,
  title: binaryFile.filename
})
