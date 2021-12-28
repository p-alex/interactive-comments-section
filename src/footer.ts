export const appendFooter = (): void => {
  const footer = document.createElement("footer") as Element;
  footer.classList.add("footer");
  footer.innerHTML = `
      <p>Developed by <a href="https://github.com/p-alex" rel="noopener" target="_blank">Alex Daniel</a>.</p>
    `;
  document.body.appendChild(footer);
};
