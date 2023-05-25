interface GenerateCoverLetter {
  companyName: string;
  jobDescription: string;
  qualifications: string;
  onUpdate: (val: string) => void;
  onDone: () => void;
}

export const generateCoverLetter = ({
  onUpdate,
  onDone,
  companyName,
  jobDescription,
  qualifications,
}: GenerateCoverLetter) => {
  let utf8decoder = new TextDecoder();

  fetch(import.meta.env.VITE_COVER_LETTER_API_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({ companyName, jobDescription, qualifications }),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  })
    .then(async (response) => {
      if (response.status === 200 && response.body) {
        const reader = response.body.getReader();

        let responseString = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            onDone();
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
};
