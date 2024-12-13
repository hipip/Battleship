const Title = (textContent) => {
  const h1 = document.createElement("h1");
  h1.className = "title";
  h1.textContent = textContent;
  return h1;
};

const Subtitle = (textContent) => {
  const h2 = document.createElement("h2");
  h2.className = "sub-title";

  const setTextContent = (textContent) => {
    h2.textContent = textContent;
  };
  setTextContent(textContent);

  return { element: h2, setTextContent };
};
export { Title, Subtitle };
