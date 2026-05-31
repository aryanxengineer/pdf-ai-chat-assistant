import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter }
    from "@langchain/textsplitters";

export class PdfService {

    async extractText(
        fileBuffer: Buffer
    ) {
        const parser =
            new PDFParse({
                data: fileBuffer,
            });

        const result =
            await parser.getText();

        return result.text;
    }

    async chunkText(
        text: string
    ) {
        const splitter =
            new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });

        return splitter.splitText(text);
    }

    async processPdf(
        fileBuffer: Buffer
    ) {
        const text =
            await this.extractText(
                fileBuffer
            );

        const chunks =
            await this.chunkText(
                text
            );

        return {
            text,
            chunks,
        };
    }
}