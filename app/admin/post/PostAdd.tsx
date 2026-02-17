"use client";

import { toMultipart } from "@util/FileUtil";

const TestForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fileInput = e.currentTarget.file as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;

    // 확인용
    const formData = toMultipart(
      {
        title: "테스트 배너",
        useYn: "Y",
      },
      {
        file: fileInput.files[0],
      },
    );

    formData.forEach((value, key) => {
      console.log(key, value);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" multiple />
      <button type="submit">전송</button>
    </form>
  );
};

export default TestForm;
