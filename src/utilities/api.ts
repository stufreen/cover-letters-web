interface GenerateCoverLetter {
  companyName: string;
  jobDescription: string;
  qualifications: string;
  tone: string;
  length: string;
  onUpdate: (val: string) => void;
  onDone: () => void;
}

export const generateCoverLetter = ({
  onUpdate,
  onDone,
  companyName,
  jobDescription,
  qualifications,
  tone,
  length,
}: GenerateCoverLetter) => {
  let utf8decoder = new TextDecoder();
  let reader: ReadableStreamDefaultReader | null = null;

  fetch(import.meta.env.VITE_COVER_LETTER_API_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      companyName,
      jobDescription,
      qualifications,
      tone,
      length,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  })
    .then(async (response) => {
      if (response.status === 200 && response.body) {
        reader = response.body.getReader();

        let responseString = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            onDone();
            reader.releaseLock();
            reader = null;
            break;
          }

          const decodedChunk = utf8decoder.decode(value);

          responseString += decodedChunk;

          const tokens = responseString
            .split("data: ")
            .map((line) => line.replace("data: ", "").trim())
            .filter((line) => line.startsWith("{") && line.endsWith("}"))
            .map((line) => JSON.parse(line))
            .map((object) => object.choices?.[0]?.delta?.content ?? "");

          onUpdate(tokens.join(""));
        }
      } else {
        throw new Error("API error");
      }
    })
    .catch((e) => {
      console.error(e);
      onDone();
    });

  return async () => {
    if (reader) {
      await reader.cancel();
      return;
    }
    return Promise.resolve();
  };
};
