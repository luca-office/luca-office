import * as fs from "fs"
import * as path from "path"
import * as rimraf from "rimraf"
import {argv} from "yargs"
import {createFileContents} from "./generate"

const inputFileName = "./input/schema.sdl"
const outputDirectoryName = "./out"
const outputDirectoryPath = path.join(process.cwd(), outputDirectoryName)

if (argv.clean === true) {
  console.info('🚽 clean "./out" directory')
  rimraf(outputDirectoryPath, error => {
    if (error) {
      console.error(error)
    }
  })
} else {
  rimraf(outputDirectoryPath, error => {
    if (error) {
      console.error(error)
    } else {
      fs.mkdirSync(outputDirectoryPath)
      writeGeneratedCodeToFileSystem()
    }
  })
}

const writeGeneratedCodeToFileSystem = () => {
  const inputFileContent = fs.readFileSync(inputFileName, {encoding: "utf-8"})
  const contentByFilename = createFileContents(inputFileContent)

  Object.keys(contentByFilename)
    .filter(filename => contentByFilename[filename])
    .forEach(filename => {
      const filePath = path.join(outputDirectoryPath, filename)
      const content = contentByFilename[filename]

      path
        .dirname(path.relative(outputDirectoryPath, filePath))
        .split(path.sep)
        .reduce((parentDirectory, childDirectory) => {
          const currentDirectory = path.resolve(parentDirectory, childDirectory)
          try {
            fs.mkdirSync(currentDirectory)
          } catch (error) {
            if (error.code !== "EEXIST") {
              throw error
            }
          }
          return currentDirectory
        }, outputDirectoryPath)

      fs.writeFileSync(filePath, content, {encoding: "utf-8"})
      console.info("generating " + filename)
    })

  console.info(`🚀 code is ready @ ${outputDirectoryName}`)
}
